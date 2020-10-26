import React, { useState, useEffect } from "react";
import "../styles/PlacesModal.css";
import { db } from "../services/Firebase";

interface Props {
	name: string;
	available: boolean;
	range: number;
	type: string;
	id?: string;
	refNumber: number;
}

const PlaceModal: React.FC<Props> = ({
	name,
	available,
	range,
	type,
	id,
	refNumber,
}) => {
	const [newReferenceName, setNewReferenceName] = useState("");
	const [newReferenceLat, setNewReferenceLat] = useState<string>("");

	const docRef = db.collection("places").doc(id);

	const addReferences = async () => {
		let strs = newReferenceLat.split(",", 2);
		console.log("lon: ", strs[0], "lat: ", strs[1]);
		refNumber += 1;
		// let references: any = {};
		// references[refNumber] = {};
		docRef.update({
			refNumber: refNumber,
		});
		let refId: string = docRef.collection("references").doc().id;
		await docRef
			.collection("references")
			.doc(refId)
			.set({
				id: refId,
				refNumber: refNumber,
				name: newReferenceName,
				latitude: parseFloat(strs[0]),
				logitude: parseFloat(strs[1]),
			});
	};

	return (
		<div className="modal-container">
			{type === "Parque" ? (
				<img
					id="card-icon-modal"
					alt="Icono parque"
					src={process.env.PUBLIC_URL + "/icons/park.svg"}
				/>
			) : type === "Institucion gubernamental" ? (
				<img
					id="card-icon-modal"
					alt="Icono oficina"
					src={process.env.PUBLIC_URL + "/icons/office.svg"}
				/>
			) : type === "Centro educativo" ? (
				<img
					id="card-icon-modal"
					alt="Icono universidad"
					src={process.env.PUBLIC_URL + "/icons/university.svg"}
				/>
			) : type === "Centro de religion" ? (
				<img
					id="card-icon-modal"
					alt="Icono iglesia"
					src={process.env.PUBLIC_URL + "/icons/church.svg"}
				/>
			) : type === "Colonia" ? (
				<img
					id="card-icon-modal"
					alt="Icono colonia"
					src={process.env.PUBLIC_URL + "/icons/neighborhood.svg"}
				/>
			) : type === "Centro comercial" ? (
				<img
					id="card-icon-modal"
					alt="Icono bolsa"
					src={process.env.PUBLIC_URL + "/icons/shop.svg"}
				/>
			) : null}
			<div className="modal-divider-vertical" />
			<p className="modal-title" id="modal-place-type">
				{type === "Institucion gubernamental" ? "gubernamental" : type}
			</p>
			<p className="modal-title" id="modal-place-name">
				Nombre
			</p>
			<p className="modal-info" id="modal-info-name">
				{name}
			</p>
			<p className="modal-title" id="modal-place-radius">
				Radio
			</p>
			<div className="availability-wrapper">
				<p className="modal-info" id="modal-info-radius">
					{range} M
				</p>
				{available ? (
					<p className="modal-info" id="modal-info-availabilty">
						Disponible
					</p>
				) : (
					<p className="modal-info" id="modal-info-availabilty">
						No disponible
					</p>
				)}
			</div>
			<div className="modal-divider-horizontal" />
			<div className="reference">
				<h1 className="modal-title" id="modal-reference-title">
					Puntos de referencia
				</h1>
				<input
					onChange={(e) => setNewReferenceName(e.target.value)}
					className="reference-input"
					id="reference-name-input"
					placeholder="Nombre"
				/>
				<input
					onChange={(e) => setNewReferenceLat(e.target.value)}
					className="reference-input"
					id="lon-lat-input"
					placeholder="Longitud y latitud"
				/>

				<button
					onClick={() => {
						addReferences();
					}}
					className="newreference-btn"
				>
					+{/* <span className="btn-span">+</span> */}
				</button>
			</div>
		</div>
	);
};

export default PlaceModal;
