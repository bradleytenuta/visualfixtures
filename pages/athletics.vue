<template>
  <calendar :countries="countries" :sport="$options.sportName" />
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
      title: sportName.charAt(0).toUpperCase() + sportName.slice(1),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `View ${sportName} fixtures near you.`,
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
