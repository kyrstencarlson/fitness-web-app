import { Day, Month } from "../types";

export const getMonths = (months: Day[]) =>
  months.reduce((arr, item, index) => {
    //20 exercises per month
    const monthIndex = Math.floor(index / 20);

    if (!arr[monthIndex]) {
      // start a new chunk
      arr[monthIndex] = [];
    }

    arr[monthIndex].push(item);

    return arr;
  }, [] as Month[]);
