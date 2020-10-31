import React, { useEffect, useState, useContext } from "react";
import { db } from "../services/Firebase";
import Place from "./Place";
import "../styles/Explore.css";
import { UserContext } from "./../providers/UserProvider";
import Register from "./Register";
import { functions } from "../services/Firebase";
import Firebase from "./../services/Firebase";
import { listenerCount } from "cluster";

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
	const [places, setPlaces] = useState<any>([]);
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
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

	const fetchMorePlaces = async () => {
		let list: any = [];

		const lastVisible = places[places.length - 1];
		console.log(lastVisible);

		const getPlaces = functions.httpsCallable("getMorePlaces");
		await getPlaces({ lastVisible: lastVisible }).then((res: any) => {
			res.data.map((doc: any) => {
				console.log("doc", doc);

				list.push(doc);
				return null;
			});
		});
		setPlaces((prevState: any) => {
			return [...prevState, ...list];
		});
		console.log("More places", places);
	};

	const fetchPlaces = async () => {
		// let list: any = [];
		let list: any;
		if (search === "") {
			const getPlaces = await functions.httpsCallable("getPlaces");
			await getPlaces().then((res: any) => {
				list = res.data;
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
		setLoading(false);
	}, [places]);

	useEffect(() => {
		fetchPlaces();
	}, [search]);

	if (loading) {
		return (
			<div>
				<h1>Cargando</h1>
			</div>
		);
	}
	return (
		<>
			<input
				value={search}
				onChange={(e) => updateSearch(e)}
				className="search-bar shadow"
				placeholder="Buscar"
			/>
			<button onClick={clearFilters} className="clear-btn shadow-sm">
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
							key={key}
							refNumber={place.refNumber}
							id={place.id}
							name={place.name}
							available={place.available}
							range={place.range}
							type={place.type}
							lon={place.longitude}
							lat={place.latitude}
						/>
					);
				})}
			</div>
			<button
				className="load-more shadow"
				onClick={() => {
					fetchMorePlaces();
				}}
			>
				Cargar más
			</button>
		</>
	);
};

export default ExploreScreen;
