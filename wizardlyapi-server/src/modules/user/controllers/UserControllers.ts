import { PrismaClient } from "@prisma/client";
import { jwtSecretKey } from "../../../config/envVar";
import { User } from "../../../interfaces/user";
import { Request, Response } from "express";

export class UserControllers {
  private static prisma: PrismaClient;

  constructor() {
    UserControllers.prisma = new PrismaClient();
  }

  public async getUsers(_req: Request, res: Response) {
    try {
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
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while fetching users",
        statusCode: 500,
        error: error,
      });
    }
  }

  public async signUp(req: Request, res: Response) {
    try {
      const { username, email, password }: User = req.body;
      const key = jwtSecretKey;

      // verify if user does not exist.
      // hash password
      // save data
      // generate access token

      // UserControllers.prisma.users.create({data: {}});

      res.json({ key, message: "fsdf" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while creating user, please try again.",
        statuscode: 500,
        data: [],
      });
    }
  }

  public async index(_req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "index route",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
}
