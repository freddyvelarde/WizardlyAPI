import env from "dotenv";
env.config();

export const jwtSecretKey = process.env.JWT_SECRET_KEY;
