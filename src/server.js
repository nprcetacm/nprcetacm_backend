import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

import { sequelize, Admin } from './models/index.js';

import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';
import galleryRoutes from './routes/gallery.js';
import outreachRoutes from './routes/outreach.js';
import recentevt from './routes/recentevt.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/${UPLOAD_DIR}`, express.static(path.join(__dirname, '..', UPLOAD_DIR)));


// routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/outreach', outreachRoutes);
app.use('/api/recent-events', recentevt);

const PORT = process.env.PORT || 5000;

// start
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // seed admin if not exists - use bcrypt hash from code below
    const existing = await Admin.findOne();
    if(!existing) {
      // default admin: admin / admin123  (change immediately)
      const bcrypt = await import('bcryptjs');
      const hashed = await bcrypt.hash('admin123', 10);
      await Admin.create({ username: 'admin', password: hashed });
      console.log('Created default admin: admin / admin123');
    }

    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Server/DB error', err);
  }
})();
