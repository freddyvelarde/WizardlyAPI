// import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class UserControllers {
  // private prisma: PrismaClient;

  constructor() {
    // this.prisma = prisma;
  }

  public async getUsers(_req: Request, res: Response) {
    // const users = await this.prisma.users.findMany();
    res.send("users");
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
