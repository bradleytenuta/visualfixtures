<template>
  <calendar :countries="countries" :sport="$options.sportName" isSnippet />
</template>

<script>
import calendar from '~/components/fixtures/calendar.vue'
import { sports } from '~/services/jsonLinks'

// Reduces duplication of sport name.
const sportName = 'athletics'

export default {
  name: sportName,
  layout: 'fixtures',
  sportName,
  head() {
    return {
      title: sportName.charAt(0).toUpperCase() + sportName.slice(1) + ' Snippet',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `View ${sportName} fixtures near you. Designed for external viewing.`,
        },
      ],
    }
  },
  components: {
    calendar,
  },
  data() {
    return {
      countries: sports.find((sport) => {
        return sport.name == sportName
      }).countries,
    }
  },
}
</script>
