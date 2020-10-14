<template>
  <div class="comp-calendar" ref="list" v-scroll.self="calendarScrollHandler">
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
          :snackbar="snackbar"
          :screenSize="screenSize"
          v-on:updateSnackbar="snackbar = true"
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

    <!-- List Whitespace - Created so mobile bottom navbars dont hide bottom of list -->
    <div class="comp-calendar-whitespace-filler"></div>

    <!-- Global Snackbar -->
    <v-snackbar v-model="snackbar" timeout="2000">
      Copied to clipboard.
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
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
    viewableBranches: {
      type: Array,
      required: true,
    },
    scrollCounter: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
      screenSize: 0,
    }
  },
  computed: {
    searchText() {
      return this.$store.state.searchText
    },
  },
  /**
   * Creates a watch listener on the screen resize.
   */
  created() {
    if (process.browser) {
      window.addEventListener('resize', this.myEventHandler)
    }
  },
  /**
   * when this is destroyed, it also destroies the screen size listener.
   */
  destroyed() {
    if (process.browser) {
      window.removeEventListener('resize', this.myEventHandler)
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
      const element = this.$refs.list

      // If the user has scrolled to the button then increment counter.
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        if (this.viewableBranches.length > this.scrollCounter) {
          // Emits an event to update the scroll counter.
          this.$emit('updateScrollCounter')
        }
      }
    },
    /**
     * This function is called whenever the screen size changes.
     * When the screen size changes, update the screenSize value.
     */
    myEventHandler(e) {
      this.screenSize = e.target.innerWidth
    },
  },
}
</script>

<style lang="scss" scoped>
.comp-calendar {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /* Firefox scrollbar styling - webkit scrollbar works for all other browsers */
  scrollbar-width: thin;
  scrollbar-color: #cdcdcd transparent;
  padding: 12px;

  /* width */
  &::-webkit-scrollbar {
    width: 12px;
    background-color: transparent;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(230, 230, 230, 0.9);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: lightgray;
  }
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

.comp-calendar-whitespace-filler {
  width: 100%;
  height: 100px;
  min-height: 100px;
  background-color: transparent;
}
</style>
