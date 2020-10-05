// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import list from '~/components/fixtures/list/list'
import { mockCompetitionTree } from '~/test/mocks'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
Vue.use(Vuetify)

// List test suite.
describe('list', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(Vuex)

  // Creates a Mock Vuex Store.
  const mockActions = {
    changeSelectedMonth: jest.fn(),
    changeSelectSort: jest.fn(),
    changeDisplayAll: jest.fn(),
    changeSearchText: jest.fn(),
  }
  const store = new Vuex.Store({
    state: { selectedMonth: 'January 2020', selectedSort: 1, displayAll: true, searchText: '' },
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
      competitionTree: [...mockCompetitionTree],
    },
  }

  it('should render the list component', () => {
    expect(shallowMount(list, wrapperData).vm).toBeTruthy()
  })

  test('If the competitions get sorted in ascending order', () => {
    const wrapper = shallowMount(list, wrapperData)
    expect(wrapper.vm.viewableBranches[0].competitions).toEqual(mockCompetitionTree[0].competitions)
  })

  test('If the competitions get sorted in descending order', () => {
    const wrapper = shallowMount(list, wrapperData)

    // Sorts both in descending order.
    wrapper.vm.sortCompetitions(2, wrapper.vm.viewableBranches[0].competitions)
    wrapper.vm.sortCompetitions(2, mockCompetitionTree[0].competitions)

    expect(wrapper.vm.viewableBranches[0].competitions).toEqual(mockCompetitionTree[0].competitions)
  })

  test('If the branches get sorted in ascending order', () => {
    const wrapper = shallowMount(list, wrapperData)
    expect(wrapper.vm.viewableBranches[0]).toEqual(mockCompetitionTree[0])
  })

  test('If the branches get sorted in descending order', () => {
    const wrapper = shallowMount(list, wrapperData)

    // Sorts both in descending order.
    wrapper.vm.sortBranches(2, wrapper.vm.viewableBranches)
    wrapper.vm.sortBranches(2, mockCompetitionTree)

    expect(wrapper.vm.viewableBranches).toEqual(mockCompetitionTree)
  })
})
