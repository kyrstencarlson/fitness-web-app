import { Day, DayType, PaceType, Stage, Workout } from "../types";

export const reshapeData = (file: any) => {
  const data: any = [];
  for (const f of file) {
    const found = data.find((item: any) => item.day === f.day);

    const stages: Stage[] = [];
    if (f.type === "flux stages") {
      const numStages = f.numFluxStages;
      const numFluxes = f.fluxesPerStage;

      for (let i = 0; i < numStages; i++) {
        const locations: number[] = [];
        const location = f.work + f.fluxDuration;
        const endRoundLoc = location * numFluxes;

        if (i > 0) {
          for (let j = 0; j < numFluxes; j++) {
            locations.push(endRoundLoc + location * (j + 1));
          }
        } else {
          for (let j = 0; j < numFluxes; j++) {
            locations.push(location * (j + 1));
          }
        }

        const stage: Stage = {
          increase: `${f?.increaseFluxPercent * 100 * (i + 1)}%`,
          time: f.fluxDuration,
          locations,
        };
        stages.push(stage);
      }
    }

    //TODO change in work and rest

    const workout: Workout = {
      rounds: f.rounds,
      work: f.work,
      rest: f.rest,
      pace: (f.pace ?? "") as PaceType,
      ...(f.fluxDuration && { fluxWork: f.fluxDuration }),
      ...(stages.length && { stages }),
    };
    if (found) {
      found.workout.push(workout);
    } else {
      const reshape: Day = {
        day: f.day,
        week: f.week,
        month: f.month,
        phase: f.phase,
        phaseWeek: f.phaseWeek,
        phaseMonth: f.phaseMonth,
        type: f.type as DayType,
        workout: [workout],
      };

      data.push(reshape);
    }
  }

  return data;
};
