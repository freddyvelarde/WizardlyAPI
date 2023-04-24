import { Request, Response } from "express";
import BodyRequest from "../../interfaces/bodyRequest";

class ClientControllers {
  public hello(_req: Request, res: Response) {
    res.send({ message: "hello world" });
  }

  public request(req: Request, res: Response) {
    try {
      const BODY: BodyRequest = req.body;
      res.status(200).json(BODY);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new ClientControllers();
