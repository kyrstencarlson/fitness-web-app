export interface Day {
  month: number;
  week: number;
  day: number;
  type: DayType;
  phase?: number;
  phaseWeek?: number;
  phaseMonth?: number;
  workout: Workout[];
}

export interface Workout {
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
  stages?: Stage[];
  cycles?: Cycle[];
  bursts?: Burst[];
}

export interface Burst {
  initialBurst?: number;
  work: number;
  burst: number;
  locations: number[];
}

export interface Cycle {
  work: number;
  rest: number;
  pace?: string | null;
  instruction?: string;
}

export interface Definition {
  type: DayType;
  description: string;
  instruction?: string;
  stimuli?: string;
}

export type DayType =
  | "endurance"
  | "threshold"
  | "max aerobic power"
  | "anaerobic"
  | "interval"
  | "time trial"
  | "polarized"
  | "rocket races"
  | "flux"
  | "hybrid block"
  | "flux stages"
  | "ascending"
  | "devour"
  | "infinity block"
  | "towers block"
  | "afterburners block"
  | "atomic block"
  | "synthesis block"
  | "ascending devour"
  | "descending devour";

export type Month = Day[];

export type Week = Day[];

export type Stage = {
  //percent increase
  increase: string;
  //seconds or comment
  time: number;
  // time in seconds
  locations: number[];
};

export type ImportDay = {
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
