const functions = require("firebase-functions");

const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.addPlace = functions.https.onRequest((req: any, res: any) => {
  console.log("Hello there");
  
	// cors(req, res, async () => {
	// 	res.set("Access-Control-Allow-Origin", "*");
	// 	res.set("Access-Control-Allow-Credentials", "true");
	// 	res.set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
	// 	res.set("Access-Control-Allow-Headers", "*");
	// 	res.set("Access-Control-Max-Age", "3600");

	// 	if (req.method === "OPTIONS") {
	// 		res.end();
	// 	} else {
	// 		const name = req.query.name;
	// 		const available = req.query.available;
	// 		const range = req.query.range;
	// 		const type = req.query.type;

	// 		const write = await admin
	// 			.firestore()
	// 			.collection("places")
	// 			.add({ name: name, available: available, range: range, type: type });

	// 		res.json({ result: `Message with ID: ${write.id} added` });
	// 	}
	// });
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
