import express, { Request, Response, Application } from "express";
import axios from "axios";
const app: Application = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send({ message: "hello world from docker" });
});

interface BodyRequest {
  url: string;
  method: string;
  body: {};
  header: {};
}

app.post("/test", (req: Request, res: Response) => {
  const { url, method, body, header }: BodyRequest = req.body;
  axios
    .get(url)
    .then((response) => res.send(response.data))
    .catch((e) => res.send(e));

  // res.send({ message: "hello world from docker" });
});

app.listen(8000, () => console.log("server running on port 8000"));
