import { Application } from "express";
import WorkshopControllers from "./controllers/workshopControllers";
import JwtHandler from "../../middlewares/jwtHandler";

export default class Routes {
  private workshopControllers: WorkshopControllers;
  private static jwtHandler: JwtHandler = new JwtHandler();

  constructor(app: Application, workshopControllers: WorkshopControllers) {
    this.workshopControllers = workshopControllers;
    this.configureRoutes(app);
  }

  private configureRoutes(app: Application) {
    // app.get(
    //   "/workshop",
    //   Routes.jwtHandler.verifyJwt,
    //   this.workshopControllers.getWorkshopByuser
    // );
    app.post(
      "/workshop/create",
      Routes.jwtHandler.verifyJwt,
      this.workshopControllers.createNewWorkshopSpace
    );
    app.delete("/workshop/remove", this.workshopControllers.removeWorkshop);
  }
}
