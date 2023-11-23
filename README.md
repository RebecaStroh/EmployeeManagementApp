# Iron Mountain Employee Onboarding System

## Description

The Iron Mountain Employee Onboarding System is a sophisticated and user-friendly software application designed to streamline the employee onboarding process. This system allows new employees to easily submit their personal data and required documents for their employment contracts. The application is tailored to meet the needs of HR departments, ensuring efficient data handling and document management.

### Features

- **User-Friendly Interface**: The application boasts a responsive and intuitive UI, making it easy for new employees to navigate and submit their information.

- **Employee Registration**: A dedicated section for new employees to enter their personal details, including Name, Date of Birth, CPF, Email, Cellphone Number, and Address. The system also allows for the upload of essential documents such as Employment Contracts, CPF/RG, Proof of Address, and School Curriculum in PDF format.

- **Search and Display Functionality**: HR staff can search for employees using metadata fields and document types. The system displays a comprehensive list of all registered employees, with the ability to view detailed information and documents.

# Getting Started

## Dependencies

This project requires Firebase. To install it, run the following command:

```bash
npm install -g firebase-tools
```

## Project Setup

### Backend

To set up and run the backend of the app, follow these steps:

1. Navigate to the backend folder:
   ```bash
   cd EmployeeManagementApp-develop\backend\functions
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the Firebase emulator:
   ```bash
   firebase emulators:start
   ```

### Frontend

To set up and run the frontend of the app, follow these steps:

1. Navigate to the frontend folder:
   ```bash
   cd EmployeeManagementApp-develop\frontend\employee-management-app
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

# System Architecture

This project follows a microservices-based architecture, utilizing modern technologies to provide an efficient and scalable system. Below, we detail the key components of the architecture.

## Frontend

- **Technology:** React
- **Hosting:** Firebase Hosting
- **Characteristics:** 
  - The frontend is developed using React, a JavaScript library for building user interfaces.
  - Hosted on Firebase Hosting, the frontend is completely serverless, offering high availability and scalability.
  - Communication with backend services is performed through calls to Cloud Functions.

## Backend

### Cloud Functions

- **Function:** 
  - Cloud Functions are used for server-side operations such as data processing and integration with other services.
  - They act as an intermediary layer between the frontend and the database, managing requests and responses.

### Realtime Database

- **Function:** 
  - The Firebase Realtime Database is used for storing and synchronizing data in real-time.
  - This NoSQL database allows for efficient and real-time communication with the frontend.

### Firebase Storage

- **Function:** 
  - Used for storing files.
  - Provides a robust and secure solution for file storage and retrieval.

## Integration and Data Flow

- The frontend, developed in React, makes requests to Cloud Functions.
- Cloud Functions process these requests, interacting with the Realtime Database to retrieve or store data.
- Firebase Storage is used to manage files and media related to employees.
- All communication and data transfer is done securely and optimized for performance.

---

This architecture is designed with scalability, easy maintenance, and system efficiency in mind, ensuring a smooth and responsive user experience. Additionally, the choice of technologies and the serverless approach enable rapid development and deployment, significantly reducing the time-to-market for new features and updates.



## Technical Debt

### Context
The project was developed in one week as part of a job interview process. Due to this time constraint, some essential practices and functionalities were omitted or simplified.

### Authentication and Authorization:

**Current Problem:** Currently, all functions and file storage are public, posing a significant security risk.

**Solution:** Implement a robust authentication and authorization system. This may include integrating with third-party authentication services (such as Auth0) or utilizing Firebase authentication features.

### Access Control and Data Security:

**Current Problem:** The absence of proper access controls can lead to unauthorized access to sensitive employee information.

**Solution:** Establish role-based access control policies, ensuring that users only access the data necessary for their roles and responsibilities.