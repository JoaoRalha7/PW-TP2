import { EducationModel } from "../models/education.model.js";

export const getAllEducation = async (req, res) => {
  try {
    const educations = await EducationModel.findAll();
    return res.json(educations);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch educations." });
  }
};

export const createEducation = async (req, res) => {
  const { startDate, endDate, degree, institution } = req.body;

  try {
    const createdEducation = await EducationModel.create({
      startDate,
      endDate,
      degree,
      institution,
    });
    return res.json(createdEducation);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create education." });
  }
};

export const updateEducation = async (req, res) => {
  const { startDate, endDate, degree, institution } = req.body;

  try {
    const education = await EducationModel.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education not found.' });
    }

    education.startDate = startDate;
    education.endDate = endDate;
    education.degree = degree;
    education.institution = institution;

    await education.save();
    return res.json(education);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update education.' });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const education = await EducationModel.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education not found.' });
    }

    await education.destroy();
    return res.json({ message: 'Education deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete education.' });
  }
};


