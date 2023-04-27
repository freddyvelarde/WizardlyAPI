import { Application } from "express";
import UsersControllers from "./controllers/usersControllers";
import JwtHandler from "../../middlewares/jwt.handler";

export default class UsersRoutes {
  private userControllers: UsersControllers;
  private static jwtHandler: JwtHandler;

  constructor(app: Application, userControllers: UsersControllers) {
    this.userControllers = userControllers;
    UsersRoutes.jwtHandler = new JwtHandler();
    this.configureRoutes(app);
  }

  private configureRoutes(app: Application): void {
    app.get("/users", this.userControllers.getAllUsers);
    app.get("/", this.userControllers.index);
    app.get(
      "/users/profile",
      UsersRoutes.jwtHandler.verifyJwt,
      this.userControllers.getProfileDataByUser
    );
    app.delete(
      "/users/remove",
      UsersRoutes.jwtHandler.verifyJwt,
      this.userControllers.removeUserProfile
    );

    // authentication
    app.post("/auth/signup", this.userControllers.signUp);
    app.post("/auth/login", this.userControllers.logIn);
  }
}
