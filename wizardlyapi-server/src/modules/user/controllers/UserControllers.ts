import { Request, Response } from "express";

export class UserControllers {
  public async getUsers(_req: Request, res: Response) {
    res.send("all users");
  }

  public async index(_req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "index route, hello world",
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
