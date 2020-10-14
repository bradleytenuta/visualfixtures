<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-chip v-bind="attrs" v-on="on" outlined label x-small :color="color" :ripple="false">
        <!-- Includes Icon in the chip if prop is given -->
        <v-icon v-if="icon" left class="comp-chip-icon">{{ icon }}</v-icon>
        {{ text }}
      </v-chip>
    </template>
    <!-- Each Chip comes with tooltip text -->
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'card-chip',
  props: {
    color: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tooltip: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.comp-chip-icon {
  font-size: 12px !important;
}
</style>
