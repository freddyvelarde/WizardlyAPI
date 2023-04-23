import { Router } from "express";
import clientControllers from "../controllers/clientControllers";

class ClientRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/", clientControllers.indexRoute);
  }
}

export default new ClientRoutes().router;
