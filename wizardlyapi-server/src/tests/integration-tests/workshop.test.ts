import request from "supertest";
import App from "../../app";

const app = new App().app;
let token: string;

const user = {
  username: "someusername",
  email: "somemail@email.com",
  password: "somepassword",
};

const newWorkshop = {
  name: "Wizardly API",
  description: "This is for my Wizardly development environment",
  is_public: false,
};

let workshopId: string;

beforeAll(async () => {
  const response = await request(app).post("/auth/signup").send(user);

  token = response.body.token;
});

afterAll(async () => {
  await request(app)
    .delete("/users/remove")
    .set("access-token", token)
    .send({ password: user.password });
});

describe("GET /workshop: Get all workshops by user", () => {
  it("should failed - missing access-token", async () => {
    const response = await request(app).get("/workshop").send();

    expect(response.body.message).toBe("you don't have any token");
    expect(response.body.access).toBe(false);
  });

  it("should return empty workshop", async () => {
    const response = await request(app)
      .get("/workshop")
      .set("access-token", token)
      .send()
      .expect(404);

    expect(response.body.message).toBe("No workshop added yet");
    expect(response.body.status).toBe(404);
  });
});

describe("POST /workshop/create", () => {
  it("Should failed for missing access-token", async () => {
    const response = await request(app)
      .post("/workshop/create")
      .send(newWorkshop);

    expect(response.body.message).toBe("you don't have any token");
    expect(response.body.access).toBe(false);
  });

  it("Should create a new workshop", async () => {
    const response = await request(app)
      .post("/workshop/create")
      .set("access-token", token)
      .send(newWorkshop)
      .expect(200);

    expect(response.body.created).toBe(true);
    expect(response.body.data.name).toBe(newWorkshop.name);
    workshopId = response.body.data.id;
  });
});

describe("DELETE /workshop/remove", () => {
  it("Should remove workshop", async () => {
    const response = await request(app)
      .delete("/workshop/remove")
      .send({ id: workshopId })
      .expect(200);

    expect(response.body.message).toBe("Workshop was removed");
  });
});
