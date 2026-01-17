import { Router } from 'express';

import { HotspotController } from '../controllers/HotspotController';

const router = Router();

router.post('/hotspot/users', HotspotController.createUser);
router.get('/hotspot/users', HotspotController.listUsers);

export default router;
