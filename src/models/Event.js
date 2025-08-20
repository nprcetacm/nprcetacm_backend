// models/Event.js - Simple event model without heading descriptions
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Event = sequelize.define('Event', {
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
  }
}, { 
  tableName: 'events' 
});

export default Event;
