import request from "supertest";
import App from "../app";

describe("UserControllers", () => {
  const app = new App().app;
  const user = {
    username: "Jhondoe",
    email: "jhon@email.com",
    password: "12345",
  };

  describe("POST /signup", () => {
    it("should create a new user", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send(user)
        .expect(200);

      expect(response.body.token).toBeDefined();
      expect(response.body.data.username).toBe(user.username);
      expect(response.body.data.email).toBe(user.email);
      expect(response.body.message).toBe("User was created successfully");
    });

    it("should return an error if the email is already used", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send(user)
        .expect(500);

      expect(response.body.message).toBe("Your email is already used");
    });

    // it("should return an error if the password cannot be hashed", async () => {
    // });
    //
    // it("should return an error if the JWT token cannot be generated", async () => {
    // });
  });
});
