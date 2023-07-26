#Node.js Express API with CRUD Operations and MySQL
This is a simple Node.js Express API that provides CRUD (Create, Read, Update, Delete) operations for managing users. The API uses MySQL as the database to store user information and Jest for testing the API endpoints.

##Prerequisites
Before running this application, you need to have the following installed on your system:

Node.js: You can download and install Node.js from the official website: https://nodejs.org

MySQL: Install MySQL on your system and create a database for this project.

##Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/node-express-mysql-crud.git
cd node-express-mysql-crud
Install the dependencies:
Copy code
npm install
Database Configuration:

Open the config/db.config.js file and update the database configuration with your MySQL credentials (host, user, password, database).
##Run the Application:

sql
Copy code
npm start
The application will start, and you should see the message "Server is listening on port 3000" in the console.

##API Endpoints
The following endpoints are available in the API:

GET /api/v1/users: Fetch all users.
POST /api/v1/users: Create a new user.
GET /api/v1/users/:id: Fetch a single user by ID.
PUT /api/v1/users/:id: Update a user by ID.
DELETE /api/v1/users/:id: Delete a user by ID.
##Running Tests
The API has test cases written using Jest to ensure the endpoints are working correctly. To run the tests, use the following command:

```console
npm test
Jest will execute the test cases, and you should see the test results in the console.

Example Usage
You can use tools like Postman or cURL to interact with the API. Here are some examples:

Fetch all users:

bash
Copy code
GET http://localhost:3000/api/v1/users
Create a new user:

bash
Copy code
POST http://localhost:3000/api/v1/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
Fetch a single user by ID:

bash
Copy code
GET http://localhost:3000/api/v1/users/1
Update a user by ID:

bash
Copy code
PUT http://localhost:3000/api/v1/users/1
Content-Type: application/json

{
  "name": "Updated User",
  "email": "updated@example.com",
  "age": 35
}
Delete a user by ID:

bash
Copy code
DELETE http://localhost:3000/api/v1/users/1





