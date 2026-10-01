import {Router} from 'express';
import {create, list, remove, update} from '../controllers/todoController';
import {asyncHandler} from '../middleware/asyncHandler';
import { requireAuth } from '../middleware/requireAuth';

const router = Router();

router.use(requireAuth);

router.param('id', (req, res, next, id) => {
    if(!/^\d+$/.test(id)) {
        res.status(400).json({error: 'Invalid todo id'});
        return;
    }
    next();
});

router.post('/', asyncHandler(create));
router.get('/', asyncHandler(list));
router.patch('/:id', asyncHandler(update));
router.delete('/:id', asyncHandler(remove));

export default router;