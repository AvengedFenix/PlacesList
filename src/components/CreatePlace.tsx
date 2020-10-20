import React from "react";
import Form from "react-bootstrap/Form";

const CreatePlace = () => {
	console.log("Ugu");

	return (
		<div className="container">
			<Form>
				<Form.Group controlId="placeName">
					<Form.Label>Nombre del lugar</Form.Label>
					<Form.Control type="text" placeholder="Ingrese el nombre" />
				</Form.Group>
			</Form>
		</div>
	);
};

export default CreatePlace;
