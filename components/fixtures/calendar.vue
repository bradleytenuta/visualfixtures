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
      const parentName = this.$parent._name
      var cleanCompetitions = compititonUtility.cleaner(competitions, parentName.substring(1, parentName.length - 1))

      // Sets up all filter items.
      // This needs to be done here as different filter options will be created based
      // on competition data available. One country may have different filter options to another.
      this.buildMonths(cleanCompetitions)

      // Creates a competition tree.
      this.competitionTree = compititonUtility.treeBuilder(cleanCompetitions, this.months)
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
    // Sets the current country to the first country in the list.
    this.$store.dispatch('changeSelectedCountry', this.countries[0])

    // Sorts the counties in alphabetical order.
    this.countries.sort()
  },
  methods: {
    /**
     * Creates a list of months based on competition dates.
     */
    buildMonths(competitions) {
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
