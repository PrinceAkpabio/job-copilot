import {Router} from 'express';
import {create, list} from '../controllers/todoController';
import {asyncHandler} from '../middleware/asyncHandler';
import { requireAuth } from '../middleware/requireAuth';

const router = Router();

router.use(requireAuth);

router.post('/create', asyncHandler(create));
router.get('/list', asyncHandler(list));

export default router;