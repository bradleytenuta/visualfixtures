// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import card from '~/components/fixtures/list/card'
import { mockCompetition } from '~/test/mocks'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
const vuetify = new Vuetify()
Vue.use(Vuetify)

// Card test suite.
describe('card', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
    propsData: {
      competition: mockCompetition,
    },
    vuetify, // For some reason (I dont know) this is required to pass due to mobile breakpoint issue.
  }

  it('should render the card component', () => {
    expect(shallowMount(card, wrapperData)).toBeTruthy()
  })
})
