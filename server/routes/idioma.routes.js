import { Router } from 'express';
import { getAllLanguages, createLanguage, deleteLanguage} from '../controllers/idioma.controller.js';

const IdiomaRoutes = Router();

IdiomaRoutes.get('/getAll',getAllLanguages);
IdiomaRoutes.post('/create',createLanguage);
IdiomaRoutes.delete("/delete/:id", deleteLanguage);


export { IdiomaRoutes };
