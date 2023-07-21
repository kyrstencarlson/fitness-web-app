import { Document, Schema } from 'mongoose';
import { IEngineWorkoutDay } from './workout.interface';

export const engineWorkoutSchema = new Schema(
  {
    month: { type: Number, required: true },
    week: { type: Number, required: true },
    day: { type: Number, required: true },
    type: { type: String, required: true },
    phase: { type: Number },
    phaseWeek: { type: Number },
    phaseMonth: { type: Number },
    workout: [
      {
        rounds: { type: Schema.Types.Mixed, required: true },
        totalWork: { type: Number, required: true },
        title: { type: String },
        work: { type: Number },
        rest: { type: Number },
        fluxWork: { type: Number },
        setRest: { type: Number },
        pace: { type: String },
        instruction: { type: String },
        comment: { type: String },
        stages: [
          {
            increase: { type: String },
            time: { type: Number },
            locations: [{ type: Number }],
          },
        ],
        cycles: [
          {
            work: { type: Number },
            rest: { type: Number },
            pace: { type: String },
            instruction: { type: String },
          },
        ],
        bursts: [
          {
            initialBurst: { type: Number },
            work: { type: Number },
            burst: { type: Number },
            locations: [{ type: Number }],
          },
        ],
      },
    ],
  },
  {
    autoIndex: true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    strict: false,
  },
);

engineWorkoutSchema.index({ day: 1 }, { unique: true });

export type ModelEngineWorkout = IEngineWorkoutDay & Document;
