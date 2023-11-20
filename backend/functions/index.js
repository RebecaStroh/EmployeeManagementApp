const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

// Funtion to create a new data into Employee table
exports.createEmployee = onRequest((request, response) => {
  const db = admin.database();
  const {
    name,
    dob,
    cpf,
    email,
    phone,
    street,
    number,
    city,
    state,
    employmentContract,
    idDocument,
    proofOfAddress,
    schoolCurriculum,
  } = request.body;
  const ref = db.ref(`/Employee/${cpf}`);

  ref.set({
    name,
    dob,
    cpf,
    email,
    phone,
    street,
    number,
    city,
    state,
    employmentContract,
    idDocument,
    proofOfAddress,
    schoolCurriculum,
  }, (error) => {
    if (error) {
      console.error(error);
      logger.error(`User not included ${error}`, {structuredData: true});
      response.status(404).send("No data found");
    } else {
      logger.info(`User included`, {structuredData: true});
      response.status(200).send(`User included`);
    }
  });
});

// Function to get all data from Employee table
exports.getAllEmployees = onRequest((request, response) => {
  const db = admin.database();
  const ref = db.ref("/Employee");

  ref.once("value", (snapshot) => {
    const data = snapshot.val();
    const employees = [];

    if (data) {
      // Convert the data object to an array
      Object.keys(data).forEach((key) => {
        employees.push(data[key]);
      });

      response.status(200).json(employees);
    } else {
      response.status(404).send("No data found");
    }
  }, (errorObject) => {
    console.error("The read failed: " + errorObject.code);
    response.status(500).send("Internal Server Error");
  });
});
