import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class UserControllers {
  static prisma: PrismaClient;

  constructor() {
    UserControllers.prisma = new PrismaClient();
  }

  public async getUsers(_req: Request, res: Response) {
    const users = await UserControllers.prisma.users.findMany();
    res.send(users);
  }

  public async index(_req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "index route",
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
