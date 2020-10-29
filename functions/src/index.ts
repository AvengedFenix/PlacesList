const functions = require("firebase-functions");

const admin = require("firebase-admin");
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
	admin.firestore().collection("places")
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
		})
		.then(() => {
			console.log("Document written with ID: ", id);
		})
		.catch((err: any) => {
			console.error("error adding doc: ", err);
		});
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
