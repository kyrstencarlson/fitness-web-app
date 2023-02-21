export interface Day {
    month: number;
    week: number;
    day: number;
    type: DayType;
    rounds: number;
    //seconds
    work: number;
    pace: PaceType;
    //seconds
    rest: number;
}

export interface Definition {
    name: DayType;
    text: string;
    stimuli: string;
}

export interface PaceDefinition {
    type: PaceType;
    text: string;
}

export type DayType = 'endurance' | 'speed / threshold' | 'max aerobic power' | 'anaerobic' | 'interval' | 'time trial' ;

export type PaceType = 'race pace' | 'endurance pace' | 'consistency' | 'max effort' | 'time trial';

export type Month = Day[];
