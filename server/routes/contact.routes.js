import  Router  from "express";
import {
  getAllContacts,
  createContact,
} from "../controllers/contact.controller.js";

const contactRoutes = Router();

// http://localhost:4242/api/contact/getAll
contactRoutes.get("/getAll", getAllContacts);
contactRoutes.post("/create", createContact);



export { contactRoutes };
