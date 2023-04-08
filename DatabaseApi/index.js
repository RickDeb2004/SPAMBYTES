/* eslint-disable no-empty */
/* eslint-disable indent */
const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin=require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express=require("express");
const cors=require("cors");
const app=express();

app.use(cors({origin: true}));
const db =admin.firestore();
app.get("/", (req, res)=>{
  return res.status(200).send("hey");
});

app.post("/api/call", (req, res)=>{
  (async ()=>{
    try {
        await db.collection("biddingAct").doc(`/${Date.now()}/`).create({
            id: Date.now(),
            name: req.body.name,   
            price: req.body.price,

        });

        return res.status(200).send({status: "Sucess", msg: "Data saved"});
} catch (error) {
    console.log(error);
    return res.status(500).send({status: "Failed", msg: error});
}
})();
});

app.get("/api/get/:id", (req, res)=>{
    (async ()=>{
        try {
           const reqDoc=db.collection("biddingAct").doc(req.params.id);
           const productDetail=await reqDoc.get();
           const response = productDetail.data();

            return res.status(200).send({status: "Sucess", msg: response});
    } catch (error) {
        console.log(error);
        return res.status(500).send({status: "Failed", msg: error});
}
    })();
});
exports.app=functions.https.onRequest(app);