<template>
  <div @click="dialog = true">
    <!-- This is replaced by a button or list item used to open the modal. -->
    <slot></slot>

    <!-- The Modal itself -->
    <!-- TODO: Place v-dialog inside a teleport tag once moved to Vue3. Otherwise can't view modal in navbar -->
    <v-dialog v-model="dialog" scrollable max-width="500px">
      <!-- Modal Card -->
      <v-card>
        <!-- Question -->
        <v-card-title class="headline">Have a queston?</v-card-title>
        <v-card-text>
          Head over to our <a target="_blank" href="https://github.com/bradleytenuta/visualfixtures/issues">issues section</a> on github and
          create a new issue. Make sure to add the tag 'Question'. This lets me know the difference between genunie issues and questions.
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { modalHelpEventName } from '~/services/analyticsEvents.js'

export default {
  name: 'modal-help',
  data() {
    return {
      dialog: false,
    }
  },
  watch: {
    dialog() {
      if (this.dialog == true) {
        // Firebase Analytics Logs the click of help modal.
        this.$fireAnalytics.logEvent(modalHelpEventName)
      }
    },
  },
}
</script>
