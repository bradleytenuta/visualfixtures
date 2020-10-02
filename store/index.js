export const state = () => ({
    selectedMonth: null,
    selectedCountry: null,
    selectedSort: 1,
    displayAll: false,
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
};

export const getters = {
    selectedMonth(state) {
		return state.selectedMonth
    },
    selectedCountry(state) {
		return state.selectedCountry
    },
    selectedSort(state) {
        return state.selectedSort
    },
    displayAll(state) {
        return state.displayAll
    },
};