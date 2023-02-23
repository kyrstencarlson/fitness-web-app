import { Day, Month } from '../types';

export const getWeeksFromMonth = (month: Month) => month.reduce((arr, item, index) => {
    //5 exercises per week
    const chunkIndex = Math.floor(index / 5);

    if (!arr[chunkIndex]) {
        // start a new chunk
        arr[chunkIndex] = [];
    }

    arr[chunkIndex].push(item);

    return arr;
}, [] as Day[][]);
