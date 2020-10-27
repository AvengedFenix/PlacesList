import React, { useState } from "react";
import "../styles/Register.css";
import { auth } from "./../services/Firebase";
import { signInWithGoogle } from "../services/Firebase";
// const provider = new Firebase.auth.GoogleAuthProvider();

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signInGoogle = () => {
		signInWithGoogle();
	};

	const signIn = () => {
		auth.signInWithEmailAndPassword(email, password).catch(() => {
			auth.createUserWithEmailAndPassword(email, password).catch((err) => {
				console.log(err);
			});
		});
	};

	return (
		<div className="sign-in-container">
			<div className="box">
				<h1 className="msg">Bienvenido</h1>
				<h2 className="msg-inicio">Inicio de sesión</h2>
				<input
					onChange={(e) => setEmail(e.target.value)}
					className="sign-in-input"
					placeholder="Email"
					type="email"
				/>
				<br />
				<input
					onChange={(e) => setPassword(e.target.value)}
					className="sign-in-input"
					placeholder="Contraseña"
					type="password"
				/>
				<br />
				<button
					onClick={() => {
						signIn();
					}}
					className="sign-in-btn"
				>
					Iniciar
				</button>
				<br />
				<button
					onClick={() => {
						signInGoogle();
					}}
					id="google-sign-in-btn"
					className="sign-in-btn"
				>
					Iniciar con google
				</button>
			</div>
		</div>
	);
};

export default Register;
