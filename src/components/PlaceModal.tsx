import React, { useState, useEffect } from "react";
import "../styles/PlacesModal.css";
import "../styles/ReferencesTable.css";
import { db } from "../services/Firebase";
import ReferencePoint from "./ReferencePoint";
import { Link } from "react-router-dom";
import { functions } from "./../services/Firebase";

interface Props {
	name: string;
	available: boolean;
	range: number;
	type: string;
	id: string;
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
	const [references, setReferences] = useState([]);
	const [once, setOnce] = useState(true);
	const [deleteBtn, setDeleteBtn] = useState(false);

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
				longitude: parseFloat(strs[1]),
			})
			.then(() => {
				setOnce(true);
				setReferences([]);
			});
	};

	const getReferences = async () => {
		let list: any = [];
		await docRef
			.collection("references")
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					console.log(doc.data());

					list.push(doc.data());
				});
			});
		setReferences(list);
	};

	const deletePlace = async () => {

		const deleteRef = functions.httpsCallable("deletePlace");
		await deleteRef({id: id}).then(() => console.log("Documento eliminado"));
	};

	useEffect(() => {
		console.log("useEffect Modal");

		if (references.length === 0) {
			console.log("Fetch references");
			if (once) {
				getReferences();
				setOnce(false);
			}
		}
	}, [references]);

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
			<div className="edit-btns-container">
				<button className="edit-btn shadow" id="edit-btn">
					Editar
				</button>
				<button
					onClick={() => setDeleteBtn(!deleteBtn)}
					className="edit-btn shadow"
					id="delete-btn"
				>
					Borrar
				</button>
				{deleteBtn ? (
					<div className="delete-confirmation shadow">
						<h1 className="delete-header">
							¿Está seguro que desea eliminar este lugar?
						</h1>
						<button
							onClick={deletePlace}
							className="edit-btn shadow"
							id="delete-btn"
						>
							Confirmar
						</button>
					</div>
				) : null}
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
					+
				</button>
			</div>
			<div className="reference-point-container">
				<table style={{ width: "100%" }}>
					<tr>
						<th>ID</th>
						<th>#</th>
						<th>Nombre</th>
						<th>Longitud</th>
						<th>Latitud</th>
					</tr>
					{references.map((reference: any, key: any) => {
						return (
							<ReferencePoint
								key={key}
								id={reference.id}
								name={reference.name}
								lon={reference.longitude}
								lat={reference.latitude}
								number={reference.refNumber}
							/>
						);
					})}
				</table>
			</div>
			<Link to={`/maps/${id}`}>
				<button>Ver mapa</button>
			</Link>
		</div>
	);
};

export default PlaceModal;
