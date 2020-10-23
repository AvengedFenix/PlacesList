import React from "react";
import { db } from "../services/Firebase";
import Place from "./Place";

const placesRef = db.collection("places");

class Explore extends React.Component<{}, { places: any }> {
	constructor(props: any) {
		super(props);
		this.state = {
			places: [],
		};
	}

	async componentDidMount() {
		let data: any = [];
		await placesRef
			.limit(1)
			.get()
			.then((sp) => {
				sp.forEach((doc) => {
					data.push(doc);
					console.log(doc.id, "=>", doc.data());
				});
			});
		this.setState({ places: data });
	}

	render() {
		return (
			<div className="container">
				{this.state.places.map((place: any, i: number) => {
					return <Place />;
				})}
			</div>
		);
	}
}

export default Explore;
