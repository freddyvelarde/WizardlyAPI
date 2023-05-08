import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import PasswordHandler from "../../../helpers/passwordHandler";
import JwtHandler from "../../../middlewares/jwtHandler";

interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
}

export default class UsersControllers {
  private static prisma: PrismaClient = new PrismaClient();
  private static passwordHandler: PasswordHandler = new PasswordHandler();
  private static jwtHandler: JwtHandler = new JwtHandler();

  public async getProfileDataByUser(req: any, res: Response) {
    try {
      const id = req.userId;
      const user = await UsersControllers.prisma.user.findFirst({
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
      const user = await UsersControllers.prisma.user.findMany();
      if (user.length < 1) {
        return res
          .status(404)
          .json({ message: "No user added yet", statusCode: 404, data: [] });
      }
      res.status(200).json({
        data: user,
        statusCode: 200,
        message: "All user from WizardlyAPI app",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while fetching user",
        statusCode: 500,
        error: error,
      });
    }
  }

  public async signUp(req: Request, res: Response) {
    try {
      const { username, email, password }: SignUpRequestBody = req.body;

      const user = await UsersControllers.prisma.user.findFirst({
        where: { email },
      });
      if (user !== null) {
        return res
          .status(409)
          .json({ status: 409, message: "Your email is already used" });
      }

      const hashedPassword =
        await UsersControllers.passwordHandler.encryptPassword(password);

      if (hashedPassword.failed) {
        return res.status(500).json({ message: hashedPassword.message });
      }

      const newUser = await UsersControllers.prisma.user.create({
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
      });
    }
  }

  public async logIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UsersControllers.prisma.user.findFirst({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({
          message: "Your email does not exist",
          status: 404,
          auth: false,
        });
      }

      const matchPassword = await UsersControllers.passwordHandler.mathPassword(
        password,
        user.password
      );

      if (!matchPassword.validPassword) {
        return res
          .status(500)
          .json({ message: matchPassword.message, status: 500, auth: false });
      }
      const token = UsersControllers.jwtHandler.generateJWT(user.id).token;
      res.status(200).json({ token, auth: true, status: 200 });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error while Log In user", status: 500, auth: false });
    }
  }

  public async removeUserProfile(req: any, res: Response) {
    try {
      const { password } = req.body;
      const user = await UsersControllers.prisma.user.findFirst({
        where: { id: req.userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found", status: 404 });
      }

      const matchPassword = await UsersControllers.passwordHandler.mathPassword(
        password,
        user.password
      );

      if (!matchPassword.validPassword) {
        return res
          .status(500)
          .json({ message: matchPassword.message, status: 500 });
      }

      await UsersControllers.prisma.user.delete({ where: { id: req.userId } });

      res.status(200).json({
        message: "User removed",
        status: 200,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error occurred while user was removing",
        status: 500,
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
