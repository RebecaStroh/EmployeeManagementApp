const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

const bb = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");
const stringSimilarity = require("string-similarity");

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
    const busboy = bb({headers: request.headers});
    const tmpdir = os.tmpdir();
    const bucket = admin.storage().bucket();

    // Create the objects which will accumulate all the content sent.
    const employee = {};
    const uploads = {};

    // Process each field.
    busboy.on("field", (fieldname, val) => {
      console.log(`Processed field ${fieldname}: ${val}.`);
      employee[fieldname] = val;
    });

    // Process each file uploaded.
    const fileWrites = [];
    busboy.on("file", (fieldname, file, {filename, mimeType}) => {
      // Note: os.tmpdir() points to an in-memory file system on GCF
      // Thus, any files in it must fit in the instance's memory.
      console.log(`Processed file ${filename}`);
      const filepath = path.join(tmpdir, filename);
      uploads[fieldname] = filepath;

      const writeStream = fs.createWriteStream(filepath);
      file.pipe(writeStream);

      // File was processed by Busboy; wait for it to be written.
      const promise = new Promise((resolve, reject) => {
        file.on("end", () => {
          writeStream.end();
        });
        writeStream.on("close", async () => {
          if (!employee || !employee.cpf) {
            reject(new Error("No cpf related"));
            return;
          }
          try {
            // Upload the file to Firebase Storage
            const fileBuffer = fs.readFileSync(filepath);
            // Creates a folder for the User with his CPF
            const fileUpload = bucket.file(`${employee.cpf}/${fieldname}`);
            await fileUpload.save(fileBuffer, {
              metadata: {
                contentType: mimeType,
              },
            });
            console.log(`File uploaded to Firebase Storage: ${fieldname}`);

            // Get the download URL
            employee[fieldname] = `https://storage.cloud.google.com/employeemanagementapp-767af.appspot.com/${employee.cpf}/${fieldname}`;

            resolve();
          } catch (error) {
            reject(error);
          }
        });
        writeStream.on("error", reject);
      });
      fileWrites.push(promise);
    });

    // Triggered once all uploaded files are processed by Busboy.
    // We still need to wait for the disk writes (saves) to complete.
    busboy.on("finish", async () => {
      await Promise.all(fileWrites);

      // Delete the temporary local file
      const uploadKeys = Object.keys(uploads);
      for (const file of uploadKeys) {
        fs.unlinkSync(uploads[file]);
      }

      // Checks if a cpf, the id, was sent
      if (!employee || !employee.cpf) {
        response.status(404).send("No cpf sent");
        return;
      }

      // Create or Get employee instance
      const db = admin.database();
      const ref = db.ref(`/Employee/${employee.cpf}`);

      // Checks if it is a change
      if (employee.edit) {
        // Check if the employee exists in the database
        ref.once("value", (snapshot) => {
          const exists = snapshot.exists();

          if (exists) {
            // Create employee instance
            const db = admin.database();
            const ref = db.ref(`/Employee/${employee.cpf}`);

            // Overwrite data
            ref.set(employee, (error) => {
              if (error) {
                console.error(error);
                logger.error(`Not included ${error}`, {structuredData: true});
                response.status(404).send("No data found");
              } else {
                logger.info(`Employee included`, {structuredData: true});
                response.status(200).send(employee);
              }
            });
          } else {
            response.status(404).send("Employee not found");
          }
        });
        return;
      }

      // Set new data
      ref.once("value", (snapshot) => {
        if (snapshot.exists()) {
          // Data for the given CPF already exists, handle accordingly
          response.status(400).send("Employee data already exists");
        } else {
          ref.set(employee, (error) => {
            if (error) {
              console.error(error);
              logger.error(`Not included ${error}`, {structuredData: true});
              response.status(404).send("No data found");
            } else {
              logger.info(`Employee included`, {structuredData: true});
              response.status(200).send(employee);
            }
          });
        }
      });
    });

    busboy.end(request.rawBody);
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
    const {searchTerm} = request.body;

    const db = admin.database();
    const ref = db.ref("/Employee");

    ref.once("value", (snapshot) => {
      const data = snapshot.val();
      const employees = [];

      if (data) {
        // Convert the data object to an array
        if ("cpf" in data) {
          // Check if there is any searchTerm
          if (searchTerm === "") {
            employees.push(data);
          } else {
            // Filter by calculating the Jaccard similarity
            Object.keys(data).forEach((attr) => {
              const similarity = stringSimilarity
                  .compareTwoStrings(searchTerm.toLowerCase(),
                      data[attr].toLowerCase());
              const similarityThreshold = 0.4;

              if (similarity >= similarityThreshold) {
                employees.push(data);
                return;
              }
            });
          }
        } else {
          // Go througt the result array
          Object.keys(data).forEach((key) => {
            // Check if there is any searchTerm
            if (searchTerm === "") {
              employees.push(data[key]);
            } else {
              let bestSimilarity = 0;
              // Get similiarity by calculating the Jaccard similarity
              Object.keys(data[key]).forEach((attr) => {
                const similarity = stringSimilarity
                    .compareTwoStrings(searchTerm.toLowerCase(),
                        data[key][attr].toLowerCase());

                if (bestSimilarity < similarity) {
                  bestSimilarity = similarity;
                }
              });

              if (bestSimilarity > 0.1) {
                data[key].similarity = bestSimilarity;
                employees.push(data[key]);
              }
            }
          });

          employees.sort((a, b) => b.similarity - a.similarity);
        }

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


// Function to delete one employee from database
exports.deleteEmployee = onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Credentials", "true");

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "DELETE");
    response.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
    );
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  } else {
    // Obtenha o CPF do parâmetro da solicitação
    const cpf = request.body.cpf;

    // Verifique se o CPF é válido
    if (!cpf) {
      return response.status(400).send("Invalid CPF");
    }

    const db = admin.database();
    const ref = db.ref(`/Employee/${cpf}`);

    // Verifique se o funcionário existe
    ref.once("value", (snapshot) => {
      if (!snapshot.exists()) {
        return response.status(404).send("Employee not found");
      }

      // Exclua o funcionário
      ref.remove((error) => {
        if (error) {
          console.error(error);
          return response.status(500).send("Internal Server Error");
        } else {
          return response.status(200).send("Employee deleted successfully");
        }
      });
    });
  }
});
