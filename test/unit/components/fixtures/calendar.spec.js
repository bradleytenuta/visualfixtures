// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import calendar from '~/components/fixtures/calendar'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// Calendar test suite.
describe('calendar', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(Vuex)

  // Creates a Mock Vuex Store.
  const mockActions = {
    changeSelectedMonth: jest.fn(),
    changeSelectedCountry: jest.fn(),
    resetVuex: jest.fn(),
  }
  const store = new Vuex.Store({
    state: { selectedMonth: null, selectedCountry: null },
    actions: mockActions,
  })

  // Creates mocked array of countries
  var mockedCountries = [
    {
      countryCode: 'IMN',
      urls: ['www.someurl.com'],
    },
    {
      countryCode: 'ALB',
      urls: ['www.someurl.com'],
    },
    {
      countryCode: 'GBR',
      urls: ['www.someurl.com'],
    },
  ]

  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    store,
    stubs: {
      NuxtLink: true,
    },
    propsData: {
      countries: mockedCountries,
      sport: 'someSport',
    },
  }

  it('should render the calendar component', () => {
    expect(shallowMount(calendar, wrapperData).vm).toBeTruthy()
  })

  var mockedCountriesCopy = [...mockedCountries]
  test('If countries array was sorted after creation of vue component', () => {
    const wrapper = shallowMount(calendar, wrapperData)
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
})
