// controllers/recentEventsController.js
import { RecentEvents } from '../models/index.js';

export const createRecentEvent = async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;
    const image_url = req.file
      ? `/${req.file.path.replace(/\\/g, '/')}`
      : req.body.image_url || null;

    const event = await RecentEvents.create({
      title,
      description,
      date,
      time,
      location,
      image_url
    });

    res.status(201).json(event);
  } catch (err) {
    console.error('Error creating recent event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const listRecentEvents = async (req, res) => {
  try {
    const items = await RecentEvents.findAll({
      order: [['date', 'DESC']]
    });
    res.json(items);
  } catch (err) {
    console.error('Error listing recent events:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRecentEvent = async (req, res) => {
  try {
    const item = await RecentEvents.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error('Error fetching recent event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateRecentEvent = async (req, res) => {
  try {
    const item = await RecentEvents.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    const image_url = req.file
      ? `/${req.file.path.replace(/\\/g, '/')}`
      : req.body.image_url || item.image_url;

    await item.update({
      title: req.body.title ?? item.title,
      description: req.body.description ?? item.description,
      date: req.body.date ?? item.date,
      time: req.body.time ?? item.time,
      location: req.body.location ?? item.location,
      image_url
    });

    res.json(item);
  } catch (err) {
    console.error('Error updating recent event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteRecentEvent = async (req, res) => {
  try {
    const item = await RecentEvents.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    await item.destroy();
    res.json({ message: 'deleted' });
  } catch (err) {
    console.error('Error deleting recent event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
