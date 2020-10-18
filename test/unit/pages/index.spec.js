// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Page
import index from '~/pages/index'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// Index test suite.
describe('index', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
      'client-only': { template: '<div><slot /></div>' },
    },
  }

  it('should render the index component', () => {
    const wrapper = shallowMount(index, wrapperData)
    expect(wrapper).toBeTruthy()
  })
})
