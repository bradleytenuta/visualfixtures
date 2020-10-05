// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import navbar from '~/components/fixtures/navbar'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// Navbar test suite.
describe('navbar', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
  }

  it('should render the navbar component', () => {
    expect(shallowMount(navbar, wrapperData).vm).toBeTruthy()
  })

  it('should find and display the Logo', () => {
    const wrapper = shallowMount(navbar, wrapperData)
    expect(wrapper.find('#navbar-logo').isVisible()).toBeTruthy()
  })
})
