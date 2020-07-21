const state = {
	jobData: {
		additionalNotes: 'Some notes',
		customer: 'Some customer',
		date: '2020-07-18',
		hours: '8',
		images: [],
		location: 'Some location',
		startTime: 'Some time',
		tasks: [
			{
				completed: true,
				name: 'Task Name',
				notes: 'Yessir'
			}
		],
		tools: [],
		worker: ''
	}
};

const getters = {
	jobData: (state) => state.jobData
};

const actions = {
	getJobData({ commit }) {
		// Retrieve job data from database & commit
	}
};

const mutations = {
	setJobData(state, data) {
		state.jobData = data;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
