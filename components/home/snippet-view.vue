<template>
  <v-container fluid class="snippet-outer-container">
    <v-container>
      <!-- Title -->
      <h1>Add Visual-Fixtures to your website!</h1>

      <!-- Info Message -->
      <p>
        Use the tools below to create your own Visual-Fixture snippet that you can display on your website. Choose the sport and many
        optional customization options for your list. Once your done just copy and paste the line of code below into your website HTML.
        Snippets won't contain any Visual-Fixtures advertisements or branding. All Done!
      </p>

      <!-- Tools -->
      <v-card class="my-8" flat>
        <v-container fluid>
          <v-row align="center">
            <v-col class="d-flex py-0" cols="12" sm="6">
              <v-select
                v-model="selectedSport"
                :items="sports"
                :menu-props="{ maxHeight: '400' }"
                dense
                outlined
                class="snippet-select-box"
                label="Sports"
              ></v-select>
            </v-col>
            <!-- TODO: Update to work with actual arguments. Might need to be many select boxes. -->
            <v-col class="d-flex py-0" cols="12" sm="6">
              <v-select
                v-model="selectedOptions"
                :items="customizationOptions"
                :menu-props="{ maxHeight: '400' }"
                dense
                outlined
                class="snippet-select-box"
                label="Optional Customization Options"
                multiple
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <!-- Copy & Paste Code -->
      <v-text-field
        outlined
        dense
        readonly
        background-color="white"
        append-icon="mdi-content-copy"
        @click:append="copySnippet"
        :value="copyPasteCode"
      >
      </v-text-field>

      <!-- Preview -->
      <h2>Preview your Fixture Snippet</h2>
      <p>This is how you can expect your Visual-Fixtures snippet to look on your website.</p>
      <iframe class="snippet-preview" src="http://localhost:3000/snippets/athletics"></iframe>
    </v-container>

    <!-- Global Snackbar -->
    <v-snackbar v-model="snackbar" timeout="2000">
      Copied to clipboard.
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { sports } from '~/services/allSports'

export default {
  name: 'snippet-view',
  data() {
    return {
      sports,
      selectedSport: sports[0],
      customizationOptions: ['name', 'face', 'hair', 'clothes'],
      selectedOptions: [],
      snackbar: false,
    }
  },
  computed: {
    /**
     * Formats the customized information provided by the user into
     * an iframe element the user can then copy and paste onto their website.
     */
    copyPasteCode() {
      // Gets the url and places it within the iframe string.
      return `<iframe src="${this.copyPasteCodeUrl}"></iframe>`
    },
    /**
     * Creates the customized URL based on the options the user has
     * selected.
     */
    copyPasteCodeUrl() {
      var url = 'https://www.visual-fixtures.com/snippets'

      // Gets the desired sport.
      url = url + '/' + this.selectedSport.toLowerCase()

      // Adds any additonal arguments.
      if (this.selectedOptions.length > 0) {
        url += '?' // Adds query text value.
        this.selectedOptions.forEach((option, index) => {
          url += option + '=' + option
          if (index !== this.selectedOptions.length - 1) {
            url += '&'
          }
        })
      }

      return url
    },
  },
  methods: {
    /**
     * Copies the Snippet code to the clipboard.
     */
    copySnippet() {
      navigator.clipboard.writeText(this.copyPasteCode)
      this.snackbar = true
    },
  },
}
</script>

<style scoped>
.snippet-outer-container {
  background-color: green;
  color: white;
  text-align: center;
}

.snippet-preview {
  width: 100%;
  height: 640px;
  max-width: 360px;
  max-height: 640px;
  border: none;
}

/* Overwriting Vuetify select box height. */
.snippet-select-box {
  height: 45px;
}
</style>
