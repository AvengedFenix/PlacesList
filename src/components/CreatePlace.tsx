import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { db } from "../services/Firebase";
import Col from "react-bootstrap/esm/Col";

import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

const addPlace = (
	name: string,
	available: boolean,
	range: number,
	type: string | null
) => {
	db.collection("places")
		.add({
			name: name,
			available: available,
			range: range,
			type: type,
		})
		.then((docRef) => {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch((err) => {
			console.error("error adding doc: ", err);
		});
};

const CreatePlace = () => {
	const [name, setName] = useState("");
	const [available, setAvailable] = useState(false);
	const [range, setRange] = useState(0);
	const [type, setType] = useState<string | null>("Seleccione un tipo");

	return (
		<div className="container form-container">
			<Form>
				<Form.Group controlId="formBasicText">
					<Form.Label>Nombre del lugar</Form.Label>
					<Form.Control
						onChange={(event) => setName(event.target.value)}
						type="text"
						placeholder="Ingrese el nombre"
					/>
				</Form.Group>
				<Form.Group controlId="formBasicCheckbox">
					<Form.Check
						defaultChecked={available}
						onClick={() => setAvailable(!available)}
						type="checkbox"
						label="Disponible"
					/>
				</Form.Group>
				<Form.Label>Radio en metros</Form.Label>
				<Form.Group as={Row} controlId="formBasicRange">
					<Col xs="7">
						<RangeSlider
							size="lg"
							value={range}
							onChange={(e) => setRange(Number(e.target.value))}
						/>
					</Col>
					<Col xs="3">
						<Form.Control
							onChange={(e) => setRange(Number(e.target.value))}
							value={range}
						/>
					</Col>
					{/* <Form.Control 
						onChange={(event) => {
							setRange(Number(event.target.value));
						}}
						type="range"
					/> */}
				</Form.Group>
				<Dropdown
					onSelect={(e) => {
						console.log(e);
						setType(e);
					}}
				>
					<Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
						{type}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item eventKey="Parque" href="#/action-1">
							Parque
						</Dropdown.Item>
						<Dropdown.Item eventKey="Colonia" href="#/action-2">
							Colonia
						</Dropdown.Item>
						<Dropdown.Item eventKey="Centro comercial" href="#/action-3">
							Centro comercial
						</Dropdown.Item>
						<Dropdown.Item
							eventKey="Institucion gubernamental"
							href="#/action-4"
						>
							Institución gubernamental
						</Dropdown.Item>
						<Dropdown.Item eventKey="Centro educativo" href="#/action-5">
							Centro educativo
						</Dropdown.Item>
						<Dropdown.Item eventKey="Centro de religion" href="#/action-6">
							Centro de religión
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<br />
				<Button
					onClick={() => addPlace(name, available, range, type)}
					variant="primary"
					type="submit"
				>
					Crear
				</Button>
			</Form>
		</div>
	);
};

export default CreatePlace;
