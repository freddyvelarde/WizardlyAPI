import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

interface CreateWorkshop {
  name: string;
  description: string;
  is_public: boolean;
}

export default class WorkshopControllers {
  private static prisma: PrismaClient = new PrismaClient();

  public async createNewWorkshopSpace(req: any, res: Response) {
    try {
      const { name, description, is_public }: CreateWorkshop = req.body;

      const newWorkshop = await WorkshopControllers.prisma.workshop.create({
        data: { name, description, author_id: req.userId, is_public },
      });

      res.status(200).json({ status: 200, data: newWorkshop, created: true });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "An error occurred while creating new workshop" });
    }
  }

  public async removeWorkshop(req: Request, res: Response) {
    try {
      const { id } = req.body;
      await WorkshopControllers.prisma.workshop.delete({
        where: { id },
      });

      res.status(200).json({ message: "Workshop was removed" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "An error occurred while removing workshop" });
    }
  }

  // public async getWorkshopByuser(req: Request & { id: number }, res: Response) {
  //   try {
  //     const workshops = await WorkshopControllers.prisma.workshop.findMany({
  //       where: { author_id: req.id },
  //     });
  //     if (workshops.length < 1) {
  //       return res
  //         .status(404)
  //         .json({ message: "No workshop added yet", status: 404 });
  //     }
  //     res.status(200).json({ status: 200, data: workshops });
  //   } catch (error) {
  //     console.log(error);
  //     return res
  //       .status(500)
  //       .json({ message: "An error occurred while getting workshops" });
  //   }
  // }
}
