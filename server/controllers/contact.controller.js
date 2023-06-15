import { ContactModel } from '../models/contact.model.js';

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.findAll();
    return res.json(contacts);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch contacts.' });
  }
};


export const createContact = async (req, res) => {
  const { phone, email, github, address } = req.body;

  try {
    const createdContact = await ContactModel.create({
      phone,
      email,
      github,
      address,
    });
    return res.json(createdContact);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create contact.' });
  }
};

export const updateContact = async (req, res) => {
  const { phone, email, github, address } = req.body;

  try {
    const contact = await ContactModel.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    contact.phone = phone;
    contact.email = email;
    contact.github = github;
    contact.address = address;

    await contact.save();
    return res.json(contact);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update contact.' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await ContactModel.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    await contact.destroy();
    return res.json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete contact.' });
  }
};
