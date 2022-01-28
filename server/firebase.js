const admin = require("firebase-admin");
const serviceAccount = require("../secrets/imaginate0-firebase-adminsdk-a2t1a-9566808986.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;