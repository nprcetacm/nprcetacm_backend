// models/GalleryItem.js - Gallery with multiple images and heading descriptions
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const GalleryItem = sequelize.define('GalleryItem', {
  title: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  caption: { 
    type: DataTypes.TEXT 
  },
  // Support for up to 3 images
  image_url1: { 
    type: DataTypes.STRING 
  },
  image_url2: { 
    type: DataTypes.STRING 
  },
  image_url3: { 
    type: DataTypes.STRING 
  },
  // Multiple heading-description pairs
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
}, { 
  tableName: 'gallery_items' 
});
export default GalleryItem;