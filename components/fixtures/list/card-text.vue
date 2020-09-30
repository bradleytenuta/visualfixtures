<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on" class="px-2 comp-info-card-text-container">
          <v-icon color="yellow darken-4" class="comp-info-card-icon">{{ icon }}</v-icon>
          {{ text }}
        </div>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
    <v-divider v-show="divider" class="comp-info-card-vertical-divider" vertical></v-divider>
  </div>
</template>

<script>
export default {
  name: 'card-text',
  props: {
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
    divider: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style scoped>
.comp-info-card-text-container {
  display: inline-flex;
  white-space: nowrap;
  cursor: default;
}

.comp-info-card-icon {
  font-size: 17px !important;
  margin-right: 4px;
}

.comp-info-card-vertical-divider {
  display: inline;
}
</style>
