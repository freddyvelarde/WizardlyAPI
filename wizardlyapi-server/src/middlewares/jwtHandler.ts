import { jwtSecretKey } from "../config/envVar";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

class JwtHandler {
  public generateJWT(userId: number) {
    const token = jwt.sign({ userId }, jwtSecretKey || "tokentest", {
      expiresIn: 60 * 60 * 24 * 14,
    });
    return {
      failed: false,
      message: "Token generated successfully",
      token,
    };
  }

  public verifyJwt(req: any, res: Response, next: NextFunction) {
    try {
      const token: any = req.headers["access-token"];
      if (!token) {
        res
          .status(500)
          .json({ access: false, message: "you don't have any token" });
        return;
      }
      const tokenValid: any = jwt.verify(token, jwtSecretKey || "tokentest");

      req.userId = tokenValid.userId;
      next();
    } catch (err) {
      res.send(err);
    }
  }
}

export default JwtHandler;
