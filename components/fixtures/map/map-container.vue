<!--
This Vue component was made with insperation from the developer: 'Dario Ferderber'.
The repository I used to help me structure my components: 'https://gitlab.com/broj42/nuxt-gmaps/-/tree/master'
-->
<template>
  <div class="vfmap">
    <div ref="map" class="vfmap-wrapper"></div>

    <!-- Slot for markers -->
    <slot />
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      },
    },
    language: {},
    zoom: {
      type: Number,
      default: 6,
    },
    // Default center is London.
    center: {
      type: Object,
      default: () => {
        return {
          lat: 51.5287718,
          lng: -0.2416804,
        }
      },
    },
  },
  data() {
    return {
      map: null,
      google: null,
      markers: [],
      events: [
        'bounds_changed',
        'center_changed',
        'click',
        'dblclick',
        'drag',
        'dragend',
        'dragstart',
        'heading_changed',
        'idle',
        'maptypeid_changed',
        'mousemove',
        'mouseout',
        'mouseover',
        'projection_changed',
        'resize',
        'rightclick',
        'tilesloaded',
        'tilt_changed',
        'zoom_changed',
      ],
    }
  },
  /**
   * This is called when the map is first mounted.
   * It Creates the map and google maps api object.
   */
  async mounted() {
    // The settings to be used from the google maps API.
    let vfmapSettings = {
      apiKey: 'AIzaSyAptX1_Xcjtarop4EQ2b-TmMzW8eyWbKmM',
      language: this.language,
    }

    // Creates an object that contains the google maps javascript api.
    // Used by the child, map-marker component.
    this.google = await GoogleMapsApiLoader(vfmapSettings)

    // Creates the map.
    this.map = new google.maps.Map(this.$refs.map, {
      center: this.center,
      zoom: this.zoom,
      ...this.options,
    })

    this.initChildren()

    // Registers events.
    this.events.forEach((event) => {
      this.map.addListener(event, (e) => {
        this.$emit(event, {
          map: this.map,
          event: e,
        })
      })
    })
  },
  methods: {
    /**
     * This function should be called after vue markers have been created in html
     * and are ready to be added to the map. This removes old markers and replaces
     * them with the new markers. It also runs the init function found within
     * the marker component.
     */
    initChildren() {
      // Removes all child markers.
      var i
      for (i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
      }
      // Sets the number of markers to zero.
      this.markers = []

      // For each child component, call the init method within it.
      // This would be the marker component init function.
      this.$children.forEach((child) => {
        child.init()
      })

      // Sets the map markers to equal this maps markers.
      this.map['markers'] = this.markers
    },
  },
}
</script>

<style lang="scss" scoped>
.vfmap {
  width: 100%;
  height: 100%;
}

.vfmap-wrapper {
  width: 100%;
  height: 100%;
}
</style>
