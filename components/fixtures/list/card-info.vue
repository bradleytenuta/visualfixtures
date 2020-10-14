<template>
  <!-- Header Text -->
  <v-list-item>
    <!-- Calendar Style Date -->
    <v-list-item-avatar class="comp-date-container" color="grey lighten-3">
      <div>
        <span class="comp-date-day">
          {{ formatDate(competition.date, 'DD') }}
        </span>
        <br />
        <span class="comp-date-month">
          {{ formatDate(competition.date, 'MMM') }}
        </span>
      </div>
    </v-list-item-avatar>

    <!-- Competition Title Info -->
    <v-list-item-content class="comp-title-container">
      <v-list-item-subtitle class="comp-title">
        {{ competition.full_name }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import moment from 'moment'

export default {
  name: 'card-info',
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

<style lang="scss" scoped>
.comp-date-container {
  > div {
    margin: 0px;
    line-height: 0.75;
  }
}

.comp-date-day {
  font-size: 25px;
}

.comp-date-month {
  text-transform: uppercase;
  font-size: 12px;
}

.comp-title-container {
  width: 100%;
  height: 32px;
  margin-bottom: 11px;
  margin-top: 13px;
  padding: 0px;
}

.comp-title {
  height: 100%;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-weight: bolder;
}
</style>
