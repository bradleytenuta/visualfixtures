import { actions, state } from '~/store/index'

describe('searchText', () => {
  // Mocks the commit function used in the Vuex action context parameter.
  let updatedString
  let mockCommit = (state, payload) => {
    updatedString = payload
  }

  test('When search text is null, it should set it to an empty string', () => {
    actions.changeSearchText({ commit: mockCommit }, null)
    expect(updatedString).toBe('')
  })

  test('When search text is a string, it should set it to that string', () => {
    actions.changeSearchText({ commit: mockCommit }, 'test')
    expect(updatedString).toBe('test')
  })

  test('When search text is an empty string, it should set it to that empty string', () => {
    actions.changeSearchText({ commit: mockCommit }, '')
    expect(updatedString).toBe('')
  })
})

describe('resetVuex', () => {
  test('When resetVuex action is called, it resets all state variables to default state', () => {
    // The original state, this is what the resetVuex should set the state to.
    var defaultState = Object.create(state())

    // Mocks each commit for each action resetVuex calls.
    let mockCommit = (state, payload) => {
      if (state == 'updateSelectedMonth') {
        expect(payload).toBe(defaultState.selectedMonth)
      }
      if (state == 'updateSelectedCountry') {
        expect(payload).toBe(defaultState.selectedCountry)
      }
      if (state == 'updateSelectSort') {
        expect(payload).toBe(defaultState.selectedSort)
      }
      if (state == 'updateDisplayAll') {
        expect(payload).toBe(defaultState.displayAll)
      }
      if (state == 'updateDropdownState') {
        expect(payload).toBe(defaultState.dropdownState)
      }
      if (state == 'updateSearchText') {
        expect(payload).toBe(defaultState.searchText)
      }
      if (state == 'updateIsSnippet') {
        expect(payload).toBe(defaultState.isSnippet)
      }
      if (state == 'updateActiveComp') {
        expect(payload).toBe(defaultState.activeComp)
      }
    }

    actions.resetVuex({ commit: mockCommit })
  })
})
