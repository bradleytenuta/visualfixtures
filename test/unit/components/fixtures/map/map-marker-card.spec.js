// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import mapMarkerCard from '~/components/fixtures/map/map-marker-card'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { mockCompetition } from '~/test/mocks'
const vuetify = new Vuetify()
Vue.use(Vuetify)

// mapMarkerCard test suite.
describe('mapMarkerCard', () => {
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

  it('should render the mapMarkerCard component', () => {
    expect(shallowMount(mapMarkerCard, wrapperData)).toBeTruthy()
  })
})
