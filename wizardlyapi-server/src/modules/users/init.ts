import { Application } from "express";
import UsersControllers from "./controllers/usersControllers";
import UsersRoutes from "./routes";

export default class UsersModule {
  constructor(app: Application) {
    new UsersRoutes(app, new UsersControllers());
  }
}
