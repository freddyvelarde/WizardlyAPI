import { PrismaClient } from "@prisma/client";
import { User } from "../../../interfaces/user";
import { Request, Response } from "express";
import PasswordHandler from "../../../helpers/passwordHandler";
import JwtHandler from "../../../middlewares/jwt.handler";

export default class UsersControllers {
  private static prisma: PrismaClient;
  private static passwordHandler: PasswordHandler;
  private static jwtHandler: JwtHandler;

  constructor() {
    UsersControllers.prisma = new PrismaClient();
    UsersControllers.passwordHandler = new PasswordHandler();
    UsersControllers.jwtHandler = new JwtHandler();
  }

  public async getProfileDataByUser(req: any, res: Response) {
    try {
      const id = req.userId;
      const user = await UsersControllers.prisma.users.findFirst({
        where: { id },
      });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while fetching user data",
        statusCode: 500,
        error: error,
      });
    }
  }

  public async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await UsersControllers.prisma.users.findMany();
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

      // verify if user does not exist.
      const user = await UsersControllers.prisma.users.findFirst({
        where: { email },
      });
      if (user !== null) {
        return res
          .status(500)
          .json({ status: 500, message: "Your email is already used" });
      }

      // hash password
      const hashedPassword =
        await UsersControllers.passwordHandler.encryptPassword(password);

      if (hashedPassword.failed) {
        return res.status(500).json({ message: hashedPassword.message });
      }

      const newUser = await UsersControllers.prisma.users.create({
        data: {
          username,
          password: hashedPassword.hashedPassword,
          email,
        },
      });
      if (!newUser) {
        return res
          .status(500)
          .json({ status: 500, message: "error while creating user" });
      }
      // generate access token
      const tokenGenerator = UsersControllers.jwtHandler.generateJWT(
        newUser.id
      );

      if (tokenGenerator.failed) {
        return res.status(500).json({ message: tokenGenerator.message });
      }
      res.status(200).json({
        token: tokenGenerator.token,
        data: newUser,
        message: "User was created successfully",
      });
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
