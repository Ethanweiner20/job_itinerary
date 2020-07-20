import Vue from 'vue';
import Vuex from 'vuex';
import Authentication from './modules/authentication';
import Worker from './modules/worker';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		Authentication,
		Worker
	}
});
