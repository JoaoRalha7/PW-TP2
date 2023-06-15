// skill.controller.js

import { SkillModel } from "../models/skill.model.js";

export const getAllSkills = async (req, res) => {
  try {
    const skills = await SkillModel.findAll();
    return res.json(skills);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch skills." });
  }
};

export const createSkill = async (req, res) => {
  const { name, percent } = req.body;

  try {
    const createdSkill = await SkillModel.create({
      name,
      percent,
    });
    return res.json(createdSkill);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create skill." });
  }
};



export const updateSkill = async (req, res) => {
  const { percent } = req.body;

  try {
    const skill = await SkillModel.findByPk(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found.' });
    }

    skill.percent = percent;

    await skill.save();
    return res.json(skill);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update skill.' });
  }
};
