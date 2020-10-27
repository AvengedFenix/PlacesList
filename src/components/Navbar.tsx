import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/Firebase";
import "../styles/Navbar.css";
import { UserContext } from "./../providers/UserProvider";

const logOut = async () => {
	await auth
		.signOut()
		.then(() => {
			console.log("Sign out successful");
		})
		.catch(() => {
			console.log("Error exiting");
		});
};

const Navbar = () => {
	const user = useContext(UserContext);

	return (
		<div className="navbar">
			<img
				id="app-icon"
				src={process.env.PUBLIC_URL + "/icons/fire.svg"}
				alt="fire logo"
			/>
			<Link to="/">
				<h1 id="explore" className="nav-option">
					Explorar
				</h1>
			</Link>
			<Link to="/createPlace">
				<h1 id="create" className="nav-option">
					Crear
				</h1>
			</Link>
			{user ? (
				<button className="sign-out-btn" onClick={() => logOut()}>
					Salir
				</button>
			) : null}
		</div>
	);
};

export default Navbar;
