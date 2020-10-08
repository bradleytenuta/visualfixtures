// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Page
import athletics from '~/pages/snippets/athletics'
import { mockedCountries } from '~/test/mocks'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// Athletics test suite.
describe('snippets/athletics', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
    data() {
      return {
        countries: mockedCountries,
      }
    },
  }

  it('should render the athletics snippet component', () => {
    const wrapper = shallowMount(athletics, wrapperData)

    expect(wrapper).toBeTruthy()
  })
})
