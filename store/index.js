import moment from 'moment';

export const state = () => ({
    selectedMonth: null,
    selectedCountry: null,
});

export const mutations = {
    updateSelectedMonth(state, payload) {
        state.selectedMonth = payload
    },
    updateSelectedCountry(state, payload) {
        state.selectedCountry = payload
    }
};

export const actions = {
    changeSelectedMonth(context, newMonth) {
        context.commit('updateSelectedMonth', newMonth)
    },
    changeSelectedCountry(context, newCountry) {
        context.commit('updateSelectedCountry', newCountry)
    }
};

export const getters = {
    selectedMonth(state) {
		return state.selectedMonth;
    },
    selectedCountry(state) {
		return state.selectedCountry;
	}
};