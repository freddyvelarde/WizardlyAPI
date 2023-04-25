import { Application } from "express";
import { UserControllers } from "./controllers/UserControllers";
import { UserRoutes } from "./routes";

export class UsersModule {
  public routes: UserRoutes;

  constructor(app: Application) {
    this.routes = new UserRoutes(app, new UserControllers());
  }
}
