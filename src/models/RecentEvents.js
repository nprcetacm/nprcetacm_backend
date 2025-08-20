// models/RecentlyConductedEvent.js - Separate model for recently conducted events
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RecentEvents = sequelize.define('RecentlyConductedEvent', {
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT 
  },
  date: { 
    type: DataTypes.DATEONLY 
  },
  time: { 
    type: DataTypes.STRING 
  },
  location: { 
    type: DataTypes.STRING 
  },
  image_url: { 
    type: DataTypes.STRING 
  },
}, { 
  tableName: 'recently_conducted_events' 
});

export default RecentEvents;