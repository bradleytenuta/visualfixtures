<template>
  <v-container class="comp-calendar" id="competition-calendar" v-scroll.self="calendarScrollHandler">
    <!-- Displays Fixtures -->
    <template v-for="viewableBranch in viewableBranches.slice(0, infiniteLoaderCounter)">
      <!-- Month Header -->
      <h3 class="comp-month-header">{{ viewableBranch.month }}</h3>

      <!-- Competition Cards -->
      <div class="d-flex comp-month-card-container">
        <!--  :key="competition.id" -->
        <card v-for="competition in viewableBranch.competitions" :key="competition.id" :competition="competition" />
      </div>
    </template>

    <!-- Infinite Scroller - Load More Button -->
    <div v-if="infiniteLoaderCounter < viewableBranches.length" class="comp-load-more-container">
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

export default {
  name: 'list',
  components: {
    card,
  },
  props: {
    infiniteLoaderCounter: {
      type: Number,
      required: true,
    },
    viewableBranches: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
    }
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
      const element = document.getElementById('competition-calendar')

      // If the user has scrolled to the button then increment counter.
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        if (this.viewableBranches.length > this.infiniteLoaderCounter) {
          this.infiniteLoaderCounter++
        }
      }
    },
  },
}
</script>

<style scoped>
.comp-calendar {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /* Firefox scrollbar styling - webkit scrollbar works for all other browsers */
  scrollbar-width: thin;
  scrollbar-color: #cdcdcd transparent;
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
