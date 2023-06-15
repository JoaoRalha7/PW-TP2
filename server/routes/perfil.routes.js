import { Router } from "express";
import {
  getAllProfiles,
  createProfile,
} from "../controllers/profile.controller.js";

const perfilRoutes = Router();

perfilRoutes.get("/getAll", getAllProfiles);
perfilRoutes.post("/create", createProfile);

export { perfilRoutes };
