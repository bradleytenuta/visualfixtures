<!-- 
This component should only be rendered on the clinet side. 
In order to do this, wrap this component within '<client-only>' tags.

This is made with: vue2-leaflet (https://vue2-leaflet.netlify.app/).
This itself wraps leaflet.js into vue components.
Its then wrapped in another module to work with Nuxt: nuxt-leaflet (https://github.com/schlunsen/nuxt-leaflet).

Use this website to choose a leaflet tile provider: http://leaflet-extras.github.io/leaflet-providers/preview/index.html

To Access the Leaflet map object: 'this.$refs.lMap.mapObject'
-->
<template>
  <div class="map-outer-container">
    <l-map ref="lMap" :zoom="8" :center="[defaultCenter.lat, defaultCenter.lng]" :options="{ zoomControl: false }">
      <template v-for="viewableBranch in viewableBranches.slice(0, scrollCounter)">
        <l-marker
          v-for="competition in viewableBranch.competitions"
          v-if="competition.latitude && competition.longitude"
          :key="competition.id"
          :lat-lng="[competition.latitude, competition.longitude]"
          :icon="competition == activeComp ? customIcons.selected : customIcons.notSelected"
          @click="activateComp(competition)"
        ></l-marker>
      </template>
    </l-map>

    <!-- Marker card container -->
    <!-- Contains information about the currently selected competition, only in mobile view -->
    <map-marker-card
      v-if="activeComp && screenSize < 960 && activeComp.latitude && activeComp.longitude"
      :competition="activeComp"
    ></map-marker-card>
  </div>
</template>

<script>
// All map styles are saved in a seperate file.
import markerCard from '~/components/fixtures/map/map-marker-card'

export default {
  name: 'map-view',
  components: {
    'map-marker-card': markerCard,
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
      // Contains a custom selected image and a custom non selected image.
      customIcons: {
        selected: new this.$L.Icon({
          iconUrl:
            'https://firebasestorage.googleapis.com/v0/b/visualfixtures.appspot.com/o/map%2Fmap-marker-active.png?alt=media&token=e3671736-43b6-48c9-9478-a311f40208d3',
        }),
        notSelected: new this.$L.Icon({
          iconUrl:
            'https://firebasestorage.googleapis.com/v0/b/visualfixtures.appspot.com/o/map%2Fmap-marker.png?alt=media&token=8cedc93f-f09c-4ed9-9adf-e394591f74f5',
        }),
      },
      // Default Center is london.
      defaultCenter: {
        lat: 51.5287718,
        lng: -0.2416804,
      },
      screenSize: 0,
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
  /**
   * Creates a watch listener on the screen resize.
   */
  created() {
    window.addEventListener('resize', this.myEventHandler)
  },
  /**
   * when this is destroyed, it also destroies the screen size listener.
   */
  destroyed() {
    window.removeEventListener('resize', this.myEventHandler)
  },
  async mounted() {
    // Waits for map component to load.
    await this.$nextTick()

    // Creates a tile layer to display within the map object.
    //This was copied from the leaflet tile provider website.
    var stadiaTileLayer = this.$L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    })

    // Adds the tile to the map.
    stadiaTileLayer.addTo(this.$refs.lMap.mapObject)

    // Initialises the screen size on creation.
    this.screenSize = window.innerWidth
  },
  watch: {
    /**
     * Watches for changes in viewablebranches. If a change is detected then
     * update the maps center based on the currently active comp or the first comp
     * in the list.
     */
    async viewableBranches() {
      var firstCompWithLocation = null
      var activeCompFound = false

      // Loops through each branch and competition.
      for (let branch of this.viewableBranches) {
        for (let competition of branch.competitions) {
          // If the currently active competition was found.
          if (this.activeComp == competition) {
            this.setCentre(this.activeComp)
            activeCompFound = true
            break
          }

          // If the competition has a valid location and a first comp has not been set yet.
          if (competition.latitude && competition.longitude && firstCompWithLocation == null) {
            firstCompWithLocation = competition
          }
        }
      }

      // Sets the first comp if an active comp wasnt found in the comp list.
      if (firstCompWithLocation && !activeCompFound) {
        this.setCentre(firstCompWithLocation)
      }
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
        this.$refs.lMap.mapObject.panTo(new this.$L.LatLng(competition.latitude, competition.longitude))
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

<!-- Style is not scoped -->
<style lang="scss" scoped>
.map-outer-container {
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
