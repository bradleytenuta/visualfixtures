<template>
  <v-container class="providers-outer-container text-center mb-16 py-16">
    <!-- Providers Text -->
    <v-row align="center">
      <v-col cols="12" sm="6">
        <h1>The data providers who bring this project alive</h1>
      </v-col>

      <!-- Companies / Orgnaisations Logos -->
      <v-col cols="12" sm="6">
        <v-container>
          <v-row justify="center">
            <!-- One Column for each logo -->
            <v-col cols="auto">
              <a target="_blank" href="https://opentrack.run/" title="Opentrack">
                <v-img
                  max-height="300"
                  max-width="300"
                  src="https://firebasestorage.googleapis.com/v0/b/visualfixtures.appspot.com/o/providers%2Fopentrack.png?alt=media&token=bde62176-1630-46d2-889e-ebeecf4be52c"
                ></v-img>
              </a>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'providers',
}
</script>

<style lang="scss" scoped>
/* Overwriting Vuetify Grid. */
@media (min-width: 1264px) {
  .providers-outer-container {
    max-width: 1185px !important;
  }
}
</style>
