import { Document, Schema } from 'mongoose';
import { IUser } from './user.interface';

export const userSchema = new Schema(
  {
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
    roles: [{ type: String, enum: ['admin', 'engine', 'skills', 'strength'] }],
    profile: {
      name: { type: String },
      birthday: { type: Date },
    },
  },
  {
    autoIndex: true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    strict: false,
  },
);

userSchema.index({ email: 1 }, { unique: true });

export type ModelUser = IUser & Document;
