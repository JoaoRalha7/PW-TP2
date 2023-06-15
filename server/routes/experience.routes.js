import { Router } from "express";
import {
  getAllExperiences,
  createExperience,
} from "../controllers/experience.controller.js";

const experienceRoutes = Router();

experienceRoutes.get("/getAll", getAllExperiences);
experienceRoutes.post("/create", createExperience);

export { experienceRoutes };
