import { EWorkoutType, IEngineWorkoutDay } from '../../workouts';

export class IEngineWorkoutLogBase {
  user_id: string;
  workout: string | IEngineWorkoutDay;
  workout_month: number;
  workout_type: EWorkoutType;
  score: number;
  units: EWorkoutLogUnits;
  modality: EWorkoutLogModality;
  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

export class IEngineWorkoutLog extends IEngineWorkoutLogBase {
  workout: IEngineWorkoutDay;
}

export enum EWorkoutLogUnits {
  METERS = 'meters',
  REPS = 'reps',
  CALORIES = 'calories',
  WATTS = 'watts',
  KILOMETERS = 'kilometers',
  MILES = 'miles',
}

export enum EWorkoutLogModality {
  ROW = 'row',
  OTHER_BIKE = 'other bike',
  ASSAULT_BIKE = 'assault bike',
  ECHO_BIKE = 'echo bike',
  BIKE_ERG = 'bike erg',
  AIR_RUNNER = 'air runner',
  TREADMILL = 'treadmill',
  RUN = 'run',
  SKI = 'ski',
  SWIM = 'swim',
  OTHER = 'other',
}

export class IEngineWorkoutLogParamsCreate {
  user_id: string;
  workout: string;
  score: number;
  units: EWorkoutLogUnits;
  modality: EWorkoutLogModality;
  notes?: string;
}

export class IEngineWorkoutLogParamsUpdate {
  log_id: string;
  score?: number;
  units?: EWorkoutLogUnits;
  modality?: string;
  notes?: string;
}

export class IEngineWorkoutLogParamsModality {
  user_id: string;
  modality: EWorkoutLogModality;
  start_month?: number;
  end_month?: number;
}

export class IEngineWorkoutLogParamsModalityUnits {
  user_id: string;
  modality: EWorkoutLogModality;
  units: EWorkoutLogUnits;
  start_month?: number;
  end_month?: number;
}
