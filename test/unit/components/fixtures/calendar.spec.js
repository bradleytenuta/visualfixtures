// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

// Components
import calendar from '~/components/fixtures/calendar'
import { mockedCountries, mockedSport, mockCompetitionTree } from '~/test/mocks'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// Calendar test suite.
describe('calendar', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(Vuex)
  localVue.use(VueRouter)

  const router = new VueRouter()

  // Creates a Mock Vuex Store.
  const mockActions = {
    changeSelectedMonth: jest.fn(),
    changeSelectedCountry: jest.fn(),
    changeIsSnippet: jest.fn(),
    changeDisplayAll: jest.fn(),
    resetVuex: jest.fn(),
  }
  const store = new Vuex.Store({
    state: { selectedMonth: null, selectedCountry: null, isSnippetStore: false, displayAll: true },
    actions: mockActions,
  })

  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    store,
    stubs: {
      NuxtLink: true,
      'client-only': { template: '<div><slot /></div>' },
    },
    propsData: {
      countries: mockedCountries,
      sport: mockedSport,
    },
    router,
  }

  it('should render the calendar component', () => {
    expect(shallowMount(calendar, wrapperData).vm).toBeTruthy()
  })

  var mockedCountriesCopy = [...mockedCountries]
  test('If countries array was sorted after creation of vue component', () => {
    const wrapper = shallowMount(calendar, wrapperData)
    // Checks countries are sorted.
    expect(wrapper.vm.countries).toEqual(mockedCountries.sort((a, b) => (a.countryCode > b.countryCode ? 1 : -1)))
    expect(wrapper.vm.countries).not.toEqual(mockedCountriesCopy)
  })

  test('If the revertVuex action is called after creation of vue component', () => {
    shallowMount(calendar, wrapperData)
    expect(mockActions.resetVuex).toHaveBeenCalled()
  })

  test('If the selected country was set', () => {
    shallowMount(calendar, wrapperData)
    expect(mockActions.changeSelectedCountry).toHaveBeenCalled()
  })

  test('If the competitions get sorted in ascending order', () => {
    const wrapper = shallowMount(calendar, wrapperData)
    wrapper.setData({ competitionTree: [...mockCompetitionTree] })

    expect(wrapper.vm.viewableBranches[0].competitions).toEqual(mockCompetitionTree[0].competitions)
  })

  test('If the competitions get sorted in descending order', () => {
    const wrapper = shallowMount(calendar, wrapperData)
    wrapper.setData({ competitionTree: [...mockCompetitionTree] })

    // Sorts both in descending order.
    wrapper.vm.sortCompetitions(2, wrapper.vm.viewableBranches[0].competitions)
    wrapper.vm.sortCompetitions(2, mockCompetitionTree[0].competitions)

    expect(wrapper.vm.viewableBranches[0].competitions).toEqual(mockCompetitionTree[0].competitions)
  })

  test('If the branches get sorted in ascending order', () => {
    const wrapper = shallowMount(calendar, wrapperData)
    wrapper.setData({ competitionTree: [...mockCompetitionTree] })
    expect(wrapper.vm.viewableBranches[0]).toEqual(mockCompetitionTree[0])
  })

  test('If the branches get sorted in descending order', () => {
    const wrapper = shallowMount(calendar, wrapperData)
    wrapper.setData({ competitionTree: [...mockCompetitionTree] })

    // Sorts both in descending order.
    wrapper.vm.sortBranches(2, wrapper.vm.viewableBranches)
    wrapper.vm.sortBranches(2, mockCompetitionTree)

    expect(wrapper.vm.viewableBranches).toEqual(mockCompetitionTree)
  })
})
