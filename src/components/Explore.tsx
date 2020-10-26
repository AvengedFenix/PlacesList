import React, { useEffect, useState } from "react";
import { db } from "../services/Firebase";
import Place from "./Place";
import "../styles/Explore.css";
const placesRef = db.collection("places");

const colors = {
	purple: "#AF7AC5",
	white: "#FFFFFF",
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
					let obj: any = [];
					obj.push(doc.data)
					obj.push(doc.id);
					list.push(obj);
				});
			});
		} else {
			places.map((doc: any, key: number) => {
				if (doc.name.includes(search)) {
					list.push(doc);
				}
				return null;
			});
			// await placesRef
			// 	.where("name", ">=", search)
			// 	.where("name", "<", search)
			// 	.get()
			// 	.then((snapshot) => {
			// 		snapshot.forEach((doc) => {
			// 			console.log("Query", doc);
			// 			list.push(doc.data());
			// 		});
			// 	});
		}
		setPlaces(list);
	};
	console.log(places);

	useEffect(() => {
		fetchPlaces();
	}, [search]);

	return (
		<>
			<input
				value={search}
				defaultValue=""
				onChange={(e) => updateSearch(e)}
				className="search-bar"
				placeholder="Buscar"
			/>
			<button onClick={() => clearFilters()} className="clear-btn">
				Clear
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
					className="filter-button"
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
					className="filter-button"
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
					className="filter-button"
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
					className="filter-button"
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
					className="filter-button"
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
					className="filter-button"
				>
					Centro de religión
				</button>
			</div>
			<br />
			<br />
			<div className="container">
				{places.map((place: any, key: any) => {
					console.log(place.id);
					
					return (
						<Place
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

export default Explore;
