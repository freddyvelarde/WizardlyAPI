import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class UserControllers {
  private static prisma: PrismaClient;

  constructor() {
    UserControllers.prisma = new PrismaClient();
  }

  public async getUsers(_req: Request, res: Response) {
    const users = await UserControllers.prisma.users.findMany();
    if (users.length < 1) {
      return res
        .status(404)
        .json({ message: "No users added yet", statusCode: 404, data: [] });
    }
    res.status(200).json({
      data: users,
      statusCode: 200,
      message: "All users from WizardlyAPI app",
    });
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
