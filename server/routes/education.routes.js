import { Router } from 'express';
import { getAllEducation, createEducation, updateEducation, deleteEducation} from '../controllers/education.controller.js';


const educationRoutes = Router();

// http://localhost:4242/api/education/getAll
educationRoutes.get('/getAll', getAllEducation);
educationRoutes.post('/create',createEducation);
educationRoutes.put('/update/:id', updateEducation);
educationRoutes.delete('/delete/:id', deleteEducation);


export { educationRoutes };
