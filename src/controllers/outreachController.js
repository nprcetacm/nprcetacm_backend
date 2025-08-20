// controllers/outreachController.js
import { Outreach } from '../models/index.js';

// Create Outreach
export const createOutreach = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      heading1,
      description1,
      heading2,
      description2,
      heading3,
      description3,
      status
    } = req.body;

    const image_url = req.file ? `/${req.file.path.replace(/\\/g, '/')}` : null;

    const outreach = await Outreach.create({
      title,
      description,
      date,
      location,
      image_url,
      heading1,
      description1,
      heading2,
      description2,
      heading3,
      description3,
      status
    });

    res.json(outreach);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating outreach' });
  }
};

// List Outreach
export const listOutreach = async (req, res) => {
  try {
    const items = await Outreach.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching outreach activities' });
  }
};

// Update Outreach
export const updateOutreach = async (req, res) => {
  try {
    const item = await Outreach.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    const image_url = req.file
      ? `/${req.file.path.replace(/\\/g, '/')}`
      : req.body.image_url || item.image_url;

    await item.update({
      ...req.body,
      image_url
    });

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating outreach' });
  }
};

// Delete Outreach
export const deleteOutreach = async (req, res) => {
  try {
    const item = await Outreach.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    await item.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting outreach' });
  }
};
