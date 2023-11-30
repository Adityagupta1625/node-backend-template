import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUI from 'swagger-ui-express'
import {swaggerSpecs} from "../config";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({ path: "../env" });

const PORT = process.env.port || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!!");
});

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

app.get("*", (req: Request, res: Response) => {
  return res.status(403).send("Sorry, the page you requested was not found.");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
})