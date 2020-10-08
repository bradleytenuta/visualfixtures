// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

// Components
import navbar from '~/components/fixtures/navbar'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// Navbar test suite.
describe('navbar', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(VueRouter)

  const router = new VueRouter()

  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
    router,
  }

  it('should render the navbar component', () => {
    expect(shallowMount(navbar, wrapperData).vm).toBeTruthy()
  })

  it('should find and display the Logo', () => {
    const wrapper = shallowMount(navbar, wrapperData)
    expect(wrapper.find('#navbar-logo').isVisible()).toBeTruthy() // checks the logo is visible.
  })
})
