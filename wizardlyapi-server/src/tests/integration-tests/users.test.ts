import request from "supertest";
import App from "../../app";

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
      .expect(409);

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

  it("should failed for wrong password", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: user.email, password: "wrongpasswor" })
      .expect(500);

    expect(response.body.message).toBe(
      "You password is not valid, please try again."
    );
    expect(response.body.auth).toBe(false);
  });

  it("should failed for invalid email", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: "wrongemail@gmail.com", password: "wrongpasswor" })
      .expect(404);

    expect(response.body.message).toBe("Your email is not valid");
    expect(response.body.auth).toBe(false);
  });
});

describe("DELETE /users/remove", () => {
  it("should failed for not access-token", async () => {
    const response = await request(app)
      .delete("/users/remove")
      .send({ password: "wrongpassword" })
      .expect(500);

    expect(response.body.message).toBe("you don't have any token");
    expect(response.body.access).toBe(false);
  });

  it("should failed for not token valid", async () => {
    const response = await request(app)
      .delete("/users/remove")
      .set("access-token", "notvalidtoken")
      .send({ password: "wrongpassword" })
      .expect(200);

    expect(response.body.message).toBe("jwt malformed");
    expect(response.body.name).toBe("JsonWebTokenError");
  });

  it("should failed for wrong password passed", async () => {
    const response = await request(app)
      .delete("/users/remove")
      .set("access-token", accessToken)
      .send({ password: "wrongpassword" })
      .expect(500);

    expect(response.body.message).toBe(
      "You password is not valid, please try again."
    );
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
});
