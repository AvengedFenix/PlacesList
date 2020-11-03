import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { db, functions } from "../services/Firebase";
import Col from "react-bootstrap/esm/Col";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import Register from "./Register";
import { UserContext } from "./../providers/UserProvider";
import "../styles/CreatePlace.css";

const addPlace = (
	name: string,
	available: boolean,
	range: number,
	type: string | null,
	lonLat: string
) => {
	let split = lonLat.split(",", 2);

	let id = db.collection("places").doc().id;
	db.collection("places")
		.doc(id)
		.set({
			id: id,
			name: name,
			available: available,
			range: range,
			type: type,
			refNumber: 0,
			longitude: split[0],
			latitude: split[1],
		})
		.then((docRef) => {
			console.log("Document written with ID: ", id);
		})
		.catch((err) => {
			console.error("error adding doc: ", err);
		});
};

const callAddPlace = functions.httpsCallable("addPlace");

const CreatePlaceScreen = () => {
	const user = useContext(UserContext);

	return <>{user ? <CreatePlace /> : <Register />}</>;
};

const CreatePlace = () => {
	const [name, setName] = useState("");
	const [available, setAvailable] = useState(false);
	const [range, setRange] = useState(0);
	const [type, setType] = useState<string | null>("Seleccione un tipo");
	const [dropdown, setDropdown] = useState(false);
	const [lonLat, setLonLat] = useState("");
	const [showToast, setShowToast] = useState(false);
	const [toastType, setToastType] = useState("");

	const options = [
		"Parque",
		"Colonia",
		"Centro comercial",
		"Institución gubernamental",
		"Centro educativo",
		"Centro de religión",
	];

	const colors = {
		white: "white",
		purple: "#af7ac5",
	};

	useEffect(() => {
		setTimeout(() => setShowToast(false), 8000);
	}, [showToast]);

	return (
		<div className="container form-container">
			{showToast ? (
				toastType === "success" ? (
					<div
						style={{
							backgroundColor: "#2ecc71",
							color: "white",
						}}
						className="shadow toast-container"
					>
						<p className="toast-msg" style={{ fontSize: "26px" }}>
							¡Creado con exito!
						</p>
					</div>
				) : toastType === "Missing" ? (
					<div
						style={{
							backgroundColor: "#c72241",
							color: "white",
						}}
						className="shadow toast-container"
					>
						<p className="toast-msg" style={{ fontSize: "26px" }}>
							El nombre, la latitud, longitud y el tipo deben estar llenos
						</p>
					</div>
				) : (
					<div
						style={{
							backgroundColor: "#c72241",
							color: "white",
						}}
						className="shadow toast-container"
					>
						<p className="toast-msg" style={{ fontSize: "26px" }}>
							Hubo un error al crear el lugar
						</p>
					</div>
				)
			) : null}
			<label className="form-label ">Nombre del lugar</label>
			<br />
			<input
				className="form-input shadow-sm"
				onChange={(event) => setName(event.target.value)}
				type="text"
				placeholder="Ingrese el nombre"
				value={name}
			/>
			<br />
			<input
				className="form-checkbox"
				defaultChecked={available}
				onClick={() => setAvailable(!available)}
				type="checkbox"
				name="available"
				checked={available}
			/>
			<label className="form-label" id="next-to-checkbox">
				Disponible
			</label>
			<br />
			<label className="form-label">Rango</label>
			<div className="slidecontainer">
				<input
					onChange={(e) => setRange(parseInt(e.target.value))}
					type="range"
					min="100"
					max="1000"
					className="slider"
					id="myRange"
					value={range}
				/>
				<p className="range-label">{range}</p>
			</div>

			<br />
			<label className="form-label">Tipo de lugar</label>
			<br />
			<div className="dropdown">
				<button
					style={
						dropdown ? { background: colors.purple, color: colors.white } : {}
					}
					onClick={() => setDropdown(!dropdown)}
					className="dropdown-btn"
				>
					{type}
				</button>
				<br />
				{dropdown ? (
					<div id="myDropdown" className="dropdown-content">
						{/* <br/> */}
						{options.map((option: string, key) => {
							return (
								<>
									<button
										className="dropdown-options"
										key={key}
										onClick={() => {
											setType(option);
											setDropdown(false);
										}}
									>
										{option}
									</button>
									<br />
								</>
							);
						})}
					</div>
				) : null}
			</div>
			<label className="form-label">Latitud y longitud</label>
			<br />
			<input
				onChange={(event) => {
					setLonLat(event.target.value);
				}}
				className="form-input shadow-sm"
				placeholder="Latitud , longitud"
				value={lonLat}
			/>
			<br />
			<button
				className="create-btn shadow"
				onClick={() => {
					if (type === "Seleccione un tipo" || lonLat === "" || name === "") {
						setToastType("Missing");
						setShowToast(true);
					} else {
						setAvailable(false);
						setType("Seleccione un tipo");
						setLonLat("");
						setName("");
						setRange(0);
						callAddPlace({
							name: name,
							available: available,
							range: range,
							type: type,
							lonLat: lonLat,
						})
							.then(() => {
								setToastType("success");
								setShowToast(true);
							})
							.catch(() => {
								setToastType("error");
								setShowToast(true);
							});
					}
				}}
			>
				Crear
			</button>
		</div>
	);
};

export default CreatePlaceScreen;
