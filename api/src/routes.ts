import { Router } from "express";
import ProducerFactory from "./lib/CreateProducer";

const routes = Router();

routes.post("/certifications", async (request, response) => {
  const producerFactory = new ProducerFactory();

  await producerFactory.start();

  await producerFactory.sendBatch(request.body);

  return response.json({ message: "Enviado para a fila" });
});

export default routes;
