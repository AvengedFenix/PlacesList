import React, { useEffect, useState, useContext } from "react";
import { db } from "../services/Firebase";
import Place from "./Place";
import "../styles/Explore.css";
import { UserContext } from "./../providers/UserProvider";
import Register from "./Register";
import { functions } from "../services/Firebase";

const placesRef = db.collection("places");

const colors = {
	purple: "#AF7AC5",
	white: "#FFFFFF",
};

const usingFunc = functions.httpsCallable("addPlace");

const ExploreScreen = () => {
	const user = useContext(UserContext);

	return <>{user ? <Explore /> : <Register />}</>;
};

const Explore = () => {
	const [places, setPlaces] = useState([]);
	const [search, setSearch] = useState<string>("");
	const [filterButtons, setfilterButtons] = useState({
		colonia: false,
		centroEducativo: false,
		centroGubernamental: false,
		centroComercial: false,
		parque: false,
		centroReligion: false,
	});

	const updateSearch = (e: any) => {
		setSearch(e.target.value);
		console.log(search);
	};

	const clearFilters = () => {
		setSearch("");
	};

	const fetchPlaces = async () => {
		let list: any = [];
		if (search === "") {
			await placesRef.get().then((snapshot) => {
				snapshot.forEach((doc) => {
					list.push(doc.data());
				});
			});
		} else {
			places.map((doc: any, key: number) => {
				if (doc.name.includes(search)) {
					list.push(doc);
				}
				return null;
			});
		}
		setPlaces(list);
	};
	console.log(places);

	useEffect(() => {
		fetchPlaces();
	}, [search]);

	return (
		<>
			<button onClick={() => usingFunc()}> Function</button>
			<input
				value={search}
				defaultValue=""
				onChange={(e) => updateSearch(e)}
				className="search-bar shadow"
				placeholder="Buscar"
			/>
			<button onClick={() => clearFilters()} className="clear-btn shadow-sm">
				x
			</button>
			<div className="button-container">
				<button
					style={
						filterButtons.colonia
							? { background: colors.purple, color: colors.white }
							: {}
					}
					onClick={() => {
						setfilterButtons({
							colonia: !filterButtons.colonia,
							centroEducativo: filterButtons.centroEducativo,
							centroGubernamental: filterButtons.centroGubernamental,
							centroComercial: filterButtons.centroComercial,
							parque: filterButtons.parque,
							centroReligion: filterButtons.centroReligion,
						});
					}}
					className="filter-button shadow"
				>
					Colonia
				</button>
				<button
					style={
						filterButtons.centroEducativo
							? { background: colors.purple, color: colors.white }
							: {}
					}
					onClick={() => {
						setfilterButtons({
							colonia: filterButtons.colonia,
							centroEducativo: !filterButtons.centroEducativo,
							centroGubernamental: filterButtons.centroGubernamental,
							centroComercial: filterButtons.centroComercial,
							parque: filterButtons.parque,
							centroReligion: filterButtons.centroReligion,
						});
					}}
					className="filter-button shadow"
				>
					Centro educativo
				</button>
				<button
					style={
						filterButtons.centroGubernamental
							? { background: colors.purple, color: colors.white }
							: {}
					}
					onClick={() => {
						setfilterButtons({
							colonia: filterButtons.colonia,
							centroEducativo: filterButtons.centroEducativo,
							centroGubernamental: !filterButtons.centroGubernamental,
							centroComercial: filterButtons.centroComercial,
							parque: filterButtons.parque,
							centroReligion: filterButtons.centroReligion,
						});
					}}
					className="filter-button shadow"
				>
					Centro gubernamental
				</button>
				<button
					style={
						filterButtons.centroComercial
							? { background: colors.purple, color: colors.white }
							: {}
					}
					onClick={() => {
						setfilterButtons({
							colonia: filterButtons.colonia,
							centroEducativo: filterButtons.centroEducativo,
							centroGubernamental: filterButtons.centroGubernamental,
							centroComercial: !filterButtons.centroComercial,
							parque: filterButtons.parque,
							centroReligion: filterButtons.centroReligion,
						});
					}}
					className="filter-button shadow"
				>
					Centro comercial
				</button>
				<button
					style={
						filterButtons.parque
							? { background: colors.purple, color: colors.white }
							: {}
					}
					onClick={() => {
						setfilterButtons({
							colonia: filterButtons.colonia,
							centroEducativo: filterButtons.centroEducativo,
							centroGubernamental: filterButtons.centroGubernamental,
							centroComercial: filterButtons.centroComercial,
							parque: !filterButtons.parque,
							centroReligion: filterButtons.centroReligion,
						});
					}}
					className="filter-button shadow"
				>
					Parque
				</button>
				<button
					style={
						filterButtons.centroReligion
							? { background: colors.purple, color: colors.white }
							: {}
					}
					onClick={() => {
						setfilterButtons({
							colonia: filterButtons.colonia,
							centroEducativo: filterButtons.centroEducativo,
							centroGubernamental: filterButtons.centroGubernamental,
							centroComercial: filterButtons.centroComercial,
							parque: filterButtons.parque,
							centroReligion: !filterButtons.centroReligion,
						});
					}}
					className="filter-button shadow"
				>
					Centro de religión
				</button>
			</div>
			<br />
			<br />
			<div className="container">
				{places.map((place: any, key: any) => {
					return (
						<Place
							refNumber={place.refNumber}
							id={place.id}
							name={place.name}
							available={place.available}
							range={place.range}
							type={place.type}
						/>
					);
				})}
			</div>
		</>
	);
};

export default ExploreScreen;
