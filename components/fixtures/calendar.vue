<template>
  <div class="calendar-main-container" :class="{ 'calendar-main-container-non-snippet': !isSnippet }">
    <!-- Filters Menu -->
    <div class="d-flex filter-container">
      <!-- Toolbar Component -->
      <toolbar />

      <!-- Dropdown Component -->
      <dropdown :countries="countries" :months="months" />
    </div>

    <!-- Fixture List -->
    <list :competitionTree="competitionTree" />
  </div>
</template>

<script>
import toolbar from '~/components/fixtures/filters/toolbar.vue'
import dropdown from '~/components/fixtures/filters/dropdown.vue'
import list from '~/components/fixtures/list/list.vue'
import jsonRetriever from '~/services/jsonRetriever.js'
import compititonUtility from '~/services/compititonUtility.js'
import moment from 'moment'

export default {
  name: 'calendar',
  components: {
    toolbar,
    dropdown,
    list,
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
    }
  },
  watch: {
    async selectedCountry() {
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
      this.useCompetitionMonth(this.$route.query.id)
    },
  },
  computed: {
    selectedCountry() {
      return this.$store.state.selectedCountry
    },
    selectedMonth: {
      get() {
        return this.$store.state.selectedMonth
      },
      set(newValue) {
        this.$store.dispatch('changeSelectedMonth', newValue)
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
          }
        })
      })
    },
  },
}
</script>

<style scoped>
.calendar-main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.calendar-main-container-non-snippet {
  height: calc(100% - 56px) !important;
}

.filter-container {
  flex-direction: column;
  border-bottom: 1px lightgray solid;
}
</style>
