// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Page
import modalHelp from '~/components/modals/modal-help'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// modalHelp test suite.
describe('modalHelp', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
  }

  it('should render the modalHelp component', () => {
    const wrapper = shallowMount(modalHelp, wrapperData)
    expect(wrapper).toBeTruthy()
  })
})
