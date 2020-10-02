<template>
  <v-container class="comp-calendar" ref="list" v-scroll.self="calendarScrollHandler">
    <!-- Displays Fixtures -->
    <template v-for="viewableBranch in viewableBranches.slice(0, scrollCounter)">
      <!-- Month Header -->
      <h3 class="comp-month-header">{{ viewableBranch.month }}</h3>

      <!-- Competition Cards -->
      <div class="d-flex comp-month-card-container">
        <!-- :key="competition.id" -->
        <card
          v-for="competition in viewableBranch.competitions"
          v-if="competition.full_name.toLowerCase().includes(searchText.toLowerCase())"
          :key="competition.id"
          :competition="competition"
        />
      </div>
    </template>

    <!-- Infinite Scroller - Load More Button -->
    <div v-if="scrollCounter < viewableBranches.length" class="comp-load-more-container">
      <v-btn @click="calendarScrollHandler">Load More...</v-btn>
    </div>

    <!-- No Competitions Container -->
    <div v-if="viewableBranches.length == 0" class="no-comp-container">
      <p>No Competitions found!</p>
    </div>

    <!-- Global Snackbar -->
    <v-snackbar v-model="snackbar" timeout="2000">
      Copied to clipboard.
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import card from '~/components/fixtures/list/card.vue'
import moment from 'moment'

export default {
  name: 'list',
  components: {
    card,
  },
  props: {
    competitionTree: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
      scrollCounter: 1,
    }
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
    selectedMonth() {
      return this.$store.state.selectedMonth
    },
    displayAll() {
      return this.$store.state.displayAll
    },
    selectedSort() {
      return this.$store.state.selectedSort
    },
    searchText() {
      return this.$store.state.searchText
    },
  },
  methods: {
    /**
     * This function is the scroll handler for the competition calendar.
     * It can also be called directly instead of waiting for the handler to self
     * execute. This function loads additional fixtures to the competition calendar.
     * This infinite scroll was created as the performace for rendering a large amount of html elements
     * was very taxing. The actual computation is fast but the rendering of elements was slow. An infinite
     * scroll was created to break down this long computation to much smaller ones.
     */
    calendarScrollHandler() {
      // Gets element by ID instead of using target so other buttons
      // can use this function.
      const element = this.$refs.list

      // If the user has scrolled to the button then increment counter.
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        if (this.viewableBranches.length > this.scrollCounter) {
          this.scrollCounter++
        }
      }
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
  },
}
</script>

<style scoped>
.comp-calendar {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /* Firefox scrollbar styling - webkit scrollbar works for all other browsers */
  scrollbar-width: thin;
  scrollbar-color: #cdcdcd transparent;
  padding: 0px;
}

.comp-month-header {
  font-size: 30px;
  margin-left: 25px;
  margin-right: 25px;
  border-bottom: 1px solid black;
}

.comp-month-card-container {
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  place-content: center;
}

.comp-load-more-container {
  text-align: center;
  margin: 40px;
}

.no-comp-container {
  text-align: center;
  font-size: 30px;
}

/* width */
.comp-calendar::-webkit-scrollbar {
  width: 12px;
  background-color: transparent;
}

/* Track */
.comp-calendar::-webkit-scrollbar-track {
  background-color: transparent;
}

/* Handle */
.comp-calendar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(230, 230, 230, 0.9);
}

/* Handle on hover */
.comp-calendar::-webkit-scrollbar-thumb:hover {
  background: lightgray;
}
</style>
