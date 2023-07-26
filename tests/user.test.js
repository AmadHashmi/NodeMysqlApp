const request = require("supertest");
const app = require("../index"); // Assuming your Express app is exported from index.js
const dbConn = require("../config/db.config");
describe("User API Endpoints", () => {
  let createdUserId;

  // Test case for GET /api/v1/users
  it("should fetch all users", async () => {
    const response = await request(app).get("/api/v1/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test case for POST /api/v1/users
  it("should create a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "john@example.com",
      age: 30,
    };

    const response = await request(app).post("/api/v1/users").send(newUser);
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("User added successfully!");
    expect(response.body.data).toHaveProperty("id");
    createdUserId = response.body.data.id;
  });

  // Test case for GET /api/v1/users/:id
  it("should fetch a single user by ID", async () => {
    const response = await request(app).get(`/api/v1/users/${createdUserId}`);
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("name", "John Doe");
  });

  // Test case for PUT /api/v1/users/:id
  it("should update a user by ID", async () => {
    const updatedUser = {
      name: "Updated User",
      email: "updated@example.com",
      age: 35,
    };

    const response = await request(app)
      .put(`/api/v1/users/${createdUserId}`)
      .send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("User successfully updated");
  });

  // Test case for DELETE /api/v1/users/:id
  it("should delete a user by ID", async () => {
    const response = await request(app).delete(
      `/api/v1/users/${createdUserId}`
    );
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("User successfully deleted");
  });
});

describe("User API Endpoints - Negative Cases", () => {
  // Test case for GET /api/v1/users/:id - User Not Found
  it("should return 404 status when fetching a non-existent user by ID", async () => {
    const nonExistentUserId = 9999;
    const response = await request(app).get(
      `/api/v1/users/${nonExistentUserId}`
    );
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", true);
    expect(response.body).toHaveProperty("message", "User not found");
  });

  // Test case for PUT /api/v1/users/:id - User Not Found
  it("should return 404 status when updating a non-existent user by ID", async () => {
    const nonExistentUserId = 9999;
    const updatedUser = {
      name: "Updated User",
      email: "updated@example.com",
      age: 35,
    };
    const response = await request(app)
      .put(`/api/v1/users/${nonExistentUserId}`)
      .send(updatedUser);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", true);
    expect(response.body).toHaveProperty("message", "User not found");
  });

  // Test case for DELETE /api/v1/users/:id - User Not Found
  it("should return 404 status when deleting a non-existent user by ID", async () => {
    const nonExistentUserId = 9999;
    const response = await request(app).delete(
      `/api/v1/users/${nonExistentUserId}`
    );
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", true);
    expect(response.body).toHaveProperty("message", "User not found");
  });
});
