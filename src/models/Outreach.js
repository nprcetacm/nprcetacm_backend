// models/Outreach.js - Outreach activities with heading descriptions
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Outreach = sequelize.define('Outreach', {
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
  location: { 
    type: DataTypes.STRING 
  },
  image_url: { 
    type: DataTypes.STRING 
  },
  // Multiple heading-description pairs for outreach activities
  heading1: { 
    type: DataTypes.STRING 
  },
  description1: { 
    type: DataTypes.TEXT 
  },
  heading2: { 
    type: DataTypes.STRING 
  },
  description2: { 
    type: DataTypes.TEXT 
  },
  heading3: { 
    type: DataTypes.STRING 
  },
  description3: { 
    type: DataTypes.TEXT 
  },
  // Status of the outreach
  status: { 
    type: DataTypes.ENUM('upcoming', 'ongoing', 'completed'), 
    defaultValue: 'upcoming' 
  },
}, { 
  tableName: 'outreach_activities' 
});

export default Outreach;