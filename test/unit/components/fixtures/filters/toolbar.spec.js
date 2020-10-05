// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import toolbar from '~/components/fixtures/filters/toolbar'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// Toolbar test suite.
describe('toolbar', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(Vuex)

  // Creates a Mock Vuex Store.
  const mockActions = {
    changeDropdownState: jest.fn(),
    changeDisplayAll: jest.fn(),
  }
  const store = new Vuex.Store({
    state: { dropdownState: false, displayAll: false },
    actions: mockActions,
  })

  // The wrapper Data to be used by all unit tests.
  const wrapperData = {
    localVue,
    store,
    stubs: {
      NuxtLink: true,
    },
  }

  it('should render the toolbar component', () => {
    expect(shallowMount(toolbar, wrapperData).vm).toBeTruthy()
  })

  // Tests the mobile dropdown button.
  test('If the dropdown button is clicked, vuex action should be called', () => {
    const wrapper = shallowMount(toolbar, wrapperData)
    wrapper.setData({ dropdownState: false })

    wrapper.find('.filter-top-bar-filter-button-mobile').trigger('click')

    expect(mockActions.changeDropdownState).toHaveBeenCalled()
  })

  // Tests the desktop dropdown button.
  test('If the dropdown button is clicked, vuex action should be called', () => {
    const wrapper = shallowMount(toolbar, wrapperData)
    wrapper.setData({ dropdownState: false })

    wrapper.find('.filter-top-bar-filter-button-desktop').trigger('click')

    expect(mockActions.changeDropdownState).toHaveBeenCalled()
  })

  test('If the displayAll button is clicked, vuex action should be called', () => {
    const wrapper = shallowMount(toolbar, wrapperData)
    wrapper.setData({ displayAll: false })

    wrapper.find('.filter-top-bar-checkbox').trigger('click')

    expect(mockActions.changeDisplayAll).toHaveBeenCalled()
  })
})
