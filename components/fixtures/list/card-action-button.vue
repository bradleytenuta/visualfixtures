<template>
  <!-- View Button -->
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <!-- Button with Link -->
        <v-btn v-if="competition.entry_link" color="primary" target="_blank" :href="competition.entry_link" text>Visit Site</v-btn>
        <!-- Disabled button - no link -->
        <v-btn v-else color="primary" target="_blank" :href="competition.default_entry_link" text> Visit Site </v-btn>
      </div>
    </template>
    <span>View competition and entry information (External Site)</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'card-action-button',
  props: {
    competition: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**
     * This function formats the given string based on the format
     * provided.
     */
    formatDate(dateString, formatString) {
      return moment(dateString).format(formatString)
    },
  },
}
</script>
