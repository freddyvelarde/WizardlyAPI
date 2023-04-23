import { Router, Request, Response } from "express";

class ClientRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/", (_req: Request, res: Response) => {
      res.send({ message: "hello world from docker and OOP" });
    });
  }
}

export default new ClientRoutes().router;
