import { Request, Response } from "express";
import BodyRequest from "@/interfaces/bodyRequest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ClientControllers {
  public async hello(_req: Request, res: Response) {
    // await prisma.users.create({
    //   data: {
    //     username: "eric",
    //     email: "eric@gmail.com",
    //     password: "12345",
    //   },
    // });

    const users = await prisma.users.findMany();
    res.send(users);
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
