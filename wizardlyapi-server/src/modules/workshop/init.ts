import { Application } from "express";
import Routes from "./routes";
import WorkshopControllers from "./controllers/workshopControllers";

export default class WorkshopModules {
  constructor(app: Application) {
    new Routes(app, new WorkshopControllers());
  }
}
