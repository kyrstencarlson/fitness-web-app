import { Document, Schema } from 'mongoose';
import { EUserGender, EUserRoles, IUser } from './user.interface';

export const userSchema = new Schema(
  {
    // tokens: {
    //   access_token: { type: String },
    //   refresh_token: { type: String },
    //   expires_in: { type: Number },
    // },
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
    engine_current_month: { type: Number },
    skills_current_month: { type: Number },
    strength_current_month: { type: Number },
    password: { type: String, required: true },
    roles: [{ type: String, enum: EUserRoles }],
    profile: {
      first_name: { type: String },
      last_name: { type: String },
      birthday: { type: Date },
      gender: { type: String, enum: EUserGender },
      height: { type: Number },
      weight: { type: Number },
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
