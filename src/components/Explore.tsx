import React, { useEffect, useState } from "react";
import { db } from "../services/Firebase";
import Place from "./Place";

const placesRef = db.collection("places");

const Explore = () => {
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		const fetchPlaces = async () => {
			let list: any = [];
			await placesRef.get().then((snapshot) => {
				snapshot.forEach((doc) => {
					list.push(doc.data());
				});
			});
			setPlaces(list);
		};
		console.log(places);

		fetchPlaces();
	}, []);

	return (
		<div className="container">
			{places.map((place: any, key: any) => {
				return (
					<Place
						name={place.name}
						available={place.available}
						range={place.range}
						type={place.type}
					/>
				);
			})}
		</div>
	);
};

export default Explore;
