/**
 * All state for a fixture page.
 */
export const state = () => ({
  selectedMonth: null,
  selectedCountry: null,
  selectedSort: 1,
  displayAll: false,
  dropdownState: false,
  searchText: '',
  isSnippet: false,
})

/**
 * All mutation functions.
 */
export const mutations = {
  updateSelectedMonth(state, payload) {
    state.selectedMonth = payload
  },
  updateSelectedCountry(state, payload) {
    state.selectedCountry = payload
  },
  updateSelectSort(state, payload) {
    state.selectedSort = payload
  },
  updateDisplayAll(state, payload) {
    state.displayAll = payload
  },
  updateDropdownState(state, payload) {
    state.dropdownState = payload
  },
  updateSearchText(state, payload) {
    state.searchText = payload
  },
  updateIsSnippet(state, payload) {
    state.isSnippet = payload
  },
}

/**
 * All action functions.
 */
export const actions = {
  changeSelectedMonth(context, payload) {
    context.commit('updateSelectedMonth', payload)
  },
  changeSelectedCountry(context, payload) {
    context.commit('updateSelectedCountry', payload)
  },
  changeSelectSort(context, payload) {
    context.commit('updateSelectSort', payload)
  },
  changeDisplayAll(context, payload) {
    context.commit('updateDisplayAll', payload)
  },
  changeDropdownState(context, payload) {
    context.commit('updateDropdownState', payload)
  },
  changeIsSnippet(context, payload) {
    context.commit('updateIsSnippet', payload)
  },
  /**
   * If the payload given is null then its set to an
   * empty string instead.
   */
  changeSearchText(context, payload) {
    if (payload == null) {
      context.commit('updateSearchText', '')
    } else {
      context.commit('updateSearchText', payload)
    }
  },
  /**
   * This action is used to reset the Vuex state
   * back to its inital state.
   */
  resetVuex(context) {
    context.commit('updateSelectedMonth', null)
    context.commit('updateSelectedCountry', null)
    context.commit('updateSelectSort', 1)
    context.commit('updateDisplayAll', false)
    context.commit('updateDropdownState', false)
    context.commit('updateSearchText', '')
    context.commit('updateIsSnippet', false)
  },
}
