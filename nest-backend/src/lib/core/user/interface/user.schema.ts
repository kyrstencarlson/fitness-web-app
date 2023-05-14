import { Document, Schema } from 'mongoose';
import { IUser } from './user.interface';

export const userSchema = new Schema({
  token: { type: String },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    name: { type: String },
    birthday: { type: Date },
  },
});

userSchema.index({ email: 1 }, { unique: true });

export type ModelUser = IUser & Document;
