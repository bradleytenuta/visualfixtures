<!-- 
This component should only be rendered on the clinet side. 
In order to do this, wrap this component within '<client-only>' tags.
-->
<template>
  <v-container fluid class="text-center px-0 py-16">
    <v-container class="snippet-tool-outer-container">
      <!-- Title -->
      <h1>Add Visual-Fixtures to your website!</h1>

      <!-- Info Message -->
      <p>
        Use the tools below to create your own Visual-Fixture snippet that you can display on your website. Choose the sport and many
        optional customization options for your list. Once your done just copy and paste the line of code below into your website HTML.
        Snippets won't contain any Visual-Fixtures advertisements or branding. All done!
      </p>

      <!-- Snippet -->
      <v-container fluid class="mt-8">
        <v-row align="center">
          <!-- Select Sport -->
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="selectedSport"
              :items="sports"
              item-text="name"
              :menu-props="{ maxHeight: '400' }"
              outlined
              class="snippet-select-box"
              label="Sports"
              hide-selected
            ></v-select>
          </v-col>
          <!-- Default Country. -->
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              return-object
              v-model="selectedCountry"
              :items="countries"
              item-text="countryCode"
              :menu-props="{ maxHeight: '400' }"
              outlined
              class="snippet-select-box"
              label="Default Country"
            >
              <!-- HTML that describe how select should render selected items -->
              <template v-slot:selection="data">
                <country-flag :country="data.item.countryCode.toLowerCase()" size="normal" />
                {{ data.item.countryCode }}
              </template>
              <!-- HTML that describe how select should render items when the select is open -->
              <template v-slot:item="data">
                <country-flag :country="data.item.countryCode.toLowerCase()" size="normal" />
                {{ data.item.countryCode }}
              </template>
            </v-select>
          </v-col>

          <!-- Copy & Paste Code -->
          <v-col class="d-flex py-6" cols="12">
            <v-text-field
              outlined
              dense
              readonly
              background-color="white"
              append-icon="mdi-content-copy"
              label="Snippet (Copy & Paste Me)"
              @click:append="copySnippet"
              :value="copyPasteCode"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- Preview -->
    <v-container fluid class="snippet-preview-container py-16">
      <h2>Snippet preview</h2>
      <p class="pb-8">This is how you can expect your Visual-Fixtures snippet to look on your website.</p>
      <v-card class="snippet-preview d-inline-flex">
        <iframe width="360" height="640" :src="copyPasteCodeUrl"></iframe>
      </v-card>
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
import { sports } from '~/services/jsonLinks'
import CountryFlag from 'vue-country-flag'

export default {
  name: 'snippet-view',
  components: {
    CountryFlag,
  },
  data() {
    return {
      sports,
      selectedSport: sports[0],
      selectedCountry: null,
      snackbar: false,
    }
  },
  computed: {
    /**
     * The computed property of countries. The array of countries depends
     * on which sport has currently been selected.
     */
    countries() {
      return this.selectedSport.countries
    },
    /**
     * Formats the customized information provided by the user into
     * an iframe element the user can then copy and paste onto their website.
     */
    copyPasteCode() {
      // Gets the url and places it within the iframe string.
      return `<iframe width="360" height="640" src="${this.copyPasteCodeUrl}"></iframe>`
    },
    /**
     * Creates the customized URL based on the options the user has
     * selected.
     */
    copyPasteCodeUrl() {
      var url = 'https://www.visual-fixtures.com/snippets'
      url = window.location.origin + '/snippets'

      // Gets the desired sport.
      url = url + '/' + this.selectedSport.name.toLowerCase()
      url += '?' // Adds query text value.

      // Adds selected country argument.
      if (this.selectedCountry) {
        url += 'country' + '=' + this.selectedCountry.countryCode
      }

      return url
    },
  },
  /**
   * This runs once the vue instance has been mounted to the DOM.
   * Updates the selected country to the first country in the list of countries.
   * This is mounted as in order for a list of countries to exist, a sport has to
   * be selected.
   */
  mounted() {
    this.selectedCountry = this.countries[0]
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

<style lang="scss" scoped>
.snippet-preview-container {
  background-color: #f5f5f5;
}

.snippet-preview {
  width: 100%;
  height: 640px;
  max-width: 360px;
  max-height: 640px;

  > iframe {
    border: none;
  }
}

/* Overwriting Vuetify select box height. */
.snippet-select-box {
  height: 45px;
}
/* Overwriting Vuetify Grid. */
@media (min-width: 1264px) {
  .snippet-tool-outer-container {
    max-width: 1185px !important;
  }
}

/* Overwriting vue-country-flag css */
.flag {
  margin-left: -15px;
  margin-right: -10px;
}
</style>
