<template>
  <calendar :countries="countries" sport="athletics" />
</template>

<script>
import calendar from '~/components/fixtures/calendar.vue'
import { sports } from '~/services/jsonLinks'

export default {
  name: 'athletics',
  layout: 'fixtures',
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
