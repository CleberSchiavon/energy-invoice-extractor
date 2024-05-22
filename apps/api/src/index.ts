import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";

async function startServer() {
  const app: Express = express();
  const port = process.env.API_PORT || 3000;

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript");
  });

  app.listen(port, () => {
    console.log(`Running in port ${port}`);
  });
}

startServer().catch((error) => {
  console.error(`Error starting server: ${error}`);
  process.exit(1);
});
