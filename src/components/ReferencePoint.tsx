import React, { useState } from "react";
import { functions } from "./../services/Firebase";
import { Link } from "react-router-dom";

const deleteReference = functions.httpsCallable("deleteReference");

const ReferencePoint: React.FC<{
	id: string;
	refId: string;
	name: string;
	lat: number;
	lon: number;
	number: number;
	listRemover: any;
}> = ({ id, refId, name, lat, lon, number, listRemover }) => {
	// const columns = React.useMemo(() => [{ Header: ID }, { Header: Nombre }]);
	const [myId, setMyId] = useState(id);
	const [myRefId, setMyRefId] = useState(refId);
	const [myName, setMyName] = useState(name);
	const [myLat, setMyLat] = useState(lat);
	const [myLon, setMyLon] = useState(lon);
	const [myNumber, setMyNumber] = useState(number);

	const [showButtons, setShowButtons] = useState(true);

	return (
		<>
			<tr>
				<td>{myRefId}</td>
				<td>{myNumber}</td>
				<td>{myName}</td>
				<td>{myLon}</td>
				<td>{myLat}</td>
				<td>
					{showButtons ? (
						<div className="ref-btn-container">
							<button
								onClick={() => {
									deleteReference({ id: id, refId: refId }).then(() => {
										listRemover();
										setMyRefId("Elminado");
										setMyName("Elminado");
										setMyLat(0);
										setMyLon(0);
										setMyNumber(0);
										setShowButtons(false);
									});
								}}
								className="edit-btn  delete-reference"
								id="delete-btn"
							>
								X
							</button>
							<Link to={`/maps/id=${id};lon=${lon};lat=${lat}`}>
								<button id="reference-map" className="view-map">
									Mapa
								</button>
							</Link>
						</div>
					) : null}
				</td>
			</tr>
		</>
	);
};

export default ReferencePoint;
