// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

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
  localVue.use(Vuex)
  localVue.use(VueRouter)

  const router = new VueRouter()

  // Creates a Mock Vuex Store.
  const mockActions = {
    changeIsSnippet: jest.fn(),
    resetVuex: jest.fn(),
  }
  const store = new Vuex.Store({
    state: { selectedCountry: null, isSnippet: false },
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
      competition: mockCompetition,
      snackbar: false,
      screenSize: 0,
    },
    router,
    vuetify, // For some reason (I dont know) this is required to pass due to mobile breakpoint issue.
  }

  it('should render the card component', () => {
    expect(shallowMount(card, wrapperData)).toBeTruthy()
  })
})
