'use strict';

const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://asunder-aef37.firebaseio.com"
});
var db = admin.database();
var ref = db.ref('aabb');

ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

app.use(cors({origin:true}));
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',(req,res) => {
  ref.on("value", function(snapshot) {
    console.log(snapshot.val());
    res.send({'title':snapshot.val()});
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});

exports.widgets = functions.https.onRequest(warpHandler(app));















function warpHandler(handler) {
	return function cfHandlerWrapper(req,res){
	if(!req.url || !req.path) req.url = '/' + (req.url || '');

	delete req.headers['x-forwarded-proto']
	handler(req, res)
	};
}
