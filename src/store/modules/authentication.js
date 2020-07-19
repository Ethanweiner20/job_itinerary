import { auth } from '@/firebase/init';

const state = {
	user: null
};

const getters = {
	user: (state) => state.user
};

const actions = {
	listenToAuth({ commit }) {
		auth.onAuthStateChanged((user) => {
			if (user) {
				commit('setUser', user);
			} else {
				commit('setUser', null);
			}
		});
	}
};

const mutations = {
	setUser: (state, user) => {
		state.user = user;
		console.log(state.user);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
