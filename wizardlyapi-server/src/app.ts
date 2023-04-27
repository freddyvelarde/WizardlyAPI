import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import UsersModules from "./modules/users/init";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.initModules();
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }

  private initModules() {
    new UsersModules(this.app);
  }

  public runServer(): void {
    const port = process.env.PORT || 8000;
    this.app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}

export default App;
