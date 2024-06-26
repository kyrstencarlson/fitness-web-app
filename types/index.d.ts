export class IAuthParamsLogin {
  email: string;
  password: string;
}

export class IAuthParamsRegister {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export class IAuthParamsForgotPassword {
  email: string;
}

export class IAuthParamsResetPassword {
  user_id: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export class IAuthParamsRefreshToken {
  token: string;
}

export enum EUserRoles {
  ADMIN = "admin",
  ENGINE = "engine",
  SKILLS = "skills",
  STRENGTH = "strength",
}

export enum EUserGender {
  MALE = "male",
  FEMALE = "female",
  NOT_SPECIFIED = "not specified",
}

export class IUser {
  _id: string;
  email: string;
  password: string;
  token: string;
  roles: EUserRoles[];
  profile: IUserProfile;
    engine_current_month: number;
  skills_current_month: number;
  strength_current_month: number;

  createdAt: Date;
  updatedAt: Date;
}

export class IUserProfile {
  first_name: string;
  last_name: string;
  birthday: Date;
  gender: EUserGender;
  height: number;
  weight: number;
}

export class IUserParamsCreate {
  email: string;
  password: string;
}

export class IUserParamsFindOne {
  _id?: string;
  email?: string;
  token?: string;
}

export class IUserParamsUpdate {
  _id: string;
  email?: string;
  password?: string;
  token?: string;
  roles?: IUser["roles"];
    engine_current_month?: number;
  skills_current_month?: number;
  strength_current_month?: number;

  profile?: {
    first_name?: IUserProfile["first_name"];
    last_name?: IUserProfile["last_name"];
    birthday?: IUserProfile["birthday"];
    gender?: IUserProfile["gender"];
    height?: IUserProfile["height"];
    weight?: IUserProfile["weight"];
  };
}

export class IEngineWorkoutLogBase {
  user_id: string;
  workout: string | IEngineWorkoutDay;
  workout_month: number;
  workout_type: EWorkoutType;
  score: number;
  units: EWorkoutLogUnits;
  modality: EWorkoutLogModality;
  notes?: string;

  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class IEngineWorkoutLog extends IEngineWorkoutLogBase {
  workout: IEngineWorkoutDay;
}

export class IEngineWorkoutLogFormatted extends IEngineWorkoutLogBase {
  workout: IEngineWorkoutDay;
  day: number;
}

export enum EWorkoutLogUnits {
  METERS = "meters",
  REPS = "reps",
  CALORIES = "calories",
  WATTS = "watts",
  KILOMETERS = "kilometers",
  MILES = "miles",
}

export enum EWorkoutLogModality {
  ROW = "row",
  OTHER_BIKE = "other bike",
  ASSAULT_BIKE = "assault bike",
  ECHO_BIKE = "echo bike",
  BIKE_ERG = "bike erg",
  AIR_RUNNER = "air runner",
  TREADMILL = "treadmill",
  RUN = "run",
  SKI = "ski",
  SWIM = "swim",
  OTHER = "other",
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

export type IEngineWorkoutWeek = IEngineWorkoutDay[];
export type IEngineWorkoutMonth = IEngineWorkoutDay[];

export interface IEngineWorkoutDay {
  month: number;
  week: number;
  day: number;
  type: EWorkoutType;
  phase?: number;
  phaseWeek?: number;
  phaseMonth?: number;
  workout: IWorkout[];

  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWorkout {
  title?: string;
  rounds: number | string;
  totalWork: number;
  work?: number;
  rest?: number;
  fluxWork?: number;
  setRest?: number;
  pace?: string | null;
  instruction?: string;
  comment?: string;
  stages?: IStage[];
  cycles?: ICycle[];
  bursts?: IBurst[];
}

export interface IBurst {
  initialBurst?: number;
  work: number;
  burst: number;
  locations: number[];
}

export interface ICycle {
  work: number;
  rest: number;
  pace?: string | null;
  instruction?: string;
}

export interface IDefinition {
  type: EWorkoutType;
  description: string;
  instruction?: string;
  stimuli?: string;
}

export enum EWorkoutType {
  ENDURANCE = "endurance",
  THRESHOLD = "threshold",
  MAX_AEROBIC_POWER = "max aerobic power",
  ANAEROBIC = "anaerobic",
  INTERVAL = "interval",
  TIME_TRIAL = "time trial",
  POLARIZED = "polarized",
  ROCKET_RACES = "rocket races",
  FLUX = "flux",
  HYBRID_BLOCK = "hybrid block",
  FLUX_STAGES = "flux stages",
  ASCENDING = "ascending",
  DEVOUR = "devour",
  INFINITY_BLOCK = "infinity block",
  TOWERS_BLOCK = "towers block",
  AFTERBURNERS_BLOCK = "afterburners block",
  ATOMIC_BLOCK = "atomic block",
  SYNTHESIS_BLOCK = "synthesis block",
  ASCENDING_DEVOUR = "ascending devour",
  DESCENDING_DEVOUR = "descending devour",
}

export type Month = IEngineWorkoutDay[];

export type Week = IEngineWorkoutDay[];

export type IStage = {
  //percent increase
  increase: string;
  //seconds or comment
  time: number;
  // time in seconds
  locations: number[];
};

export type IImportDay = {
  id: number;
  day: number;
  type: string;
  week: number;
  month: number;
  phase: number;
  phaseWeek: number;
  phaseMonth: number;
  blockWork: number;
  totalWork: number;
  rounds: number | string;
  work: number;
  rest: number;
  setRest: number;
  changeWorkDuration: number;
  changeRestDuration: number;
  fluxDuration: number;
  fluxPercent: number;
  numFluxStages: number;
  fluxesPerStage: number;
  increaseFluxPercent: number;
  pace: number | null;
  changePacePerInterval: number;
  initialBurst: number;
  numBurst: number;
  timeBetweenBursts: number;
  burstDuration: number;
};
