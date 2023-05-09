import { Burst, Day, DayType, PaceType, Stage, Workout } from "../types";

export const reshapeData = (file: any): Day[] => {
  const data: any = [];
  for (const f of file) {
    const found = data.find((item: any) => item.day === f.day);

    // Flux Stages
    const stages: Stage[] = [];
    const cycles = [];
    if (f.type.includes("flux")) {
      const numStages = f.numFluxStages;
      const numFluxes = f.fluxesPerStage;

      for (let st = 0; st < numStages; st++) {
        const locations: number[] = [];
        const location = f.work;
        const endRoundLoc = location * numFluxes;

        if (st > 0) {
          for (let flx = 0; flx < numFluxes; flx++) {
            locations.push(endRoundLoc * st + location * (flx + 1));
          }
        } else {
          for (let flx = 0; flx < numFluxes; flx++) {
            locations.push(location * (flx + 1));
          }
        }

        const stage: Stage = {
          increase: `${
            f.fluxPercent * 100 + f.increaseFluxPercent * 100 * st
          }%`,
          time: f.fluxDuration,
          locations,
        };
        stages.push(stage);
      }
    }

    // Change in Work/Rest
    if (f.changeWorkDuration !== 0 || f.changeRestDuration !== 0) {
      for (let r = 0; r < f.rounds; r++) {
        const changeWork = {
          work: f.work + f.changeWorkDuration * r,
          rest: f.rest + f.changeRestDuration * r,
          pace: `TT${f.pace > 0 ? "+" : "-"}${f.pace}`,
        };
        cycles.push(changeWork);
      }
    }

    // Bursts
    const bursts: Burst[] = [];
    if (f.burstDuration !== 0) {
      const numBursts = f.numBurst;

      const locations: number[] = [];
      for (let i = 0; i < numBursts; i++) {
        locations.push(f.timeBetweenBursts * (i + 1));
      }
      const burst = {
        ...(f.initialBurst && { initialBurst: f.initialBurst }),
        burst: f.burstDuration,
        work: f.timeBetweenBursts - f.burstDuration,
        locations,
      };
      bursts.push(burst);
    }

    const workout: Workout = {
      rounds: f.rounds,
      totalWork: f.totalWork,
      ...(stages.length && { stages }),
      ...(cycles.length && { cycles }),
      ...(bursts.length && { bursts }),
      ...(f.setRest && { setRest: f.setRest }),
      ...(!cycles.length && f.work && { work: f.work }),
      ...(!cycles.length && f.rest && { rest: f.rest }),
      ...(f.fluxDuration && { fluxWork: f.fluxDuration }),
      ...(!cycles.length && f.pace && { pace: (f.pace ?? "") as PaceType }),
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
