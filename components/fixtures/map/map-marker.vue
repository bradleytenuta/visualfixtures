<!--
This Vue component was made with insperation from the developer: 'Dario Ferderber'.
The repository I used to help me structure my components: 'https://gitlab.com/broj42/nuxt-gmaps/-/tree/master'
-->
<template>
  <div v-if="!markerLoaded"></div>
</template>

<script>
export default {
  props: {
    position: Object,
    options: Object,
  },
  data() {
    return {
      marker: null,
      markerLoaded: false,
      events: ['click', 'mouseover', 'mouseout'],
    }
  },
  methods: {
    /**
     * This function is called whenever its time to add
     * a given marker to the map.
     */
    init() {
      // TODO: Works but find a better approach.
      //    If google is undefined, exit.
      //    This occurs when this function is called before map-container mount function
      //    has finished running.
      if (this.$parent.google == null) {
        return
      }

      // Initalises variables
      this.marker = null
      this.markerLoaded = false

      // Parses the co-ordinates.
      this.position.lat = parseFloat(this.position.lat)
      this.position.lng = parseFloat(this.position.lng)

      // Creates the marker.
      this.marker = new this.$parent.google.maps.Marker({
        position: this.position,
        map: this.$parent.map,
        ...this.options,
      })

      // Adds this marker to the array of markers.
      this.$parent.markers.push(this.marker)
      this.markerLoaded = true

      this.events.forEach((event) => {
        this.$parent.google.maps.event.addListener(this.marker, event, (e) => {
          this.$emit(event, {
            position: this.position,
            event: e,
            map: this.$parent.map,
            marker: this.marker,
          })
        })
      })
    },
  },
  /**
   * Updates the marker icon if a change in the options prop is detected.
   */
  watch: {
    'options.icon'(value) {
      this.marker.setIcon(value)
    },
  },
}
</script>
