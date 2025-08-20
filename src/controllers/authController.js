import { Admin } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({message:'Provide username and password'});

  const admin = await Admin.findOne({ where: { username } });
  if(!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, admin.password);
  if(!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.json({ token, username: admin.username });
};
