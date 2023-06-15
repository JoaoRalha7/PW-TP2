// experience.controller.js

import { ExperienceModel } from "../models/experience.model.js";

export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await ExperienceModel.findAll();
    return res.json(experiences);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch experiences." });
  }
};

export const createExperience = async (req, res) => {
  const { startDate, endDate, companyName, position, description } = req.body;


    const createdExperience = await ExperienceModel.create({
      startDate,
      endDate,
      companyName,
      position,
      description,
    });
    return res.json(createdExperience);
  }

