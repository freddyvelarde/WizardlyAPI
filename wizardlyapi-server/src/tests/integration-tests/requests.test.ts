import request from "supertest";
import App from "../../app";

describe("Testing request controllers and features", () => {
  const app = new App().app;

  describe("GET /request", () => {
    it("should return no requests added yet", async () => {
      const response = await request(app).get("/request").send().expect(404);

      expect(response.body.message).toBe("There's no requests added yet");
    });
    // TODO: it("should return all requests", async () => {})
  });

  describe("POST /request/create", () => {
    it("should create a new request", async () => {});
  });
});
