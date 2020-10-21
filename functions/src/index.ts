const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();

exports.addPlace = functions.https.onRequest(async (req: any, res: any) => {
  const data = req.query.text;

  const write = await admin.firestore().collection('places').add({place: data})

  res.json({result: `Message with ID: ${write.id} added`})
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
