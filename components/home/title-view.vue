<template>
  <!-- TODO: see if we can move images to firebase storage and prevent the use of 'require' -->
  <v-parallax
    height="600"
    src="https://firebasestorage.googleapis.com/v0/b/visualfixtures.appspot.com/o/home-title-background.jpg?alt=media&token=0656486b-1e67-4bda-83b5-9a147306acb5"
  >
    <!-- Logo and Title -->
    <v-container class="logo-title-container">
      <v-img
        id="navbar-logo"
        src="https://firebasestorage.googleapis.com/v0/b/visualfixtures.appspot.com/o/logos%2Fandroid-chrome-maskable-192x192.png?alt=media&token=998ee953-f4ec-4613-b95f-9f5aa023ced8"
        max-height="40"
        max-width="40"
        contain
        class="d-inline-flex"
      ></v-img>
      <p class="my-2 font-weight-bold d-inline-flex">Visual-Fixtures</p>
    </v-container>

    <v-row align="center" justify="center">
      <v-col class="text-center title-main-text-container" cols="12">
        <!-- Title Text -->
        <h1>Explore Hundreds of Fixtures</h1>

        <!-- Intro Text -->
        <p class="py-8">
          Whether you compete with a club or flying solo, Visual Fixtures makes it easy to find competitions wherever you are and anytime of
          year.
        </p>

        <!-- Go Button -->
        <v-btn nuxt tile large to="/athletics?country=GBR" class="primary">
          Athletics Fixtures
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
export default {
  name: 'title-view',
}
</script>

<style scoped>
.logo-title-container p {
  font-size: 25px;
  color: black;
  vertical-align: bottom;
}

.title-main-text-container {
  color: black;
}

.title-main-text-container h1 {
  font-size: 45px;
}

.title-main-text-container p {
  margin: auto;
  max-width: 400px;
}
</style>
