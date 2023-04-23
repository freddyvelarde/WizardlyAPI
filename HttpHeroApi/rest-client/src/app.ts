import express, { Application } from "express";
import morgan from "morgan";
import clientRoutes from "./modules/routes/clientRoutes";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  private configureRoutes(): void {
    this.app.use(clientRoutes);
  }

  public runServer(): void {
    const port = process.env.PORT || 8000;
    this.app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}

export default App;
