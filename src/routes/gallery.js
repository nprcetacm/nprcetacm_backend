import express from 'express';
import * as ctrl from '../controllers/galleryController.js';
import auth from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// GET all items
router.get('/', ctrl.listItems);

// GET single item by ID - ADD THIS ROUTE
router.get('/:id', ctrl.getItemById);

// POST new item
router.post(
  '/',
  auth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
  ]),
  ctrl.createItem
);

// PUT update item
router.put(
  '/:id',
  auth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
  ]),
  ctrl.updateItem
);

// DELETE item
router.delete('/:id', auth, ctrl.deleteItem);

export default router;