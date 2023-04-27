import request from "supertest";
import App from "../../app";

describe("UserControllers", () => {
  const app = new App().app;
  const user = {
    username: "Jhondoe",
    email: "jhon@email.com",
    password: "12345",
  };

  describe("POST /auth/signup and DELETE /users/remove", () => {
    let accessToken: string;

    it("should create a new user", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send(user)
        .expect(200);

      expect(response.body.token).toBeDefined();
      expect(response.body.data.username).toBe(user.username);
      expect(response.body.data.email).toBe(user.email);
      expect(response.body.message).toBe("User was created successfully");

      accessToken = response.body.token;
    });

    it("should return an error if the email is already used", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send(user)
        .expect(500);

      expect(response.body.message).toBe("Your email is already used");
    });

    it("Removing user", async () => {
      const response = await request(app)
        .delete("/users/remove")
        .set("access-token", accessToken)
        .send({ password: user.password });

      expect(response.body.message).toBe("User removed");
      expect(response.body.status).toBe(200);
      expect(response.status).toBe(200);
    });
    //
    // it("should return an error if the JWT token cannot be generated", async () => {
    // });
  });
});
