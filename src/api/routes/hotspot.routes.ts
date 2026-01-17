import { Router } from 'express';

import { HotspotController } from '../controllers/HotspotController';

const router = Router();

router.post('/hotspot/users', HotspotController.create);
router.get('/hotspot/users', HotspotController.list);
router.delete('/hotspot/users/:id', HotspotController.remove);

export default router;
