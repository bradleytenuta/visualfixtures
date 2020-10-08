// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Page
import footerView from '~/components/home/footer-view'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// footerView test suite.
describe('footerView', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
  }

  it('should render the footerView component', () => {
    const wrapper = shallowMount(footerView, wrapperData)
    expect(wrapper).toBeTruthy()
  })
})
