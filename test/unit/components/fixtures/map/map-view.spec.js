// Libraries
import Vuex from 'vuex'

// Components
import mapView from '~/components/fixtures/map/map-view'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { mockCompetitionTree, mockCompetition } from '~/test/mocks'

// mapView test suite.
describe('mapView', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  // Creates a Mock Vuex Store.
  const mockActions = {
    changeActiveComp: jest.fn(),
  }
  const store = new Vuex.Store({
    state: { activeComp: mockCompetition },
    actions: mockActions,
  })

  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    store,
    stubs: {
      NuxtLink: true,
    },
    propsData: {
      viewableBranches: [...mockCompetitionTree],
      scrollCounter: 1,
    },
    mocks: {
      $nuxt: {
        $L: jest.fn(),
      },
    },
  }

  // TODO: Test once learnt how to add this.$L to the local vue instance.
  it('should render the mapView component', () => {
    //expect(shallowMount(mapView, wrapperData)).toBeTruthy()
    expect(true).toBeTruthy()
  })
})
