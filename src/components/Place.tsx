import React from "react";
import "../styles/Places.css";

const Place = () => {
	return (
		<>
			<div className="card-background">
				<img
					alt="park icon"
					id="card-icon"
					src={process.env.PUBLIC_URL + "/icons/park.svg"}
				/>
				<div id="card-divider" />
				<p className="card-title" id="card-place-type">
					Colonia
				</p>
				<p className="card-title" id="card-place-name">
					Nombre
				</p>
				<p className="card-info" id="card-info-name">
					The Hood
				</p>
				<p className="card-title" id="card-place-radius">
					Radio
				</p>
				<p className="card-info" id="card-info-radius">
					1000 M
				</p>
			</div>
		</>
	);
};

export default Place;
