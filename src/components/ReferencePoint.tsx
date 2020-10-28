import React from "react";

const ReferencePoint: React.FC<{
	id: string;
	name: string;
	lat: number;
  lon: number;
  number: number;
}> = ({ id, name, lat, lon, number }) => {
	// const columns = React.useMemo(() => [{ Header: ID }, { Header: Nombre }]);

	return (
		<>
			<tr>
				<td>{id}</td>
				<td>{number}</td>
				<td>{name}</td>
				<td>{lon}</td>
				<td>{lat}</td>
			</tr>
		</>
	);
};

export default ReferencePoint;
