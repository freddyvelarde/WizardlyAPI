import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

export default class RequestControllers {
  private static prisma: PrismaClient = new PrismaClient();

  public async getAllRequests(_req: Request, res: Response) {
    try {
      const requests = await RequestControllers.prisma.request.findMany();

      if (requests.length < 1) {
        return res
          .status(404)
          .json({ message: "There's no requests added yet", status: 404 });
      }

      res.status(200).json({ data: requests, status: 200 });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error while getting requests" });
    }
  }

  // public async createRequest(req: Request, res: Response) => {
  //
  // }
}
