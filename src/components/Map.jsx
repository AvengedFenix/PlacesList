import React, { useEffect } from "react";
import queryString from "query-string";
import { useParams } from "react-router";
import {
	GoogleMap,
	Marker,
	withGoogleMap,
	withScriptjs,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
	withGoogleMap((props) => {
		return (
			<GoogleMap>
				defaultZoom={8}
				{/* defaultCenter={{ lat: -34.397, lng: 150.644}}} */}
				{/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}
			</GoogleMap>
		);
	})
);

const Map = () => {
	let { id } = useParams();

	useEffect(() => {
		console.log("hello map");

		//let parsed = queryString.parse(window.location.search);
		console.log(id);
	}, []);

	return (
		<div className="map-container">
			{/* <button>Hola</button> */}
			<MyMapComponent
				// isMarkerShown
				googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		</div>
	);
};

export default Map;
