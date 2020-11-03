import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useParams } from "react-router";

const containerStyle = {
	width: "100%",
	height: "720px",
	paddingLeft: "20%",
	paddingRight: "20%",
};

const Map = () => {
	const [map, setMap] = React.useState(null);

	let { id, lon, lat } = useParams();
	console.log("lon " + lon, "lat " + lat);

	const center = {
		lat: parseFloat(lat),
		lng: parseFloat(lon),
	};
	return (
		<div className="map-container">
			<LoadScript googleMapsApiKey="">
				<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
					<Marker position={center} />
				</GoogleMap>
			</LoadScript>
		</div>
	);
};

export default Map;
