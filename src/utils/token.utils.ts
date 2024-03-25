import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const generateToken = (user: Partial<User>): string =>
  jwt.sign(user, process.env.JWT_SECRET || 'superSecret', { expiresIn: '100d' });

export default generateToken;