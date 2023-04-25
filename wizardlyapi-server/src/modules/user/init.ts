import { Application } from "express";
import { UserControllers } from "./controllers/UserControllers";
import { UserRoutes } from "./routes";

export class UsersModule {
  constructor(app: Application) {
    new UserRoutes(app, new UserControllers());
  }
}
