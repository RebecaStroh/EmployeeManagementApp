const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

// Funtion to create a new data into Employee table
exports.createEmployee = onRequest((request, response) => {
  const db = admin.database();
  const {name, cpf} = request.body;
  const ref = db.ref(`/Employee/${cpf}`);

  ref.set({
    name,
    cpf,
  }, (error) => {
    if (error) {
      console.error(error);
      logger.error(`User not included ${error}`, {structuredData: true});
      response.send(500);
    } else {
      logger.info(`User included`, {structuredData: true});
      response.send(200);
    }
  });
});
