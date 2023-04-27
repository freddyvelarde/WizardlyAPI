import { Application } from "express";
import UsersControllers from "./controllers/UsersControllers";
import UsersRoutes from "./routes";

export default class UsersModule {
  constructor(app: Application) {
    new UsersRoutes(app, new UsersControllers());
  }
}
