import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { auth, db } from './firebase/init';

Vue.config.productionTip = false;
// In main.js

let app = null;

auth.onAuthStateChanged((user) => {
	// Init app if not already created
	if (!app) {
		app = new Vue({
			router,
			store,
			render: (h) => h(App)
		}).$mount('#app');
	}
});
