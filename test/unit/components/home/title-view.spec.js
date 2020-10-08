// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Page
import titleView from '~/components/home/title-view'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// titleView test suite.
describe('titleView', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
  }

  it('should render the titleView component', () => {
    const wrapper = shallowMount(titleView, wrapperData)
    expect(wrapper).toBeTruthy()
  })
})
