// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Page
import modalContribute from '~/components/modals/modal-contribute'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// modalContribute test suite.
describe('modalContribute', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
  }

  it('should render the modalContribute component', () => {
    const wrapper = shallowMount(modalContribute, wrapperData)
    expect(wrapper).toBeTruthy()
  })
})
