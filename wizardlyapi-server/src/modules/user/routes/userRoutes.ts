import { Router } from "express";
import clientControllers from "../controllers/UserControllers";

class ClientRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/all", clientControllers.getUsers);
    this.router.get("/", clientControllers.index);
  }
}

export default new ClientRoutes().router;
