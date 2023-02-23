export interface Day {
    month: number;
    week: number;
    day: number;
    type: DayType;
    workout: Workout[];
}

interface Workout {
    rounds: number;
    //seconds
    work: number;
    pace: PaceType;
    //seconds
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
