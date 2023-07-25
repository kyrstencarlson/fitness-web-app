import { IEngineWorkoutDay } from '../../../types';
import { Day, Month } from '../types';

export const getMonths = (months: IEngineWorkoutDay[]) => months.reduce((arr, item, index) => {
    //20 exercises per month
    const monthIndex = Math.floor(index / 20);

    if (!arr[monthIndex]) {
        // start a new chunk
        arr[monthIndex] = [];
    }

    arr[monthIndex].push(item);

    return arr;
}, [] as IEngineWorkoutDay[][]);

export const getWeeksFromMonth = (month: IEngineWorkoutDay[]) => month.reduce((arr, item, index) => {
    //5 exercises per week
    const chunkIndex = Math.floor(index / 5);

    if (!arr[chunkIndex]) {
        // start a new chunk
        arr[chunkIndex] = [];
    }

    arr[chunkIndex].push(item);

    return arr;
}, [] as IEngineWorkoutDay[][]);

export const getWeeks = (days: IEngineWorkoutDay[]) => days
    .reduce((arr, item, index) => {
        //5 exercises per week
        const chunkIndex = Math.floor(index / 5);

        if (!arr[chunkIndex]) {
            // start a new chunk
            arr[chunkIndex] = [];
        }

        arr[chunkIndex].push(item);

        return arr;
    }, [] as IEngineWorkoutDay[][])
    .reduce((arr, item, index) => {
        //4 weeks per month
        const chunkIndex = Math.floor(index / 4);

        if (!arr[chunkIndex]) {
            // start a new chunk
            arr[chunkIndex] = [];
        }

        arr[chunkIndex].push(item);

        return arr;
    }, [] as IEngineWorkoutDay[][][]);
