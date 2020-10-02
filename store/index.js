export const state = () => ({
    selectedMonth: null,
    selectedCountry: null,
    selectedSort: 1,
    displayAll: false,
    dropdownState: false,
    searchText: '',
});

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
    updateSearchText(state, payload) {
        state.searchText = payload
    },
    updateDropdownState(state, payload) {
        state.dropdownState = payload
    },
};

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
    changeSearchText(context, payload) {
        if (payload == null) {
            context.commit('updateSearchText', '')
        } else {
            context.commit('updateSearchText', payload)
        }
    },
};