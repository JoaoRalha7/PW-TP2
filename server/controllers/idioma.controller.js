import { IdiomaModel } from '../models/idioma.model.js';

export const getAllLanguages = async (req, res) => {
  try {
    const languages = await IdiomaModel.findAll();
    return res.json(languages);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch languages.' });
  }
};

export const createLanguage = async (req, res) => {
  const { name, percent } = req.body;

  try {
    const createdLanguage = await IdiomaModel.create({
      name,
      percent,
    });
    return res.json(createdLanguage);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create language.' });
  }
};

export const deleteLanguage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLanguage = await IdiomaModel.destroy({
      where: { id },
    });

    if (deletedLanguage === 0) {
      return res.status(404).json({ error: 'Language not found' });
    }

    return res.json({ message: 'Language deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete language' });
  }
};
