import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import dotenv from "dotenv";
dotenv.config();

let config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

console.log(window.location.hostname);
if (window.location.hostname === "localhost") {
	console.log("local db");
	
	config.databaseURL = "http://localhost:8080";
	console.log(config.databaseURL);
	
}
// class Firebase {
// 	// auth: app.auth.Auth;
// 	constructor() {
// 		app.initializeApp(config);

// 		// this.auth = app.app().auth();
// 	}

// doCreateUserWithEmailAndPassword = (email: string, password: string) => {
// 	this.auth.createUserWithEmailAndPassword(email, password);
// };

// doSignInWithEmailAndPassword = (email: string, password: string) =>
// 	this.auth.signInWithEmailAndPassword(email, password);

// doSignOut = () => this.auth.signOut();
// }

const Firebase = firebase.initializeApp(config);
firebase.functions().useFunctionsEmulator("http://localhost:5001");

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();

export const functions = firebase.functions();

export const signInWithGoogle = () => {
	auth
		.signInWithPopup(googleProvider)
		.then((res) => {
			console.log(res.user);
		})
		.catch((error) => {
			console.log(error.message);
		});
};
export default Firebase;
