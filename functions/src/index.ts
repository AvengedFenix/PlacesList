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
			longitude: parseFloat(split[0]),
			latitude: parseFloat(split[1]),
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

exports.deletePlace = functions.https.onCall(
	async (data: any, context: any) => {
		const id = data.id;

		await admin
			.firestore()
			.collection("places")
			.doc(id)
			.delete()
			.then(() => {
				console.log("Deleted document with ID", id);
				return "success";
			})
			.catch(() => {
				console.log("error al elimnar documento");
				return "error";
			});
	}
);

exports.editPlace = functions.https.onCall(async (data: any, context: any) => {
	const id = data.id;
	const name = data.name;
	const available = data.available;
	const range = data.range;
	const type = data.type;
	const lonLat = data.lonLat;

	console.log(
		"id",
		id,
		"name",
		name,
		"available",
		available,
		"range",
		range,
		"type",
		type,
		"lonLat",
		lonLat
	);

	let split = lonLat.split(",", 2);

	await admin
		.firestore()
		.collection("places")
		.doc(id)
		.update({
			name: name,
			available: available,
			range: range,
			type: type,
			longitude: parseFloat(split[0]),
			latitude: parseFloat(split[1]),
		})
		.then(() => {
			console.log("Updated");
			return "success";
		})
		.catch(() => {
			console.log("error al actualizar documento");
			return "error";
		});
});

exports.getReferences = functions.https.onCall(async (data: any, context: any) => {
	const id = data.id;

	let list: any = [];
	await admin
		.firestore()
		.collection("places")
		.doc(id)
		.collection("references")
		.get()
		.then((snapshot: any) => {
			snapshot.forEach((doc: any) => {
				console.log(doc.data());

				list.push(doc.data());
			});
		});

	return list;
})

exports.addReferences = functions.https.onCall(async (data: any, context: any) => {
	const id = data.id;
	const newRefLat = data.newRefLat;
	const newRefName = data.newRefName;
	let refNumber = data.refNumber;

	let strs = newRefLat.split(",", 2);
	refNumber += 1;

	const docRef = admin.firestore().collection("places").doc(id);
	docRef.update({ refNumber: refNumber });

	let refID: string = docRef.collection("references").doc().id;

	await docRef
		.collection("references")
		.doc(refID)
		.set({
			id: refID,
			refNumber: refNumber,
			name: newRefName,
			latitude: parseFloat(strs[0]),
			longitude: parseFloat(strs[1]),
		});
})

exports.deleteReference = functions.https.onCall(async (data: any, context: any) =>{
	const id = data.id;
	const refId= data.refId;

	await admin
	.firestore()
	.collection("places")
	.doc(id).collection("refereces").doc(refId)
	.delete()
	.then(() => {
		console.log("Deleted reference with ID", refId);
		return "success";
	})
	.catch(() => {
		console.log("error al elimnar referencia");
		return "error";
	});
}
})
