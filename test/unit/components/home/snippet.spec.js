// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Page
import snippet from '~/components/home/snippet'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// Snippet test suite.
describe('snippet', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
  }

  it('should render the snippet component', () => {
    const wrapper = shallowMount(snippet, wrapperData)
    expect(wrapper).toBeTruthy()
  })
})
