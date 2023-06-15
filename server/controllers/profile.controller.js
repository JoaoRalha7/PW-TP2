// profile.controller.js

import { ProfileModel } from "../models/profile.model.js";

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.findAll();
    return res.json(profiles);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch profiles." });
  }
};

export const createProfile = async (req, res) => {
  const {description } = req.body;

  try {
    const createdProfile = await ProfileModel.create({
      description,
    });
    return res.json(createdProfile);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create profile." });
  }
};
