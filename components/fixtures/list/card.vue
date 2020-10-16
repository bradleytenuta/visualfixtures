<template>
  <v-card
    class="compcard my-5"
    :flat="true"
    @click="!isSnippet ? activateComp() : null"
    :ripple="false"
    :class="{ 'compcard-active': isActive }"
  >
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
    <v-card-text class="py-0">
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
      <!-- Card Action Button -->
      <card-action-button :competition="competition"></card-action-button>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Contact Button -->
      <v-tooltip bottom v-if="competition.contact_details">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="
              copyToClipboard(competition.contact_details)
              recordAnalytics($options.cardContactEventName)
            "
          >
            <v-icon>mdi-contacts</v-icon>
          </v-btn>
        </template>
        <span>{{ competition.contact_details }}</span>
      </v-tooltip>

      <!-- Location Button -->
      <v-tooltip bottom v-if="!isSnippet && competition.latitude && competition.longitude">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="
              locationClick()
              recordAnalytics($options.cardLocationEventName)
            "
          >
            <v-icon>mdi-map-marker</v-icon>
          </v-btn>
        </template>
        <span>View Location</span>
      </v-tooltip>

      <!-- Share Button -->
      <v-tooltip bottom v-if="!isSnippet">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="
              copyToClipboard(getShareUrl(competition))
              recordAnalytics($options.cardShareEventName)
            "
          >
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </template>
        <span>Share</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import cardChip from '~/components/fixtures/list/card-chip.vue'
import cardText from '~/components/fixtures/list/card-text.vue'
import cardInfo from '~/components/fixtures/list/card-info.vue'
import cardActionButton from '~/components/fixtures/list/card-action-button.vue'
import { cardShareEventName, cardContactEventName, cardLocationEventName } from '~/services/analyticsEvents.js'
import moment from 'moment'

export default {
  name: 'card',
  components: {
    'card-chip': cardChip,
    'card-text': cardText,
    'card-info': cardInfo,
    'card-action-button': cardActionButton,
  },
  cardShareEventName,
  cardContactEventName,
  cardLocationEventName,
  props: {
    competition: {
      type: Object,
      required: true,
    },
    snackbar: {
      type: Boolean,
      required: true,
    },
    screenSize: {
      type: Number,
      required: true,
    },
  },
  computed: {
    selectedCountry() {
      return this.$store.state.selectedCountry
    },
    isSnippet: {
      get() {
        return this.$store.state.isSnippet
      },
      set(newValue) {
        this.$store.dispatch('changeIsSnippet', newValue)
      },
    },
    activeComp: {
      get() {
        return this.$store.state.activeComp
      },
      set(newValue) {
        this.$store.dispatch('changeActiveComp', newValue)
      },
    },
    listDropdownState: {
      get() {
        return this.$store.state.listDropdownState
      },
      set(newValue) {
        this.$store.dispatch('changeListDropdownState', newValue)
      },
    },
  },
  data() {
    return {
      isActive: false,
    }
  },
  watch: {
    /**
     * Watches for changes within activeComp, a computed property in Vuex.
     * If the property changes value, we need to check to see if the new
     * active competition is this one or not.
     */
    activeComp() {
      if (this.isSnippet) return

      if (this.competition == this.activeComp) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
  },
  /**
   * When the card component is mounted it checks to see if the currently
   * active competition is this one, if it is, then it sets this card as active.
   */
  mounted() {
    if (this.isSnippet) return

    if (this.competition == this.activeComp) {
      this.isActive = true
    } else {
      this.isActive = false
    }
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
     * Copies the provided string to clipboard.
     */
    copyToClipboard(stringToCopy) {
      navigator.clipboard.writeText(stringToCopy)
      this.$emit('updateSnackbar')
    },
    /**
     * This function creates the url that allows a user to share a competition with another user.
     * It returns a string.
     */
    getShareUrl(competition) {
      return window.location.origin + this.$route.path + '?country=' + this.selectedCountry.countryCode + '&id=' + competition.id
    },
    /**
     * When a compcard is clicked, It updates the currently active competition.
     */
    activateComp() {
      if (this.isSnippet) return
      if (this.competition == this.activeComp) return

      // Updates the current active comp with this competition.
      this.activeComp = this.competition
      this.isActive = true
    },
    /**
     * This function is called whenever the location button is clicked.
     */
    locationClick() {
      this.activateComp() // activates this compoetition.
      if (this.listDropdownState) {
        if (this.screenSize < 960) {
          this.listDropdownState = false // Closes the list dropdown if its open.
        }
      }
    },
    /**
     * This function records a given button click within a card.
     */
    recordAnalytics(eventName) {
      // Firebase Analytics Logs the selected country.
      this.$fireAnalytics.logEvent(eventName, {
        competition_id: this.competition.id,
        country_code: this.selectedCountry.countryCode,
        sport_name: this.sport,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
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
