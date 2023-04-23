import { Request, Response } from "express";

class ClientControllers {
  public indexRoute(_req: Request, res: Response) {
    res.send({ message: "hello world dude I am coding a OOP project" });
  }
}

export default new ClientControllers();
