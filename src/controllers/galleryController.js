// controllers/galleryController.js
import { GalleryItem } from '../models/index.js';

export const createItem = async (req, res) => {
  try {
    const {
      title,
      caption,
      heading1,
      description1,
      heading2,
      description2,
      heading3,
      description3
    } = req.body;
    // Handle multiple uploaded files (up to 3)
    const image_url1 = req.files?.image1
      ? `/${req.files.image1[0].path.replace(/\\/g, '/')}`
      : null;
    const image_url2 = req.files?.image2
      ? `/${req.files.image2[0].path.replace(/\\/g, '/')}`
      : null;
    const image_url3 = req.files?.image3
      ? `/${req.files.image3[0].path.replace(/\\/g, '/')}`
      : null;
    const item = await GalleryItem.create({
      title,
      caption,
      heading1,
      description1,
      heading2,
      description2,
      heading3,
      description3,
      image_url1,
      image_url2,
      image_url3
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listItems = async (req, res) => {
  try {
    const items = await GalleryItem.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD THIS FUNCTION - Missing from your controller
export const getItemById = async (req, res) => {
  try {
    const item = await GalleryItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    const updates = { ...req.body };
    // Update images if uploaded, else keep existing
    if (req.files?.image1)
      updates.image_url1 = `/${req.files.image1[0].path.replace(/\\/g, '/')}`;
    if (req.files?.image2)
      updates.image_url2 = `/${req.files.image2[0].path.replace(/\\/g, '/')}`;
    if (req.files?.image3)
      updates.image_url3 = `/${req.files.image3[0].path.replace(/\\/g, '/')}`;
    await item.update(updates);
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};