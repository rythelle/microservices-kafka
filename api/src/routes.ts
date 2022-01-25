import { Router } from "express";

const routes = Router();

routes.post("/certifications", (request, response) => {
  return response.json({ message: "Olá!!" });
});

export default routes;
