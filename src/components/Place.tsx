import React from "react";
import "../styles/Places.css";

const Place = () => {
	return (
		<>
			<div className="card-background">
				<img id="card-icon" src={process.env.PUBLIC_URL + "/icons/park.svg"} />
				<div id="card-divider" />
				<p className="card-title" id="card-place-type">
					Colonia
				</p>
        <p className="card-title" id="card-place-name">
					Nombre
				</p>
			</div>
		</>
	);
};

export default Place;
