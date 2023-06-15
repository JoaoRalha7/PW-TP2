import { Router } from 'express';
import { getAllInterests, createInterest} from '../controllers/interest.controller.js';


const interestRoutes = Router();

// http://localhost:4242/api/interest/getAll
interestRoutes.get('/getAll', getAllInterests);
interestRoutes.post('/create', createInterest);
export { interestRoutes };
