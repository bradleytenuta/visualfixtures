<template>
  <div class="calendar-main-container">
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
      var competitions = await this.buildCompetitionData()

      // This removes the unused JSON data.
      // This makes the data smaller and helps with performance.
      // TODO: This is athletics specific, needs to be moved up to page level.
      var cleanCompetitions = []
      competitions.forEach((competition) => {
        var cleanComp = {
          id: competition.id,
          is_demo: competition.is_demo,
          date: competition.date,
          full_name: competition.full_name,
          num_competitors: competition.num_competitors,
          finish_date: competition.finish_date,
          type: competition.type,
          age_groups: competition.age_groups,
          address: competition.address,
          entry_link: competition.entry_link,
          contact_details: competition.contact_details,
          latitude: competition.latitude,
          longitude: competition.longitude,
        }
        cleanCompetitions.push(cleanComp)
      })

      // Sets up all filter items.
      // This needs to be done here as different filter options will be created based
      // on competition data available. One country may have different filter options to another.
      this.setUpFilters(cleanCompetitions)

      // Creates a competition tree.
      this.competitionTree = this.compTreeCreator(cleanCompetitions)
    },
  },
  computed: {
    selectedMonth: {
      get() {
        return this.$store.state.selectedMonth
      },
      set(newValue) {
        this.$store.dispatch('changeSelectedMonth', newValue)
      },
    },
    selectedCountry: {
      get() {
        return this.$store.state.selectedCountry
      },
      set(newValue) {
        this.$store.dispatch('changeSelectedCountry', newValue)
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
      return competitions.flat()
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
          // then add it to its branch.
          if (moment(competition.date).isSame(moment(month, 'MMMM YYYY'), 'month')) {
            // Finds the branch that matches and adds the competition to its list.
            var branch = compBranches.find((branch) => branch.month == month)
            branch.competitions.push(competition)
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
  },
}
</script>

<style scoped>
.calendar-main-container {
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
}

.filter-container {
  flex-direction: column;
  border-bottom: 1px lightgray solid;
}
</style>
