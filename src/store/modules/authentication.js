import { auth, usersCollection } from '@/firebase/init';

const state = {
	user: null,
	jobsCollection: null
};

const getters = {
	user: (state) => state.user,
	jobsCollection: (state) => usersCollection.doc(state.user.uid).collection('jobs')
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
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
