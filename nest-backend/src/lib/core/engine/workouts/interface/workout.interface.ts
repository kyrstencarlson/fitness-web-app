export interface IEngineWorkoutDay {
  month: number;
  week: number;
  day: number;
  type: EWorkoutType;
  phase?: number;
  phaseWeek?: number;
  phaseMonth?: number;
  workout: IWorkout[];
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
  ENDURANCE = 'endurance',
  THRESHOLD = 'threshold',
  MAX_AEROBIC_POWER = 'max aerobic power',
  ANAEROBIC = 'anaerobic',
  INTERVAL = 'interval',
  TIME_TRIAL = 'time trial',
  POLARIZED = 'polarized',
  ROCKET_RACES = 'rocket races',
  FLUX = 'flux',
  HYBRID_BLOCK = 'hybrid block',
  FLUX_STAGES = 'flux stages',
  ASCENDING = 'ascending',
  DEVOUR = 'devour',
  INFINITY_BLOCK = 'infinity block',
  TOWERS_BLOCK = 'towers block',
  AFTERBURNERS_BLOCK = 'afterburners block',
  ATOMIC_BLOCK = 'atomic block',
  SYNTHESIS_BLOCK = 'synthesis block',
  ASCENDING_DEVOUR = 'ascending devour',
  DESCENDING_DEVOUR = 'descending devour',
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
