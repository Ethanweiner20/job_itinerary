import { db } from '@/firebase/init';

const state = {
	id: null,
	jobData: {}
};

const getters = {
	jobData: (state) => state.jobData,
	id: (state) => state.id
};

const actions = {
	async getJobData({ commit, rootState }, options) {
		let user = rootState.Authentication.user;

		// Options determines most recent VS archive
		let data;
		let id;

		if (user) {
			if (options.id) {
				data = (await db.collection('users').doc(user.uid).collection('jobs').doc(options.id).get()).data();
				id = options.id;
			} else {
				console.log(options);
				const docs = (await db
					.collection('users')
					.doc(user.uid)
					.collection('jobs')
					.orderBy('created_at', 'desc')
					.where('worker.name', '==', options.worker.name)
					.get()).docs;
				if (docs[0]) {
					data = docs[0].data();
					id = docs[0].id;
				} else {
					throw new Error('Please refresh the page');
				}
			}
		}
		commit('setId', id);
		commit('setJobData', data);
	}
};

const mutations = {
	setJobData(state, data) {
		state.jobData = data;
	},
	setId(state, id) {
		state.id = id;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
