<template>
  <calendar :countries="countries" />
</template>

<script>
import calendar from '~/components/fixtures/calendar.vue'
export default {
  name: 'athletics',
  layout: 'fixtures',
  components: {
    calendar,
  },
  data() {
    return {
      countries: [
        {
          countryCode: 'GBR',
          urls: [
            'https://file.opentrack.run/live/euroath/domestic_calendar_gbr_2020.json',
            'https://file.opentrack.run/live/euroath/domestic_calendar_gbr_2021.json',
          ],
        },
      ],
    }
  },
}
</script>
