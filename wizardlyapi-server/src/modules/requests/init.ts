import { Application } from "express";
import Routes from "./routes";
import RequestControllers from "./controllers/requestsController";

export default class RequestsModule {
  constructor(app: Application) {
    new Routes(app, new RequestControllers());
  }
}
