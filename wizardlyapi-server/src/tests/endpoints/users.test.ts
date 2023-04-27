import request from "supertest";
import App from "../../app";

describe("UserControllers", () => {
  const app = new App().app;
  let accessToken: string;
  const user = {
    username: "Jhondoe",
    email: "jhon@email.com",
    password: "12345",
  };

  describe("POST /auth/signup", () => {
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
  });

  describe("POST /auth/login", () => {
    it("should log in the user successfully", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({ email: user.email, password: user.password })
        .expect(200);

      expect(response.body.auth).toBe(true);
      accessToken = response.body.token;
    });
  });

  describe("DELETE /usera/remove", () => {
    it("Removing user", async () => {
      const response = await request(app)
        .delete("/users/remove")
        .set("access-token", accessToken)
        .send({ password: user.password });

      expect(response.body.message).toBe("User removed");
      expect(response.body.status).toBe(200);
      expect(response.status).toBe(200);
    });
  });
});
