import { Application } from "express";
import { UserControllers } from "./controllers/UserControllers";
import JwtHandler from "../../middlewares/jwt.handler";

export class UserRoutes {
  private userControllers: UserControllers;
  private static jwtHandler: JwtHandler;

  constructor(app: Application, userControllers: UserControllers) {
    this.userControllers = userControllers;
    UserRoutes.jwtHandler = new JwtHandler();
    this.configureRoutes(app);
  }

  private configureRoutes(app: Application): void {
    app.get("/users/all", this.userControllers.getUser);
    app.get("/users", this.userControllers.index);
    app.get(
      "/user",
      UserRoutes.jwtHandler.verifyJwt,
      this.userControllers.getUser
    );

    // authentication
    app.post("/auth/signup", this.userControllers.signUp);
  }
}
