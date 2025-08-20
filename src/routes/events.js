// routes/eventRoutes.js
import express from 'express';
import * as ctrl from '../controllers/eventsController.js';
import auth from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/', ctrl.listEvents);
router.get('/:id', ctrl.getEvent);
router.post('/', auth, upload.single('image'), ctrl.createEvent);
router.put('/:id', auth, upload.single('image'), ctrl.updateEvent);
router.delete('/:id', auth, ctrl.deleteEvent);

export default router;
