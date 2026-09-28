import {Router} from 'express';
import {register} from '../controllers/authController';
import {asyncHandler} from '../middleware/asyncHandler';


const router = Router();

router.post('/register', asyncHandler(register));

export default router;