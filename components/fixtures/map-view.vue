<template>
  <div class="map-outer-container">
    <GMap
      ref="GMap"
      language="en"
      :center="londonPosition"
      :options="{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        gestureHandling: 'greedy',
        styles: mapStyle,
      }"
      :zoom="8"
    >
      <template v-for="viewableBranch in viewableBranches.slice(0, scrollCounter)">
        <GMapMarker
          ref="markers"
          v-for="competition in viewableBranch.competitions"
          v-if="competition.latitude && competition.longitude"
          :key="competition.id"
          :position="{ lat: competition.latitude, lng: competition.longitude }"
          :options="{ icon: competition == activeComp ? pins.selected : pins.notSelected }"
          @click="activateComp(competition)"
        >
        </GMapMarker>
      </template>
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
          'https://firebasestorage.googleapis.com/v0/b/visualfixtures.appspot.com/o/map%2Fmap-marker-active.png?alt=media&token=e3671736-43b6-48c9-9478-a311f40208d3',
        notSelected:
          'https://firebasestorage.googleapis.com/v0/b/visualfixtures.appspot.com/o/map%2Fmap-marker.png?alt=media&token=d16907d7-9f89-4d81-8207-be9ea5295f52',
      },
      mapStyle: retro,
      londonPosition: {
        lat: 51.5287718,
        lng: -0.2416804,
      },
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
     * Whenever viewable branches updates it waits a tick then updates the map markers.
     * We wait a tick for the child elements of the map to be added. Then the map centre is
     * given based on a selected competition or the first in the list.
     */
    async viewableBranches() {
      await this.$nextTick() // Waits for a tick for the children to be added to the map element.
      this.$refs.GMap.initMap()

      // Sets the centre for the map based on the currently active comp, or the first comp in the list.
      if (this.activeComp) {
        this.setCentre(this.activeComp)
      } else {
        for (let branch of this.viewableBranches) {
          for (let competition of branch.competitions) {
            if (competition.latitude && competition.longitude) {
              this.setCentre(competition)
              break
            }
          }
        }
      }
    },
    /**
     * When scroll counter updates, runs the init function to produce more markers.
     * This only runs when displaying all.
     */
    async scrollCounter() {
      await this.$nextTick() // Waits for a tick for the children to be added to the map element.
      this.$refs.GMap.initChildren()
    },
    /**
     * Watches for the active competition to change. When it does, recentre the map onto
     * the currently active comp.
     */
    activeComp() {
      this.setCentre(this.activeComp)
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
    /**
     * Sets the maps current location to the given competiton.
     */
    setCentre(competition) {
      if (competition.latitude && competition.longitude) {
        if (competition) {
          this.$refs.GMap.map.setCenter({
            lat: competition.latitude,
            lng: competition.longitude,
          })
        }
      }
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
