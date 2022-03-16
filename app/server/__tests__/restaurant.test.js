const request = require("supertest");

const app = require("../app");

describe("GET /restaurant", () => {
    test("It should respond with an array of restaurants", async () => {
      const response = await request(app).get("/restaurant");
      expect(response.statusCode).toBe(200);
    });
  });