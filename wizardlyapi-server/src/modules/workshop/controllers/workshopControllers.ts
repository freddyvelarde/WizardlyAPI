import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export default class WorkshopControllers {
  private static prisma: PrismaClient = new PrismaClient();

  public async getWorkshopByuser(_req: Request, res: Response) {
    try {
      const workshops = await WorkshopControllers.prisma.workshop.findMany();
      if (workshops.length < 1) {
        return res
          .status(404)
          .json({ message: "No workshop added yet", status: 404 });
      }
      res.status(200).json({ status: 200, data: workshops });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "An error occurred while getting workshops" });
    }
  }
}
