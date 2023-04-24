import { Request, Response } from "express";
import BodyRequest from "@/interfaces/bodyRequest";

class ClientControllers {
  public hello(_req: Request, res: Response) {
    res.send({ message: "hello world" });
  }

  public async request(req: Request, res: Response) {
    try {
      const { body, headers, method, url }: BodyRequest = req.body;

      res.status(200).json({
        message: "you only can make get requests",
        data: { body, headers, method, url },
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new ClientControllers();
