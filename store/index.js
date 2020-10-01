import moment from 'moment';

export const state = () => ({
    selectedMonth: null,
    selectedCountry: null,
    displayAll: false,
    selectedSort: 1,
});

export const mutations = {
    updateSelectedMonth(state, payload) {
        state.selectedMonth = payload
    },
    updateSelectedCountry(state, payload) {
        state.selectedCountry = payload
    },
    updateDisplayAll(state, payload) {
        state.displayAll = payload
    },
    updateSelectSort(state, payload) {
        state.selectedSort = payload
    }
};

export const actions = {
    changeSelectedMonth(context, payload) {
        context.commit('updateSelectedMonth', payload)
    },
    changeSelectedCountry(context, payload) {
        context.commit('updateSelectedCountry', payload)
    },
    changeDisplayAll(context, payload) {
        context.commit('updateDisplayAll', payload)
    },
    changeSelectSort(context, payload) {
        context.commit('updateSelectSort', payload)
    }
};

export const getters = {
    selectedMonth(state) {
		return state.selectedMonth
    },
    selectedCountry(state) {
		return state.selectedCountry
    },
    displayAll(state) {
        return state.displayAll
    },
    selectedSort(state) {
        return state.selectedSort
    }
};