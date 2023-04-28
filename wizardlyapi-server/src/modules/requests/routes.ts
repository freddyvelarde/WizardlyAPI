import { Application } from "express";
import RequestControllers from "./controllers/requestsController";

export default class Routes {
  private controllers: RequestControllers;

  constructor(app: Application, controllers: RequestControllers) {
    this.controllers = controllers;
    this.configureRoutes(app);
  }

  private configureRoutes(app: Application) {
    app.get("/request", this.controllers.getAllRequests);
  }
}
