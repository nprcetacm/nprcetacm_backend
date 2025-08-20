// routes/recentEventRoutes.js
import express from 'express';
import * as ctrl from '../controllers/recenteventController.js';
import auth from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/', ctrl.listRecentEvents);
router.get('/:id', ctrl.getRecentEvent);
router.post('/', auth, upload.single('image'), ctrl.createRecentEvent);
router.put('/:id', auth, upload.single('image'), ctrl.updateRecentEvent);
router.delete('/:id', auth, ctrl.deleteRecentEvent);

export default router;