<template>
  <div class="calendar-outer-container" :class="{ 'calendar-outer-container-non-snippet': !isSnippet }">
    <div id="calendar-main-container" :class="{ 'calendar-main-container-non-snippet': !isSnippet }">
      <!-- Filters Menu -->
      <div class="d-flex filter-container">
        <!-- Toolbar Component -->
        <toolbar />

        <!-- Dropdown Component -->
        <dropdown :countries="countries" :months="months" />
      </div>

      <!-- Fixture List -->
      <list :viewableBranches="viewableBranches" :scrollCounter="scrollCounter" v-on:updateScrollCounter="updateScrollCounter" />
    </div>

    <!-- Map Component -->
    <map-view v-if="!isSnippet" :viewableBranches="viewableBranches" :scrollCounter="scrollCounter"></map-view>
  </div>
</template>

<script>
import toolbar from '~/components/fixtures/filters/toolbar.vue'
import dropdown from '~/components/fixtures/filters/dropdown.vue'
import list from '~/components/fixtures/list/list.vue'
import mapView from '~/components/fixtures/map/map-view.vue'
import jsonRetriever from '~/services/jsonRetriever.js'
import compititonUtility from '~/services/compititonUtility.js'
import { selectedCountryEventName, selectedCompetitionEventName } from '~/services/analyticsEvents.js'
import moment from 'moment'

export default {
  name: 'calendar',
  components: {
    toolbar,
    dropdown,
    list,
    'map-view': mapView,
  },
  props: {
    countries: {
      type: Array,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    /**
     * If isSnippet is true, then certain features will be turned off.
     * This includes showing the map and the shared ID feature.
     */
    isSnippet: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      competitionTree: [],
      months: [],
      scrollCounter: 1,
    }
  },
  watch: {
    async selectedCountry() {
      // Updates the countrycode in the url.
      if (this.$route.query.country != this.selectedCountry.countryCode) {
        // Adds a query parameter to the list query object without replacing the
        // query parameters already in the object.
        this.$router.replace({
          query: Object.assign({}, this.$route.query, { country: this.selectedCountry.countryCode }),
        })
      }

      // Firebase Analytics Logs the selected country.
      this.$fireAnalytics.logEvent(selectedCountryEventName, {
        country_code: this.selectedCountry.countryCode,
        sport_name: this.sport,
      })

      // Gathers the competitions from the JSON data.
      var competitions = await jsonRetriever.buildCompetitionData(this.selectedCountry)

      // This removes the unused JSON data.
      // This makes the data smaller and helps with performance.
      var cleanCompetitions = compititonUtility.cleaner(competitions, this.sport)

      // Sets up all filter items.
      // This needs to be done here as different filter options will be created based
      // on competition data available. One country may have different filter options to another.
      this.months = compititonUtility.monthBuilder(cleanCompetitions)
      // Adds the current month to list of available months.
      this.$store.dispatch('changeSelectedMonth', moment().format('MMMM YYYY'))
      if (!this.months.includes(this.selectedMonth)) {
        this.months.push(this.selectedMonth)
      }

      // Creates a competition tree.
      this.competitionTree = compititonUtility.treeBuilder(cleanCompetitions, this.months)

      // Updates the selected month if a compeitition ID is provided in the URL.
      if (!this.isSnippetStore) {
        this.useCompetitionMonth(this.$route.query.id)
      }
    },
    /**
     * Whenever the active competition changes.
     * Update the id in the url to match.
     */
    activeComp() {
      // Do not perfrom these actions if it is a snippet.
      // Also if the url also already contains this id, then do nothing.
      if (this.isSnippetStore) return
      if (this.$route.query.id == this.activeComp.id) return

      // Firebase Analytics Logs the selected competition.
      this.$fireAnalytics.logEvent(selectedCompetitionEventName, {
        competition_id: this.activeComp.id,
        country_code: this.selectedCountry.countryCode,
        sport_name: this.sport,
      })

      // Adds a query parameter to the list query object without replacing the
      // query parameters already in the object.
      this.$router.replace({
        query: Object.assign({}, this.$route.query, { id: this.activeComp.id }),
      })
    },
  },
  computed: {
    /**
     * A computed property that creates a list of branches from the comptree to display.
     * These branches are then flitered and sorted based on the users filter preferences.
     */
    viewableBranches() {
      var viewableBranches = []

      // If the user wants to display all, then make a non reference copy of the tree.
      if (this.displayAll) {
        viewableBranches = [...this.competitionTree]
      } else {
        // Populates the viewableBranches by filtering out unselected months.
        this.competitionTree.forEach((branch) => {
          // If the branch month matches the selected month then add it to viewableBranches.
          if (branch.month == this.selectedMonth) {
            viewableBranches.push(branch)
          }
        })
      }

      // Applies the selected sort option to the competitions in the viewableBranches.
      viewableBranches.forEach((branch) => {
        this.sortCompetitions(this.selectedSort, branch.competitions)
      })
      // Finally after sorting the competitions in each branch, we then sort the branches themselves.
      this.sortBranches(this.selectedSort, viewableBranches)

      // Resets the infinite loader counter to 1.
      this.scrollCounter = 1

      return viewableBranches
    },
    selectedCountry() {
      return this.$store.state.selectedCountry
    },
    displayAll() {
      return this.$store.state.displayAll
    },
    selectedSort() {
      return this.$store.state.selectedSort
    },
    selectedMonth: {
      get() {
        return this.$store.state.selectedMonth
      },
      set(newValue) {
        this.$store.dispatch('changeSelectedMonth', newValue)
      },
    },
    isSnippetStore: {
      get() {
        return this.$store.state.isSnippet
      },
      set(newValue) {
        this.$store.dispatch('changeIsSnippet', newValue)
      },
    },
    activeComp: {
      get() {
        return this.$store.state.activeComp
      },
      set(newValue) {
        this.$store.dispatch('changeActiveComp', newValue)
      },
    },
  },
  /**
   * Just after Vue is initiated, we reset the vuex state for fixture pages.
   * This is because Vuex is needed to manage fixture variables. However there will
   * be conflicts if a user navigates between two different fixture pages. So to solve this
   * the Vuex state of a fixture page is reset whenever a user visits a fixture page.
   */
  beforeCreate() {
    this.$store.dispatch('resetVuex')
  },
  /**
   * Sets the current country to the first one in the list, and sorts the list of
   * countries.
   */
  created() {
    // Updates the isSnippet state in Vuex
    this.isSnippetStore = this.isSnippet

    // Sets the current country based on Query Parameters. If no parameter was given,
    // then a default country will be chosen (First element in array)
    if (this.$route.query.country) {
      // Finds the country based on the country code given.
      const selectedCountry = this.countries.find((country) => {
        return country.countryCode == this.$route.query.country
      })

      // Sets the country as selected if found.
      if (selectedCountry) {
        this.$store.dispatch('changeSelectedCountry', selectedCountry)
      } else {
        // If not found, use default.
        this.$store.dispatch('changeSelectedCountry', this.countries[0])
      }
    } else {
      // If no paramter given, use default.
      this.$store.dispatch('changeSelectedCountry', this.countries[0])
    }

    // Sorts the counties in alphabetical order.
    this.countries.sort((a, b) => (a.countryCode > b.countryCode ? 1 : -1))
  },
  methods: {
    /**
     * Given a competition Id, find the competition with that id and then set the current month
     * as start month of that competition, if the competition can be found.
     */
    useCompetitionMonth(competitionId) {
      // Loops through every competition in every branch.
      this.competitionTree.forEach((branch) => {
        branch.competitions.forEach((competition) => {
          // If it finds the competition with the same id.
          if (competition.id == competitionId) {
            // Formats the competition month, if the month is different then update
            // the selected month
            var month = moment(competition.date).format('MMMM YYYY')
            if (this.selectedMonth != month) {
              this.selectedMonth = month
            }

            // Sets the currently active competition.
            this.activeComp = competition
          }
        })
      })
    },
    /**
     * This function is called from a computed property. This function sorts
     * a list of competitions, based on the value provided from the sort
     * selector element.
     */
    sortCompetitions(itemValue, competitions) {
      // Months - Ascending
      if (itemValue == 1) {
        competitions.sort(function (x, y) {
          if (moment(x.date).isBefore(moment(y.date))) {
            return -1
          }
          if (moment(x.date).isAfter(moment(y.date))) {
            return 1
          }
          return 0
        })

        // Months - Descending
      } else if (itemValue == 2) {
        competitions.sort(function (x, y) {
          if (moment(y.date).isBefore(moment(x.date))) {
            return -1
          }
          if (moment(y.date).isAfter(moment(x.date))) {
            return 1
          }
          return 0
        })
      }
    },
    /**
     * This function is called from a computed property. This function sorts
     * a list of branches based on their month.
     */
    sortBranches(itemValue, branches) {
      // Ascending
      if (itemValue == 1) {
        branches.sort(function (x, y) {
          if (moment(x.month, 'MMMM YYYY').isBefore(moment(y.month, 'MMMM YYYY', 'month'))) {
            return -1
          }
          if (moment(x.month, 'MMMM YYYY').isAfter(moment(y.month, 'MMMM YYYY', 'month'))) {
            return 1
          }
          return 0
        })

        // Descending
      } else if (itemValue == 2) {
        branches.sort(function (x, y) {
          if (moment(y.month, 'MMMM YYYY').isBefore(moment(x.month, 'MMMM YYYY', 'month'))) {
            return -1
          }
          if (moment(y.month, 'MMMM YYYY').isAfter(moment(x.month, 'MMMM YYYY', 'month'))) {
            return 1
          }
          return 0
        })
      }
    },
    /**
     * A function that updates the scroll counter by incrementing it by one.
     * This function is usually called by the list component via emits.
     */
    updateScrollCounter() {
      this.scrollCounter++
    },
  },
}
</script>

<style lang="scss" scoped>
.calendar-outer-container {
  height: 100%;
  display: flex;
  position: relative;
}

.calendar-outer-container-non-snippet {
  height: calc(100% - 56px);
}

#calendar-main-container {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
}

.calendar-main-container-non-snippet {
  height: 100%;
  max-height: 100%;
  position: absolute;
  left: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  z-index: 2;
}

@media only screen and (min-width: 960px) {
  .calendar-main-container-non-snippet {
    max-width: 400px;
    position: relative;
  }
}

.filter-container {
  flex-direction: column;
  border-bottom: 1px lightgray solid;
  min-height: fit-content;
}
</style>
