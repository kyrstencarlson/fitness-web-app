import { Definition } from "../types";

export const definitions: Definition[] = [
  {
    type: "endurance",
    description:
      "Endurance Day is a classic Zone 2 or “Steady State” day. This means RPE of about 7/10. If you're using a HR Monitor, your heart rate should be about 70% of your max, to minimize glycolytic activity. Your pace should remain constant throughout the entire session. Endurance Day increases blood pumped per heartbeat, by recruiting mainly slow twitch muscle fibers, which require lots of oxygen. Don't worry about going faster. Maintain your pace as the sessions get longer.",
    stimuli:
      "Builds a foundation of oxidative capacity and systemic adaptations without significant fatigue.",
  },
  {
    type: "threshold",
    description:
      "Speed / Threshold Day is a race pace effort. Accelerate to your highest sustainable speed and maintain that speed throughout. This is usually about 8.5 / 10 RPE. Consistency is important; a drop off means some muscle fibers were prematurely fatigued and not properly trained. Speed / Threshold Day will help you discover redline intensity. As you progress through the Year of the Engine, your pace on Speed / Threshold day should increase.",
    stimuli:
      "Improves your ability to maintain high intensity and awareness of redlining.",
  },
  {
    type: "max aerobic power",
    description:
      "M-A-P Day is a special interval day which uses short rests to emphasize the oxidative system. As with any interval day, consistency is paramount. Going too fast and burning out means you've relied on fast twitch fibers and missed the point of the training day. If you're unsure of your pace, start conservatively and increase each round, until you reach your maximum sustainable pace. M-A-P is also helpful for learning to pace by feel.",
    stimuli:
      "Develops oxidative capacity in fast twitch fibers and enhances sensitivity to pace changes.",
  },
  {
    type: "anaerobic",
    description:
      "Anaerobic Day recruits and trains fast twitch fibers. This increases the power of your glycolytic system, which improves top end speed. Anaerobic Day also helps develop the ability to buffer protons produced by glycolytic reactions. As a result, sub-maximal efforts will become less stressful. For Anaerobic Day, attack each interval at max effort, even if your pace drops off.",
    stimuli:
      "Increases your maximum power output, resulting in higher top speeds and fewer muscle fiber recruitment for sub-maximal efforts",
  },
  {
    type: "interval",
    description:
      "Interval Day uses intensities above race pace but below max effort. Pace is determined by the work to rest ratio. Longer rest means a faster pace and recruitment of a greater proportion of fast twitch fibers. Consistency is important for intervals. For example, hypothetical scores of 50-50-50-50-50 are better than 60-55-50-45-40. While both results average 50, the second example means that some muscle fibers were prematurely fatigued and not properly trained. Consistency guarantees that the intended muscle fibers are properly trained.",
    stimuli:
      "Allows precises targeting of a narrow spectrum of muscle fibers. Work/rest ratios determine intensity.",
  },
  {
    type: "time trial",
    description:
      "Time Trails are monthly ten-minute tests. Time trials are max effort: go as hard as you can and sprint at the end. Time Trials are the practical exercise which quantify your improvement and test your pacing. With practice, you'll develop a pacing strategy for time trials. In the beginning, we suggest dividing them into quarters, and attempting to increase each quarter, then go for broke at the end.",
  },
  {
    type: "polarized",
    description:
      "Polarized Day develops the aerobic system. The pace for Polarized Day is your endurance pace. For the 7 second bursts, work at 10/10 max effort but do not go longer than 7 seconds. The 7-second bursts deplete cellular supplies of phosphocreatine, triggering increased mitochondrial activity. Over time, this increases your oxidative capacity. It is critical to stop at 7 seconds. A longer burst will cause increased glycolytic activity, which will undermine the desired stimulus.",
  },
  {
    type: "rocket races",
    description:
      "Rocket Races are paired intervals. RR-A is always a fast interval, with long rest. RR-B is the same work time, with a shorter rest. The objective of Rocket Races is to match your RR-A pace in RR-B, even with less rest. Complete all rounds of RR-B, even if you cannot maintain the pace of RR-A.\nRR-A will recruit a substantial fraction of fast twitch fibers. RR-B will recruit the same fibers, but due to the shorter rest, many of them will fatigue, shifting the workload (and stimulus) to slower fibers. This may cause a loss of power, but those fibers will adapt and you will get faster. Rocket Races increases work capacity across a broad spectrum of muscle fibers.",
  },
  {
    type: "flux",
    description:
      "Flux Days concurrently increase sustainable glycolytic power and develop oxidative capacity. The name Flux refers to glycolytic flux, which is the movement of molecules through the glycolytic pathway. Flux increases your sustainable work rate and sharpens your sense of pacing by feel. Most the work on a Flux Day is at endurance pace and targets  slow twitch fibers. The flux segments recruit a small fraction of fast twitch fibers, which increase the contribution of the glycolytic system.",
  },
  {
    type: "hybrid block",
    description:
      "Hybrid days increase sustainable speed and power at all intensities. The first set of Hybrid intervals is a fast interval. The second set is a slower interval, but it will be much more difficult because of the fatigue from the first interval set. Hybrid distributes the stimulus of interval training to a wider range of muscle fibers. As with any interval, consistency is paramount. The work rate within each set of intervals should be consistent, although the work rate between interval sets will vary.",
  },
  {
    type: "flux stages",
    description:
      "Flux Stages Days increase your ability to endure higher intensities. Like Flux Days, most of the work is at endurance pace. Flux Stages uses progressively more intense segments within the training block, increasing the rate of glycolytic flux and producing broader adaptations. Flux Stages Days also enable granular refinement of pacing.",
  },
  {
    type: "ascending",
    description:
      "Ascending Days increase your top end speed and develop the ability to pace precisely at high intensity. Your starting pace is determined by your time trial. Increase as prescribed each round. Ascending Days target the fastest muscle fibers. Knowing the difference between 85%, 90%, 95% and 99% can be critical for decision making in MetCons.",
  },
  {
    type: "devour",
    description:
      "Devour Days increase the oxidative capacity of fast twitch muscle fiber, using intervals with varying work, rest, and pace. As you progress through a Devour day, the proportion of fast twitch fibers recruited increases. Initially, you may have difficulty competing Devour days as prescribed; maintain the highest pace you can. The gradual progression of Devour increases the oxidative capacity of fast twitch fibers. The Ascending Devour and Descending Devour days apply extra intensity by varying multiple parameters in the same session.",
  },
  {
    type: "infinity block",
    description:
      "Infinity Days increase the aerobic power of fast twitch fibers. Infinity Days are intervals in which multiple parameters vary. Pace increases, work increases and rest decreases. Infinity builds on the stimulus of Devour. The aerobic capacity developed in Devour is now called upon to sustain higher intensity across a series of demanding intervals.",
  },
  {
    type: "towers block",
    description:
      "Towers Days improve the endurance of fast twitch muscle fibers. Towers is the last phase of the Advanced Oxidative block. Devour developed oxidative capacity in fast twitch fibers. Infinity increased aerobic power, and Towers adds endurance at higher intensity.\nTowers uses three conditioning blocks. The first block is a sub-maximal interval block. You'll work well above threshold, but below max effort. The second block is an uninterrupted block at an intensity which precludes recovery. The third block is a very high intensity effort",
  },
  {
    type: "afterburners block",
    description:
      "Afterburners Day is the beginning of the Advanced Glycolytic block. Afterburners increases your top end speed and your ability to recover from intense bursts. It starts with anaerobic style intervals, on short rest. The second segment is a steady state block at threshold intensity. This block will feel difficult because of the fatigue from the first block. Afterburner concludes with high intensity intervals. The focus on intensity throughout all sessions enhances your recovery from high intensity (but sub-maximal) efforts.",
  },
  {
    type: "atomic block",
    description:
      "Atomic Days develop your ability to produce repeated max effort bursts without loss of intensity, and to recover very quickly from high intensity efforts. The max effort intervals cause a very high rate of glycolytic flux, which produces hydrogen ions and lowers pH. Atomic days develop the ability to buffer / neutralize hydrogen ions and delay a drop in pH, enabling you to maintain high intensity longer and recover from max effort bursts.",
  },
  {
    type: "synthesis block",
    description:
      "Synthesis days increase speed, power, and endurance to the fast end of the muscle fiber spectrum. Synthesis is a combination of four blocks, including Atomic-style sprint blocks and above-threshold intensity steady state blocks, with short rest periods, resulting in consistent stimulus to fast twitch fibers.",
  },
];
