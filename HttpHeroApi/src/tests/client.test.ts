import request from "supertest";
import App from "../app";

const server = new App();

describe("Testing the '/hello' endpoint", () => {
  it("It should return 'hello world'", async () => {
    const RESPONSE = await request(server.app).get("/hello");
    expect(RESPONSE.status).toBe(200);
    expect(RESPONSE.body.message).toBe("hello world");
  });
});
