import { Request, Response } from "express";
import BodyRequest from "../../interfaces/bodyRequest";
import { getRequest } from "./helpers/requester";

class ClientControllers {
  public hello(_req: Request, res: Response) {
    res.send({ message: "hello world" });
  }

  public async request(req: Request, res: Response) {
    try {
      const { body, headers, method, url }: BodyRequest = req.body;

      if (method === "GET") {
        const RESPONSE = await getRequest({ url, headers });
        return res.status(200).json(RESPONSE);
      }

      res.status(200).json({ message: "you only can make get requests" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new ClientControllers();
