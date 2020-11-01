import React, { useState, useEffect } from "react";
import "../styles/PlacesModal.css";
import "../styles/ReferencesTable.css";
import { db } from "../services/Firebase";
import ReferencePoint from "./ReferencePoint";
import { Link } from "react-router-dom";
import { functions } from "./../services/Firebase";
import Modal from "react-modal";
import Loading from "./Loading";

interface Props {
	name: string;
	available: boolean;
	range: number;
	type: string;
	id: string;
	refNumber: number;
	lon: number | string;
	lat: number | string;
	onRequestClose?: any;
}

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "90%",
		height: "90%",
	},
};

const EditForm: React.FC<Props> = ({
	name,
	available,
	range,
	type,
	id,
	refNumber,
	lon,
	lat,
	onRequestClose,
}) => {
	const [editName, setEditName] = useState<string>(name);
	const [editAvailable, setEditAvailable] = useState<boolean>(available);
	const [editRange, setEditRange] = useState<number>(range);
	const [editType, setEditType] = useState<string | null>(type);
	const [dropdown, setDropdown] = useState<boolean>(false);
	const [lonLat, setLonLat] = useState<string>(lon + " , " + lat);

	const colors = {
		white: "white",
		purple: "#af7ac5",
	};

	const options = [
		"Parque",
		"Colonia",
		"Centro comercial",
		"Institución gubernamental",
		"Centro educativo",
		"Centro de religión",
	];

	const callEditPlace = functions.httpsCallable("editPlace");

	return (
		<div className="container form-container">
			<label className="form-label ">Nombre del lugar</label>
			<br />
			<input
				className="form-input shadow-sm"
				onChange={(event) => setEditName(event.target.value)}
				type="text"
				placeholder="Ingrese el nombre"
				value={editName}
			/>
			<br />
			<input
				className="form-checkbox"
				defaultChecked={editAvailable}
				onClick={() => setEditAvailable(editAvailable)}
				type="checkbox"
				name="available"
			/>
			<label className="form-label">Disponible</label>
			<br />
			<label className="form-label">Rango</label>
			<div className="slidecontainer">
				<input
					onChange={(e) => setEditRange(parseFloat(e.target.value))}
					type="range"
					min="100"
					max="1000"
					className="slider"
					id="myRange"
					value={editRange}
				/>
				<p className="range-label">{editRange}</p>
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
					{editType}
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
											setEditType(option);
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
			<label className="form-label">Latitud y Longitud</label>
			<br />
			<input
				onChange={(event) => {
					setLonLat(event.target.value);
					console.log(lonLat);
				}}
				className="form-input shadow-sm"
				placeholder="Latitud , longitud"
				defaultValue={lat + " , " + lon}
			/>
			<br />
			<button
				className="create-btn shadow"
				onClick={() => {
					console.log("lonLat", lonLat);
					callEditPlace({
						id: id,
						name: editName,
						available: editAvailable,
						range: editRange,
						type: editType,
						lonLat: lonLat,
					});
					onRequestClose();
				}}
			>
				Editar
			</button>
		</div>
	);
};

const referencesCollection = functions.httpsCallable("getReferences");

const addReference = functions.httpsCallable("addReferences");

const PlaceModal: React.FC<Props> = ({
	name,
	available,
	range,
	type,
	id,
	refNumber,
	lon,
	lat,
}) => {
	const [newReferenceName, setNewReferenceName] = useState("");
	const [newReferenceLat, setNewReferenceLat] = useState<string>("");
	const [references, setReferences] = useState([]);
	const [once, setOnce] = useState(true);
	const [deleteBtn, setDeleteBtn] = useState(false);
	const [modalState, setModalState] = useState<boolean>(false);
	const [loading, setLoading] = useState(true);

	const docRef = db.collection("places").doc(id);

	const addReferences = async () => {
		await addReference({
			id: id,
			newRefLat: newReferenceLat,
			newRefName: newReferenceName,
			refNumber: refNumber,
		}).then(() => {
			setOnce(true);
			setReferences([]);
		});
	};

	const getReferences = async () => {
		let list: any;
		await referencesCollection({ id: id }).then((res: any) => {
			list = res.data;
		});
		setReferences(list);
	};

	const deletePlace = async () => {
		const deleteRef = functions.httpsCallable("deletePlace");
		await deleteRef({ id: id }).then(() => console.log("Documento eliminado"));
	};

	const removeReference = (index: number) => {
		let list = references;
		list.splice(index);

		setReferences(list);
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
		setLoading(() => false);
	}, [references]);

	const openModal = () => {
		setModalState(true);
	};

	const closeModal = () => {
		setModalState(false);
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
			<div className="edit-btns-container">
				<button
					onClick={() => setModalState(true)}
					className="edit-btn shadow"
					id="edit-btn"
				>
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
					placeholder="Latitud y longitud"
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
				{!loading ? (
					<table style={{ width: "100%" }}>
						<tr>
							<th>ID</th>
							<th>#</th>
							<th>Nombre</th>
							<th>Longitud</th>
							<th>Latitud</th>
							<th>Acciones</th>
						</tr>
						{references.map((reference: any, key: any) => {
							return (
								<ReferencePoint
									key={key}
									id={id}
									refId={reference.id}
									name={reference.name}
									lon={reference.longitude}
									lat={reference.latitude}
									number={reference.refNumber}
									listRemover={() => {
										removeReference(key);
									}}
								/>
							);
						})}
					</table>
				) : (
					<Loading />
				)}
			</div>
			<Link to={`/maps/id=${id};lon=${lon};lat=${lat}`}>
				<button className="view-map">Ver mapa</button>
			</Link>
			<Modal
				style={customStyles}
				isOpen={modalState}
				onRequestClose={closeModal}
			>
				<EditForm
					name={name}
					available={available}
					id={id}
					lat={lat}
					lon={lon}
					range={range}
					refNumber={refNumber}
					type={type}
					onRequestClose={closeModal}
				/>
			</Modal>
		</div>
	);
};

export default PlaceModal;
