import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import SignIn from '@/views/auth/SignIn';
import SignUp from '@/views/auth/SignUp';
import Archives from '@/views/Archives';
import Recent from '@/views/Recent';
import ArchivesJob from '@/views/ArchiveJob';

import { auth } from '@/firebase/init';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Main',
		beforeEnter: (to, from, next) => {
			next({ name: 'Recent' });
		}
	},
	{
		path: '/recent',
		name: 'Recent',
		component: Recent,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/archives',
		name: 'Archives',
		component: Archives,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/sign-in',
		name: 'SignIn',
		component: SignIn
	},
	{
		path: '/sign-up',
		name: 'SignUp',
		component: SignUp
	},
	{
		path: '/home',
		name: 'Home',
		component: Home
	},
	{
		path: '/archives/:id',
		name: 'ArchivesJob',
		component: ArchivesJob,
		props: true,
		meta: {
			requiresAuth: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((rec) => rec.meta.requiresAuth)) {
		if (auth.currentUser) {
			next();
		} else {
			next({ name: 'Home' });
		}
	} else {
		next();
	}
});

export default router;
