import {
  IBurst,
  IEngineWorkoutDay,
  IDayType,
  IStage,
  IWorkout,
} from '../interface';

export const reshapeData = (file: any): IEngineWorkoutDay[] => {
  const data: any = [];
  for (const f of file) {
    const found = data.find((item: any) => item.day === f.day);

    // Type
    if (f.type.includes('block')) {
      const t = f.type.split(' ');
      f.type = `${t[0]} ${t[1]}`;
    }
    if (f.type.includes('rocket races')) {
      f.type = 'rocket races';
    }

    // Flux Stages
    const stages: IStage[] = [];
    const cycles = [];
    if (f.type.includes('flux')) {
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

        const stage: IStage = {
          increase: `${f.fluxPercent + f.increaseFluxPercent * st}%`,
          time: f.fluxDuration,
          locations,
        };
        stages.push(stage);
      }
    }

    // Change in Work/Rest
    if (f.changeWorkDuration !== 0 || f.changeRestDuration !== 0) {
      for (let r = 0; r < f.rounds; r++) {
        let pace = '';
        if (f.pace) {
          const paceNum = f.pace && f.pace + f.changePacePerInterval * r;
          if (paceNum === 0) {
            pace = 'TT';
          }
          if (paceNum > 0) {
            pace = `TT+${paceNum}`;
          }
          if (paceNum < 0) {
            pace = `TT${paceNum}`;
          }
        }

        const changeWork = {
          work: f.work + f.changeWorkDuration * r,
          rest: f.rest + f.changeRestDuration * r,
          pace,
        };
        cycles.push(changeWork);
      }
    }

    let pace = '';
    if (f.pace) {
      const paceNum = f.pace;
      if (paceNum === 0) {
        pace = 'TT';
      }
      if (paceNum > 0) {
        pace = `TT+${paceNum}`;
      }
      if (paceNum < 0) {
        pace = `TT${paceNum}`;
      }
    }

    // Bursts
    const bursts: IBurst[] = [];
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

    const workout: IWorkout = {
      rounds: f.rounds,
      totalWork: f.totalWork,
      ...(stages.length && { stages }),
      ...(cycles.length && { cycles }),
      ...(bursts.length && { bursts }),
      ...(f.setRest && { setRest: f.setRest }),
      ...(!cycles.length && f.work && { work: f.work }),
      ...(!cycles.length && f.rest && { rest: f.rest }),
      ...(f.fluxDuration && { fluxWork: f.fluxDuration }),
      ...(!cycles.length && f.pace && { pace }),
    };
    if (found) {
      found.workout.push(workout);
    } else {
      const reshape: IEngineWorkoutDay = {
        day: f.day,
        week: f.week,
        month: f.month,
        phase: f.phase,
        phaseWeek: f.phaseWeek,
        phaseMonth: f.phaseMonth,
        type: f.type as IDayType,
        workout: [workout],
      };

      data.push(reshape);
    }
  }

  return data;
};
