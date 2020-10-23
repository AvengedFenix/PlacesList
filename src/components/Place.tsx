import React from "react";
import "../styles/Places.css";

interface Props {
	name: string;
	available: boolean;
	range: number;
	type: string;
}

const Place: React.FC<Props> = ({ name, available, range, type }) => {
	return (
		<>
			<div className="card-background">
				{type === "Parque" ? (
					<img
						id="card-icon"
						alt="Icono parque"
						src={process.env.PUBLIC_URL + "/icons/park.svg"}
					/>
				) : type === "Institucion gubernamental" ? (
					<img
						id="card-icon"
						alt="Icono oficina"
						src={process.env.PUBLIC_URL + "/icons/office.svg"}
					/>
				) : type === "Centro educativo" ? (
					<img
						id="card-icon"
						alt="Icono universidad"
						src={process.env.PUBLIC_URL + "/icons/university.svg"}
					/>
				) : type === "Centro de religion" ? (
					<img
						id="card-icon"
						alt="Icono iglesia"
						src={process.env.PUBLIC_URL + "/icons/church.svg"}
					/>
				) : type === "Colonia" ? (
					<img
						id="card-icon"
						alt="Icono colonia"
						src={process.env.PUBLIC_URL + "/icons/neighborhood.svg"}
					/>
				) : type === "Centro comercial" ? (
					<img
						id="card-icon"
						alt="Icono bolsa"
						src={process.env.PUBLIC_URL + "/icons/shop.svg"}
					/>
				) : null}
				<div id="card-divider" />
				<p className="card-title" id="card-place-type">
					{type === "Institucion gubernamental" ? "gubernamental" : type}
				</p>
				<p className="card-title" id="card-place-name">
					Nombre
				</p>
				<p className="card-info" id="card-info-name">
					{name}
				</p>
				<p className="card-title" id="card-place-radius">
					Radio
				</p>
				{available ? (
					<p className="card-info" id="card-info-radius">
						{range} M
					</p>
				) : (
					<p className="card-info" id="card-info-radius">
						No disponible
					</p>
				)}
			</div>
		</>
	);
};

export default Place;
