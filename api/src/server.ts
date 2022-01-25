import express, { NextFunction, Request, Response } from "express";
import { Kafka } from "kafkajs";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer();

app.use((request: Request, response: Response, next: NextFunction) => {
  request.producer = producer;

  return next();
});

(async () => {
  await producer.connect();
})();

app.listen(3333, () => {
  console.log("Server is running");
});
