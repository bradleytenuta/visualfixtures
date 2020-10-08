<template>
  <v-footer color="primary" padless>
    <v-row justify="center" no-gutters>
      <!-- Footer Buttons -->
      <modal-help>
        <v-btn color="white" text rounded class="my-2">Help</v-btn>
      </modal-help>

      <modal-contribute>
        <v-btn color="white" text rounded class="my-2">Contribute</v-btn>
      </modal-contribute>

      <!-- Footer Credits -->
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Visual-Fixtures</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import modalHelp from '~/components/modals/modal-help'
import modalContribute from '~/components/modals/modal-contribute'

export default {
  name: 'footer-view',
  components: {
    'modal-help': modalHelp,
    'modal-contribute': modalContribute,
  },
}
</script>
