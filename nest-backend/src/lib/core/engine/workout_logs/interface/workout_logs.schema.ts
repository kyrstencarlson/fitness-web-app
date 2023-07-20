import { Document, Schema } from 'mongoose';
import { USER_SCHEMA_NAME } from 'src/lib/core/user';
import { WORKOUT_SCHEMA_NAME } from '../../workouts';
import {
  EWorkoutLogModality,
  EWorkoutLogUnits,
  IEngineWorkoutLog,
} from './workout_logs.interface';

export const engineWorkoutLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: USER_SCHEMA_NAME,
    },
    workout: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: WORKOUT_SCHEMA_NAME,
    },
    workout_month: { type: Number, required: true },
    workout_type: { type: String, required: true },
    score: { type: Number, required: true },
    units: { type: String, enum: EWorkoutLogUnits, required: true },
    modality: { type: String, enum: EWorkoutLogModality, required: true },
    notes: { type: String },
  },
  {
    autoIndex: true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    strict: false,
  },
);

engineWorkoutLogSchema.index({ day: 1 }, { unique: true });

export type ModelEngineWorkoutLog = IEngineWorkoutLog & Document;
