// models/index.js - Export all models
import Event from './Event.js';
import RecentEvents from './RecentEvents.js';
import GalleryItem from './GalleryItems.js';
import Outreach from './Outreach.js';
import Admin from './Admin.js'
import sequelize from '../config/database.js';



export {
  Event,
  RecentEvents,
  GalleryItem,
  Outreach,
  Admin,
  sequelize
};