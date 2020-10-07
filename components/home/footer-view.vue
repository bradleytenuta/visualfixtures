<template>
  <v-footer color="primary" padless>
    <v-row justify="center" no-gutters>
      <!-- Footer Buttons -->
      <v-btn color="white" text rounded class="my-2"> Help </v-btn>
      <v-btn color="white" text rounded class="my-2"> Contribute </v-btn>

      <!-- Footer Credits -->
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Visual-Fixtures</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'footer-view',
}
</script>
