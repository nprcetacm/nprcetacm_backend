// routes/outreachRoutes.js
import express from 'express';
import * as ctrl from '../controllers/outreachController.js';
import auth from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Public routes
router.get('/', ctrl.listOutreach);

// Protected routes
router.post('/', auth, upload.single('image'), ctrl.createOutreach);
router.put('/:id', auth, upload.single('image'), ctrl.updateOutreach);
router.delete('/:id', auth, ctrl.deleteOutreach);

export default router;
