<template>
  <div @click="dialog = true">
    <!-- This is replaced by a button or list item used to open the modal. -->
    <slot></slot>

    <!-- The Modal itself -->
    <!-- TODO: Place v-dialog inside a teleport tag once moved to Vue3. Otherwise can't view modal in navbar -->
    <v-dialog v-model="dialog" scrollable max-width="500px">
      <!-- Modal Card -->
      <v-card>
        <!-- Help Develop Section -->
        <v-card-title class="headline">Help Develop?</v-card-title>
        <v-card-text>
          Do you have some knowledge in writing code in Vue.js? Visual-Fixtures is an open source project on
          <a href="https://github.com/bradleytenuta/visualfixtures">github</a>. If you want to help improve this website then head over to
          github and view the <a href="https://github.com/bradleytenuta/visualfixtures/wiki">wiki</a> to help get you started.
        </v-card-text>

        <!-- Request Feature -->
        <v-card-title class="headline">Feature requests?</v-card-title>
        <v-card-text>
          Is Visual-Fixtures missing a useful feature? If so, head over to our
          <a href="https://github.com/bradleytenuta/visualfixtures/issues">issues section</a> on github and create a new issue. When
          creating this issue, include the tag 'Feature Request'. This lets me know the difference between genunie issues and feature
          requests.
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'modal-contribute',
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
