const functions = require("firebase-functions");

const admin = require("firebase-admin");
const fieldValue = require("firebase-admin").firestore.FieldValue;
// const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.addPlace = functions.https.onCall((data: any, context: any) => {
	console.log("Hello there");
	console.log("General Kenobi");

	const name = data.name;
	const available = data.available;
	const range = data.range;
	const type = data.type;
	const lonLat = data.lonLat;

	let split = lonLat.split(",", 2);

	let id = admin.firestore().collection("places").doc().id;
	admin
		.firestore()
		.collection("places")
		.doc(id)
		.set({
			id: id,
			name: name,
			available: available,
			range: range,
			type: type,
			refNumber: 0,
			longitude: split[0],
			latitude: split[1],
			created: fieldValue.serverTimestamp(),
		})
		.then(() => {
			console.log("Document written with ID: ", id);
		})
		.catch((err: any) => {
			console.error("error adding doc: ", err);
		});
});

exports.getPlaces = functions.https.onCall(async (data: any, context: any) => {
	let list: any = [];

	await admin
		.firestore()
		.collection("places")
		.orderBy("created", "desc")
		.limit(9)
		.get()
		.then((snapshot: any) => {
			snapshot.forEach((doc: any) => {
				list.push(doc.data());
			});
		});
	//console.log(list);

	return list;
});

exports.getMorePlaces = functions.https.onCall(
	async (data: any, context: any) => {
		let list: any = [];
		const lastVisible = data.lastVisible;
		console.log(lastVisible);
		
		await admin
			.firestore()
			.collection("places")
			.orderBy("created", "desc")
			.startAfter(lastVisible)
			.limit(9)
			.get()
			.then((snapshot: any) => {
				snapshot.forEach((doc: any) => {
					list.push(doc.data());
				});
			});

		return list;
	}
);
