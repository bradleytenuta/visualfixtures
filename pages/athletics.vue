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
      /**
       * A list of countries and URLS which lead to the competitions for that given country.
       * The layout of a country object must be within this format.
       */
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
