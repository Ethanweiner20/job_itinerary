import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyAYUX1_HuQ7zkL95U2fNVJudQDkQw0Yxgg',
	authDomain: 'job-itinerary.firebaseapp.com',
	databaseURL: 'https://job-itinerary.firebaseio.com',
	projectId: 'job-itinerary',
	storageBucket: 'job-itinerary.appspot.com',
	messagingSenderId: '233542192640',
	appId: '1:233542192640:web:6e0611a637740ab827d2e5',
	measurementId: 'G-RLC3BFMG2G'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const usersCollection = db.collection('users');

export { db, auth, usersCollection };
