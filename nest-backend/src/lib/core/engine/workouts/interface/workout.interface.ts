export interface IEngineWorkoutDay {
  month: number;
  week: number;
  day: number;
  type: IDayType;
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
  type: IDayType;
  description: string;
  instruction?: string;
  stimuli?: string;
}

export type IDayType =
  | 'endurance'
  | 'threshold'
  | 'max aerobic power'
  | 'anaerobic'
  | 'interval'
  | 'time trial'
  | 'polarized'
  | 'rocket races'
  | 'flux'
  | 'hybrid block'
  | 'flux stages'
  | 'ascending'
  | 'devour'
  | 'infinity block'
  | 'towers block'
  | 'afterburners block'
  | 'atomic block'
  | 'synthesis block'
  | 'ascending devour'
  | 'descending devour';

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
