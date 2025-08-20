// controllers/eventController.js
import { Event } from '../models/index.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;
    let image_url = req.body.image_url || null;
    if (req.file) {
      image_url = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;
    }
    const ev = await Event.create({
      title,
      description,
      date,
      time,
      location,
      image_url
    });

    res.status(201).json(ev);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const listEvents = async (req, res) => {
  try {
    const items = await Event.findAll({
      order: [['date', 'DESC']]
    });
    res.json(items);
  } catch (err) {
    console.error('Error listing events:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEvent = async (req, res) => {
  try {
    const item = await Event.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const item = await Event.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    let image_url = item.image_url;
    if (req.file) {
      image_url = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;
    } else if (req.body.image_url) {
      image_url = req.body.image_url;
    }
    
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
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const item = await Event.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    await item.destroy();
    res.json({ message: 'deleted' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
