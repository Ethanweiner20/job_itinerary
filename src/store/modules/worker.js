const state = {
	worker: null
};

const getters = {
	worker: (state) => state.worker
};

const actions = {};

const mutations = {
	setWorker: (state, worker) => {
		state.worker = worker;
		localStorage.setItem('workerName', worker.name);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
