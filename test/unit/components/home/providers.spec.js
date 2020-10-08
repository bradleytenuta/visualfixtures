// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Page
import providers from '~/components/home/providers'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// Providers test suite.
describe('providers', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
  }

  it('should render the providers component', () => {
    const wrapper = shallowMount(providers, wrapperData)
    expect(wrapper).toBeTruthy()
  })
})
