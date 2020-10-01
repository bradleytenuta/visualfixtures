<template>
  <div class="calendar-main-container">
    <!-- Filters Menu -->
    <filters :countries="countries" :months="months" :searchText="searchText" v-on:SearchTextChange="updateSearchText" />

    <!-- Fixture List -->
    <list :scrollCounter="scrollCounter" :viewableBranches="viewableBranches" v-on:incrementScrollCounter="scrollCounter++" />
  </div>
</template>

<script>
import filters from '~/components/fixtures/filters/filters.vue'
import list from '~/components/fixtures/list/list.vue'
import moment from 'moment'

export default {
  name: 'calendar',
  components: {
    filters,
    list,
  },
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      competitions: [],
      scrollCounter: 1,
      months: [],
      searchText: '',
    }
  },
  watch: {
    selectedCountry() {
      // Gathers JSON objects from all JSON URLs and sets up the competition tree and filters.
      this.buildCompetitionData()
    },
  },
  computed: {
    /**
     * A computed property that creates a list of branches from the comptree to display.
     * These branches are then flitered and sorted based on the users filter preferences.
     */
    viewableBranches() {
      var viewableBranches = []
      var tempCompTree = this.compTreeCreator(this.competitions)

      // Populates the viewableBranches by filtering out unselected months.
      tempCompTree.forEach((branch) => {
        // If the branch month matches the selected month then add it to viewableBranches.
        if (this.displayAll || branch.month == this.selectedMonth) {
          viewableBranches.push(branch)
        }
      })

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
    selectedMonth: {
      get() {
        return this.$store.getters.selectedMonth
      },
      set(newValue) {
        this.$store.dispatch('changeSelectedMonth', newValue)
      },
    },
    selectedCountry: {
      get() {
        return this.$store.getters.selectedCountry
      },
      set(newValue) {
        this.$store.dispatch('changeSelectedCountry', newValue)
      },
    },
    displayAll: {
      get() {
        return this.$store.getters.displayAll
      },
      set(newValue) {
        this.$store.dispatch('changeDisplayAll', newValue)
      },
    },
    selectedSort: {
      get() {
        return this.$store.getters.selectedSort
      },
      set(newValue) {
        this.$store.dispatch('changeSelectSort', newValue)
      },
    },
  },
  /**
   * This function is called once the vue instance has been created.
   * It sets the current country to UK. Currently the only country available.
   */
  created() {
    // Sets the current country to the first country in the list.
    this.$store.dispatch('changeSelectedCountry', this.countries[0])
  },
  methods: {
    /**
     * This is an asynchronous function that collects all json data for a given country.
     * Then builds a competition tree and sets up the filters on the vue page. This function
     * should only be called when changing country to display or when creating the vue page.
     */
    async buildCompetitionData() {
      var competitions = []
      // Creates a outer promise (an asynchronous function) that we will
      // wait to finish.
      let outerPromise = new Promise((resolve, reject) => {
        // Creates a lists of inner promises (asynchronous axios calls) based on
        // the number of JSON data URLs in the selected country.
        var innerPromises = []
        this.selectedCountry.urls.forEach((jsonUrl) => {
          innerPromises.push(this.$axios.get(jsonUrl))
        })

        // Runs each inner promise, then once all inner promises are complete,
        // send a message to let the code waiting know the outer promise is done.
        Promise.all(innerPromises).then(function (results) {
          results.forEach(function (response) {
            // Gets the json data and adds it to the list of competitions.
            competitions.push(response.data)
          })
          resolve('done')
        })
      })

      // The code waits here for the outer promise to finish before continueing.
      await outerPromise

      // Flatterns the competitions as after the promise it
      // contains an array as an element for each json url called.
      this.competitions = competitions.flat()

      // Sets up all filter items.
      // This needs to be done here as different filter options will be created based
      // on competition data available. One country may have different filter options to another.
      this.setUpFilters(this.competitions)
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
     * Takes a list of competitions and breaks them down into a tree based on
     * the available months.
     */
    compTreeCreator(competitions) {
      // Creates month containers and supplies is objects that contain each
      // available month.
      var compBranches = []
      this.months.forEach((month) => {
        compBranches.push({
          month: month,
          competitions: [],
        })
      })

      // Loops through each competition
      competitions.forEach((competition) => {
        // Do not add the competition if it is a demo fixture and not an actual fixture.
        if (competition.is_demo) return

        // Loops through each month
        this.months.forEach((month) => {
          // If the competition month is the same as the current filtered month
          // and the competition name matches the search text or the search text is empty
          // then add it to its branch.
          if (moment(competition.date).isSame(moment(month, 'MMMM YYYY'), 'month')) {
            if (
              this.searchText == null ||
              competition.full_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
              this.searchText == ''
            ) {
              // Finds the branch that matches and adds the competition to its list.
              var branch = compBranches.find((branch) => branch.month == month)
              branch.competitions.push(competition)
            }
          }
        })
      })

      // Code section below removes all the branches without any competitions from
      // the list of compbranches. Its complicated to remove specific elements from
      // an array in javascript.
      var tempCompBranches = [...compBranches]
      var branchesToRemove = []
      // Loops through the temp array and finds all indexs to remove.
      var i
      for (i = 0; i < tempCompBranches.length; i++) {
        if (tempCompBranches[i].competitions.length == 0) {
          branchesToRemove.push(i)
        }
      }
      // Loops through temp array in reverse order and removes empty elements.
      for (var i = branchesToRemove.length - 1; i >= 0; i--) {
        tempCompBranches.splice(branchesToRemove[i], 1)
      }

      return tempCompBranches
    },
    /**
     * Sets up the filters to include all available months and countries based off the
     * provided list of competitions (Untreed).
     */
    setUpFilters(competitions) {
      // Adds the current month to list of available months.
      this.$store.dispatch('changeSelectedMonth', moment().format('MMMM YYYY'))
      if (!this.months.includes(this.selectedMonth)) {
        this.months.push(this.selectedMonth)
      }

      // Adds all the available months and countries from list.
      competitions.forEach((competition) => {
        // Adds available months.
        var month = moment(competition.date).format('MMMM YYYY')
        if (!this.months.includes(month)) {
          this.months.push(month)
        }
      })

      // Sorts the counties in alphabetical order.
      this.countries.sort()

      // Sorts the months in calendar order.
      this.months.sort((x, y) => moment(x, 'MMMM YYYY') - moment(y, 'MMMM YYYY'))
    },
    updateSearchText(newText) {
      this.searchText = newText
    },
  },
}
</script>

<style scoped>
.calendar-main-container {
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
}
</style>
