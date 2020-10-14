// Components
import mapMarker from '~/components/fixtures/map/map-marker'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { mockCompetition } from '~/test/mocks'

// mapMarker test suite.
describe('mapMarker', () => {
  const localVue = createLocalVue()

  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
    propsData: {
      position: { lat: mockCompetition.latitude, lng: mockCompetition.longitude },
      options: {},
    },
  }

  it('should render the mapMarker component', () => {
    expect(shallowMount(mapMarker, wrapperData)).toBeTruthy()
  })
})
