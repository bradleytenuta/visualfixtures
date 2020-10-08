<template>
  <calendar :countries="countries" sport="athletics" isSnippet />
</template>

<script>
import calendar from '~/components/fixtures/calendar.vue'
import { sports } from '~/services/jsonLinks'

export default {
  name: 'athletics',
  layout: 'snippets',
  components: {
    calendar,
  },
  data() {
    return {
      countries: sports.find((sport) => {
        return sport.name == 'athletics'
      }).countries,
    }
  },
}
</script>
