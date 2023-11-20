const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

// Funtion to create a new data into Employee table
exports.createEmployee = onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Credentials", "true");

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "POST, GET");
    response.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
    );
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  } else {
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

    const db = admin.database();
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
  }
});

// Function to get all data from Employee table
exports.getAllEmployees = onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Credentials", "true");

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "POST, GET");
    response.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
    );
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  } else {
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
  }
});
