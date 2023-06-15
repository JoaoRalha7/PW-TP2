import { Router } from "express";
import {
  getAllSkills,
  createSkill,
  updateSkill,

} from "../controllers/skill.controller.js";

const skillRoutes = Router();

// http://localhost:4242/api/skill/getAll
skillRoutes.get("/getAll", getAllSkills);
skillRoutes.post("/create", createSkill);
skillRoutes.put('/update/:id', updateSkill);


export { skillRoutes };
