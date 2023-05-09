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
  //seconds
  work: number;
  //seconds
  rest?: number;
  //seconds
  fluxWork?: number;
  //seconds
  setRest?: number;
  pace: PaceType;
  comment?: string;
  stages?: Stage[];
  cycles?: Cycle[];
  bursts?: Burst[];
}

export interface Burst {
  initialBurst?: number;
  burst: number;
  locations: number[];
}

export interface Cycle {
  work: number;
  rest: number;
}

export interface Definition {
  type: DayType;
  text: string;
  stimuli?: string;
}

export interface PaceDefinition {
  type: PaceType;
  text: string;
}

export type DayType =
  | "endurance"
  | "speed / threshold"
  | "max aerobic power"
  | "anaerobic"
  | "interval"
  | "time trial"
  | "polarized"
  | "rocket races A/B"
  | "flux"
  | "hybrid"
  | "flux stages"
  | "ascending"
  | "devour"
  | "infinity"
  | "towers"
  | "afterburner"
  | "atomic"
  | "synthesis";

export type PaceType =
  | "race pace"
  | "endurance pace"
  | "consistency"
  | "max effort"
  | "time trial";

export type Month = Day[];

export type Week = Day[];

export type Stage = {
  //percent increase
  increase: number | string;
  //seconds or comment
  time: number | string;
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
  pace: string | number;
  changePacePerInterval: number;
  initialBurst: number;
  numBurst: number;
  timeBetweenBursts: number;
  burstDuration: number;
};
