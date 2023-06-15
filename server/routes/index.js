import { Router } from 'express';

import { todoRoutes } from './todo.routes.js';
import { usersRoutes } from './user.routes.js';
import { contactRoutes } from './contact.routes.js';
import { educationRoutes } from './education.routes.js';
import { IdiomaRoutes } from './idioma.routes.js'; // Importando as rotas de idiomas
import { perfilRoutes } from './perfil.routes.js'; // Importando as rotas de perfil
import { experienceRoutes } from './experience.routes.js'; // Importando as rotas de experiência
import { skillRoutes } from './skill.routes.js'; // Importando as rotas de habilidades

const api = Router();

// Rotas relacionadas a "todo"
api.use('/todo', todoRoutes);

// Rotas relacionadas a "user"
api.use('/user', usersRoutes);

// Rotas relacionadas a "contact"
api.use('/contact', contactRoutes);

// Rotas relacionadas a "education"
api.use('/education', educationRoutes);

// Rotas relacionadas a "language"
api.use('/idioma', IdiomaRoutes);

// Rotas relacionadas a "perfil"
api.use('/perfil', perfilRoutes);

// Rotas relacionadas a "experiência"
api.use('/experience', experienceRoutes);

// Rotas relacionadas a "habilidades"
api.use('/skills', skillRoutes);

export { api };
