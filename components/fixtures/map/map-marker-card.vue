<template>
  <v-card class="compcard map-marker-card-container">
    <!-- Card Info -->
    <card-info :competition="competition"></card-info>

    <!-- Competition Extra Information -->
    <v-chip-group column class="px-6">
      <!-- If It is currently on now -->
      <card-chip v-if="isOnNow(competition)" color="primary" text="On Now" tooltip="Competition is on now"></card-chip>

      <!-- If Has Expired -->
      <card-chip v-if="hasExpired(competition)" color="red darken-1" text="Expired" tooltip="Competition is over"></card-chip>

      <!-- No. of participants -->
      <card-chip
        v-if="competition.num_competitors > 0"
        color="primary"
        :text="competition.num_competitors.toString()"
        tooltip="No. of participants"
        icon="mdi-account-group"
      ></card-chip>
    </v-chip-group>

    <!-- Competition Info - No Action -->
    <v-card-text class="py-0" v-if="!isFinishDateSame(competition) || competition.type || competition.age_groups">
      <div class="comp-info-card-text pb-2">
        <!-- Finish Date if on different to start date -->
        <card-text
          v-if="!isFinishDateSame(competition)"
          icon="mdi-information-outline"
          tooltip="Start date is different to finish date!"
          :text="formatDate(competition.finish_date, 'DD/MM/YY')"
          :divider="true"
        ></card-text>

        <!-- Competition Type -->
        <card-text
          v-if="competition.type"
          tooltip="Competition type"
          :text="competition.type.charAt(0) + competition.type.toLowerCase().slice(1)"
          :divider="true"
        ></card-text>

        <!-- Competition Age Group -->
        <card-text
          v-if="competition.age_groups"
          tooltip="Competition age groups"
          :text="competition.age_groups"
          :divider="false"
        ></card-text>
      </div>
    </v-card-text>

    <!-- Action Buttons -->
    <v-card-actions class="pt-0">
      <!-- Card Action Button -->
      <card-action-button :competition="competition"></card-action-button>
    </v-card-actions>
  </v-card>
</template>

<script>
import cardChip from '~/components/fixtures/list/card-chip.vue'
import cardText from '~/components/fixtures/list/card-text.vue'
import cardInfo from '~/components/fixtures/list/card-info.vue'
import cardActionButton from '~/components/fixtures/list/card-action-button.vue'
import moment from 'moment'

export default {
  name: 'map-marker-card',
  components: {
    'card-chip': cardChip,
    'card-text': cardText,
    'card-info': cardInfo,
    'card-action-button': cardActionButton,
  },
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
    /**
     * This function checks if a given competition has already occured and is in the past.
     */
    hasExpired(competition) {
      // compares to the nearest day.
      return moment(competition.finish_date).isBefore(moment(), 'day')
    },
    /**
     * This function checks if a given competition is currently on now.
     */
    isOnNow(competition) {
      // Expires today or in the future, and it has started in the past.
      return (
        (this.expiresToday(competition) || moment(competition.finish_date).isAfter(moment(), 'day')) &&
        moment(competition.date).isBefore(moment(), 'day')
      )
    },
    /**
     * This function checks if a given competiton will become past by the end of today.
     */
    expiresToday(competition) {
      // compares to the nearest day.
      return moment(competition.finish_date).isSame(moment(), 'day')
    },
    /**
     * This function checks if a given competition has a different finish date to its
     * start date.
     */
    isFinishDateSame(competition) {
      return moment(competition.date).isSame(moment(competition.finish_date), 'day')
    },
  },
}
</script>

<style lang="scss" scoped>
.map-marker-card-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: auto !important;
  margin: 10px !important;
  margin-bottom: 50px !important;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px !important;
  border-radius: 2px;
  z-index: 1000;
}

.compcard {
  width: 100%;
  margin: 10px;
  height: fit-content;
  overflow: hidden;
  cursor: default;

  .v-icon {
    line-height: 0 !important;
  }

  .v-chip-group .v-chip {
    cursor: default;
  }
}

@media only screen and (min-width: 550px) {
  .compcard {
    max-width: 344px;
    min-width: 344px;
  }
}

.compcard-active {
  background-color: #e8f0e8;
}

.v-card--link:focus:before {
  opacity: 0 !important;
}

.comp-button-address {
  justify-content: start;
  max-width: 100%;
  text-transform: initial;
  font-size: 14px;
  width: 100%;
  letter-spacing: initial;
  text-align: left;
}

.comp-button-address-text {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.comp-info-card-text {
  display: flex;
  height: 30px;
  overflow-x: auto;
  overflow-y: hidden;
  /* Firefox scrollbar styling - webkit scrollbar works for all other browsers */
  scrollbar-width: thin;
  scrollbar-color: #cdcdcd transparent;

  /* width */
  &::-webkit-scrollbar {
    height: 5px;
    background-color: transparent;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(230, 230, 230, 0.9);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: lightgray;
  }
}

.comp-hor-divider {
  margin: 8px 16px;
}
</style>
