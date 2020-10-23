import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
//import Firebase from "../services/Firebase";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../services/Firebase";
// const provider = new Firebase.auth.GoogleAuthProvider();

const signIn = () => {
	// Firebase.auth().signInWithEmailAndPassword(email, password);
	signInWithGoogle();
};

const AppNav = () => {
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	return (
		<>
			<Navbar bg="dark" expand="lg" variant="dark">
				<Navbar.Brand href="">Places</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="">
					<Nav className="mr-auto">
						<Link to="/">
							Explorar
							{/* <Nav.Link >Explorar</Nav.Link> */}
						</Link>
						<Link to="/createPlace">
              Place
							{/* <Nav.Link >Crear lugar</Nav.Link> */}
						</Link>
						<Button onClick={signIn}>Sign in</Button>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default AppNav;
