// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import dropdown from '~/components/fixtures/filters/dropdown'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// Dropdown test suite.
describe('dropdown', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(Vuex)

  // Creates a Mock Vuex Store.
  const mockActions = {
    changeSelectedMonth: jest.fn(),
    changeSelectedCountry: jest.fn(),
    changeSelectSort: jest.fn(),
    changeDisplayAll: jest.fn(),
    changeDropdownState: jest.fn(),
    changeSearchText: jest.fn(),
    changeIsSnippet: jest.fn(),
  }
  const store = new Vuex.Store({
    state: {
      selectedMonth: null,
      selectedCountry: null,
      selectedSort: 1,
      displayAll: false,
      dropdownState: false,
      searchText: '',
      isSnippet: false,
    },
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
      months: ['September 2020', 'October 2020'],
      countries: [],
    },
  }

  it('should render the dropdown component', () => {
    expect(shallowMount(dropdown, wrapperData).vm).toBeTruthy()
  })

  test('If when selected country changes, vuex action should be called', () => {
    const wrapper = shallowMount(dropdown, wrapperData)
    wrapper.setData({ selectedCountry: null })

    wrapper.find('#select-country-fixtures').trigger('click')

    expect(mockActions.changeSelectedCountry).toHaveBeenCalled()
  })

  test('If when selected month changes, vuex action should be called', () => {
    const wrapper = shallowMount(dropdown, wrapperData)
    wrapper.setData({ selectedMonth: null })

    wrapper.find('#select-month-fixtures').trigger('click')

    expect(mockActions.changeSelectedMonth).toHaveBeenCalled()
  })

  test('If when selected sort changes, vuex action should be called', () => {
    const wrapper = shallowMount(dropdown, wrapperData)
    wrapper.setData({
      selectedSort: 1,
      sortOptions: [
        {
          text: 'Ascending',
          value: 1,
        },
        {
          text: 'Descending',
          value: 2,
        },
      ],
    })

    wrapper.find('#select-sort-fixtures').trigger('click')

    expect(mockActions.changeSelectSort).toHaveBeenCalled()
  })

  test('If when searchText changes, vuex action should be called', () => {
    const wrapper = shallowMount(dropdown, wrapperData)
    wrapper.setData({ searchText: '' })

    // Adds text to the search bar and checks to see if Vuex action has been triggered.
    var searchBarElement = wrapper.find('#comp-search-bar-fixtures')
    searchBarElement.element.value = 'test'
    searchBarElement.trigger('input')

    expect(mockActions.changeSearchText).toHaveBeenCalled()
  })
})
