import React from "react";
import { functions } from "./../services/Firebase";

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

	return (
		<>
			<tr>
				<td>{refId}</td>
				<td>{number}</td>
				<td>{name}</td>
				<td>{lon}</td>
				<td>{lat}</td>
				<td>
					<button
						onClick={() => {
							deleteReference({ id: id, refId: refId });
							listRemover();
						}}
						className="edit-btn"
						id="delete-btn"
					>
						X
					</button>
				</td>
			</tr>
		</>
	);
};

export default ReferencePoint;
