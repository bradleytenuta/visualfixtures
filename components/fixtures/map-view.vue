<template>
  <div class="map-outer-container">
    <!-- :center="{ lat: competitions[0].latitude, lng: competitions[0].longitude }" -->
    <GMap
      ref="GMap"
      language="en"
      :options="{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        gestureHandling: 'greedy',
        styles: mapStyle,
      }"
      :zoom="6"
    >
      <GMapMarker
        ref="markers"
        v-for="competition in competitions"
        :key="competition.id"
        :position="{ lat: competition.latitude, lng: competition.longitude }"
        :options="{ icon: competition == activeComp ? pins.selected : pins.notSelected }"
        @click="activateComp(competition)"
      >
      </GMapMarker>
    </GMap>
  </div>
</template>

<script>
// All map styles are saved in a seperate file.
import { retro } from '~/static/mapStyles'

export default {
  name: 'map-view',
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
      pins: {
        selected:
          'https://firebasestorage.googleapis.com/v0/b/visualfixtures.appspot.com/o/map%2Fmap-marker-active.png?alt=media&token=4fdc7570-d374-4ee3-b23b-824e58968686',
        notSelected:
          'https://firebasestorage.googleapis.com/v0/b/visualfixtures.appspot.com/o/map%2Fmap-marker.png?alt=media&token=d16907d7-9f89-4d81-8207-be9ea5295f52',
      },
      mapStyle: retro,
      competitions: [],
    }
  },
  computed: {
    /**
     * The currently active competition from the Vuex store.
     */
    activeComp: {
      get() {
        return this.$store.state.activeComp
      },
      set(newValue) {
        this.$store.dispatch('changeActiveComp', newValue)
      },
    },
  },
  watch: {
    /**
     * This breaks down 'viewableBranches' to just a list of competitions.
     */
    viewableBranches() {
      var newCompetitions = []

      // Uses the same computation as the list component to display the
      // same number of compeitions in a pagination way.
      // Loops through each available branch and through each list of competitions
      // and adds them to a new list of competitions if they have lat and lng properties.
      this.viewableBranches.slice(0, this.scrollCounter).forEach((branch) => {
        branch.competitions.forEach((competition) => {
          if (competition.latitude && competition.longitude) {
            newCompetitions.push(competition)
          }
        })
      })

      this.competitions = newCompetitions
    },
    /**
     * Watch for when compeititions update. When they do, we wait one tick for the google
     * map markers to be created then we run map init which creates the markers.
     */
    async competitions() {
      await this.$nextTick()
      this.$refs.GMap.initChildren()
    },
  },
  methods: {
    /**
     * When a competition marker is clicked, this function gets called.
     * It updates the currently active competition.
     */
    activateComp(competition) {
      if (competition == this.activeComp) return

      // Sets the new active competition.
      this.activeComp = competition
    },
  },
}
</script>

<!-- Style is not scoped -->
<style>
.map-outer-container {
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
}

@media only screen and (min-width: 960px) {
  .map-outer-container {
    height: calc(100% - 56px);
  }
}

/* Overwriting Styling inside GMap */
.GMap {
  width: 100%;
  height: 100%;
}
.GMap__Wrapper {
  width: 100%;
  height: 100%;
}
</style>
