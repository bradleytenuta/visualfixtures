// Components
import mapContainer from '~/components/fixtures/map/map-container'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'

// mapContainer test suite.
describe('mapContainer', () => {
  const localVue = createLocalVue()

  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
  }

  it('should render the mapContainer component', () => {
    expect(shallowMount(mapContainer, wrapperData)).toBeTruthy()
  })
})
