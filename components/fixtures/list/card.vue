<template>
  <v-card class="compcard my-5" :flat="true">
    <!-- Header Text -->
    <v-list-item>
      <!-- Calendar Style Date -->
      <v-list-item-avatar class="comp-date-container" color="grey lighten-3">
        <div>
          <span class="comp-date-day">
            {{ moment(competition.date).format('DD') }}
          </span>
          <br />
          <span class="comp-date-month">
            {{ moment(competition.date).format('MMM') }}
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

    <!-- Competition Extra Information -->
    <v-chip-group column class="px-6">
      <!-- If It is currently on now -->
      <chip v-if="isOnNow(competition)" color="green darken-1" text="On Now" tooltip="Competition is on now"></chip>

      <!-- If Has Expired -->
      <chip v-if="hasExpired(competition)" color="red darken-1" text="Expired" tooltip="Competition is over"></chip>

      <!-- No. of participants -->
      <chip
        v-if="competition.num_competitors > 0"
        color="green darken-1"
        :text="competition.num_competitors.toString()"
        tooltip="Competition is over"
        icon="mdi-account-group"
      ></chip>
    </v-chip-group>

    <!-- Competition Info - No Action -->
    <v-card-text class="py-0">
      <div class="comp-info-card-text pb-2">
        <!-- Finish Date if on different to start date -->
        <text
          v-if="!isFinishDateSame(competition)"
          icon="mdi-information-outline"
          tooltip="Start date is different to finish date!"
          :text="moment(competition.finish_date).format('DD/MM/YY')"
          :divider="true"
        ></text>

        <!-- Competition Type -->
        <text
          v-if="competition.type"
          tooltip="Competition type"
          :text="competition.type.charAt(0) + competition.type.toLowerCase().slice(1)"
          :divider="true"
        ></text>

        <!-- Competition Age Group -->
        <text v-if="competition.age_groups" tooltip="Competition age groups" :text="competition.age_groups" :divider="false"></text>
      </div>
    </v-card-text>

    <!-- Compeition Information Divider - Action -->
    <v-divider class="comp-hor-divider"></v-divider>

    <!-- Address -->
    <v-card-text class="py-0">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="grey" text block v-bind="attrs" v-on="on" @click="copyToClipboard(competition.address)" class="comp-button-address">
            <v-icon left>mdi-map-marker</v-icon>
            <template v-if="competition.address">
              <span class="comp-button-address-text">{{ competition.address }}</span>
            </template>
            <template v-else>
              <span class="comp-button-address-text">Not Provided</span>
            </template>
          </v-btn>
        </template>
        <span>Copy Address</span>
      </v-tooltip>
    </v-card-text>

    <!-- Action Buttons -->
    <v-card-actions class="pt-0">
      <!-- View Button -->
      <template>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <!-- Button with Link -->
              <v-btn v-if="competition.entry_link" color="green" :href="competition.entry_link" text>Visit Site</v-btn>
              <!-- Disabled button - no link -->
              <v-btn v-else :disabled="!competition.entry_link" color="green" href="#" text> Visit Site </v-btn>
            </div>
          </template>
          <span v-if="competition.entry_link">View competition and entry information (External Site)</span>
          <span v-else>No external site available</span>
        </v-tooltip>
      </template>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Contact Button -->
      <v-tooltip bottom v-if="competition.contact_details">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="copyToClipboard(competition.contact_details)">
            <v-icon>mdi-contacts</v-icon>
          </v-btn>
        </template>
        <span>{{ competition.contact_details }}</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import chip from '~/components/fixtures/list/chip.vue'
import cardText from '~/components/fixtures/list/card-text.vue'
import moment from 'moment'

export default {
  name: 'card',
  components: {
    chip,
    'card-text': cardText,
  },
  props: {
    competition: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      moment: moment,
    }
  },
  methods: {
    /**
     * This function checks if a given competition has already occured and is in the past.
     */
    hasExpired(competition) {
      // compares to the nearest day.
      return moment(competition.finish_date).isBefore(moment(), 'day')
    },
    /**
     * This function checks if a given competiton will become past by the end of today.
     */
    expiresToday(competition) {
      // compares to the nearest day.
      return moment(competition.finish_date).isSame(moment(), 'day')
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
     * This function checks if a given competition has a different finish date to its
     * start date.
     */
    isFinishDateSame(competition) {
      return moment(competition.date).isSame(moment(competition.finish_date), 'day')
    },
    /**
     * Copies the given string of information to the clipboard.
     * Then displays a snackbar to tell the user something has happened.
     */
    copyToClipboard(info_string) {
      navigator.clipboard
        .writeText(info_string)
        .then(() => {
          // Makes the snackbar visible.
          this.snackbar = true
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>

<style scoped>
.compcard {
  width: 100%;
  margin: 10px;
  height: fit-content;
  overflow: hidden;
}

.compcard .v-icon {
  line-height: 0 !important;
}

.compcard .v-btn:not(.v-btn--round).v-size--default {
  padding: 0 8px;
}

.compcard .v-btn__content {
  width: 100%;
}

.compcard .v-chip-group .v-chip {
  cursor: default;
}

.comp-date-container > div {
  margin: 0px;
  line-height: 0.75;
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
  overflow-x: auto;
  overflow-y: hidden;
  /* Firefox scrollbar styling - webkit scrollbar works for all other browsers */
  scrollbar-width: thin;
  scrollbar-color: #cdcdcd transparent;
}
/* Compeititon Info Card Text Scroll Bar */
/* width */
.comp-info-card-text::-webkit-scrollbar {
  height: 5px;
  background-color: transparent;
}

/* Track */
.comp-info-card-text::-webkit-scrollbar-track {
  background-color: transparent;
}

/* Handle */
.comp-info-card-text::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(230, 230, 230, 0.9);
}

/* Handle on hover */
.comp-info-card-text::-webkit-scrollbar-thumb:hover {
  background: lightgray;
}
/* End of Compeititon Info Card Text Scroll Bar */

.comp-hor-divider {
  margin: 8px 16px;
}

@media only screen and (min-width: 550px) {
  .compcard {
    max-width: 344px;
    min-width: 344px;
  }
}
</style>