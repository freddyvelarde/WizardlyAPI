import { Router } from "express";
import clientControllers from "../controllers/clientControllers";

class ClientRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/hello", clientControllers.hello);
    this.router.post("/", clientControllers.request);
  }
}

export default new ClientRoutes().router;
