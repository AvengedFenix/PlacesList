import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
//import Firebase from "../services/Firebase";
import { signInWithGoogle } from "../services/Firebase";
// const provider = new Firebase.auth.GoogleAuthProvider();

const signIn = () => {
	// Firebase.auth().signInWithEmailAndPassword(email, password);
  signInWithGoogle()
};

const AppNav = () => {
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="">Places</Navbar.Brand>
				<Button onClick={signIn}>Sign in</Button>
			</Navbar>
		</>
	);
};

export default AppNav;
