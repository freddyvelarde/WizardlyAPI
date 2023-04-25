import { Application } from "express";
import { UserControllers } from "./controllers/UserControllers";

export class UserRoutes {
  private userControllers: UserControllers;

  constructor(app: Application, userControllers: UserControllers) {
    this.userControllers = userControllers;
    this.configureRoutes(app);
  }

  private configureRoutes(app: Application): void {
    app.route("/users/all").get(this.userControllers.getUsers);
    app.route("/users").get(this.userControllers.index);
    // this.router.get("/all", clientControllers.getUsers);
    // this.router.get("/", clientControllers.index);
  }
}

// export default new ClientRoutes().router;
