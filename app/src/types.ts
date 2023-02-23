export interface Day {
    month: number;
    week: number;
    day: number;
    type: DayType;
    workout: Workout[];
}

export interface Workout {
    title?: string;
    rounds: number | string;
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
    'endurance' |
    'speed / threshold' |
    'max aerobic power' |
    'anaerobic' |
    'interval' |
    'time trial'|
    'polarized' |
    'rocket races A/B' |
    'flux' |
    'hybrid' |
    'flux stages' |
    'ascending' |
    'devour' |
    'infinity' |
    'towers' |
    'afterburner' |
    'atomic' |
    'synthesis';

export type PaceType =
    'race pace' |
    'endurance pace' |
    'consistency' |
    'max effort' |
    'time trial';

export type Month = Day[];

export type Week = Day[];

export type Stage = {
    increase: number | string;
    //seconds or comment
    time: number | string;
    // time in seconds
    locations: number[];
}
