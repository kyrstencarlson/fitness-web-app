import { Definition, PaceDefinition } from '../types';

export const definitions: Definition[] = [
    {
        name: 'endurance',
        text: 'The intended stimulus of Endurance Day is a consistent, low intensity pace, about a 6-7 out of 10 in terms of perceived exertion. If you use a heart rate monitor, aim for 70 to 75%. This recrults your slow twitch fibers. The adaptations to this stimulus are increased blood pumped per heartbeat, increased oxygen carrying capability in blood, and increased capillary blood supply.',
        stimuli: 'Builds a foundation of oxidative capacity and systemic adaptations without significant fatigue.'
    },
    {
        name: 'speed / threshold',
        text: 'The intended stimulus of Speed Day is to work at the fastest pace you can hold. This roughly mirror what you\'d feel in a MetCon (or a sparring match). It is better to begin a bit slowly and increase, adaptations to this stimulus include increased oxidative capacity and development of the ability to neutralize protons and transport lactate. Fast twitch fibers are not broadly recruited.',
        stimuli: 'Improves your ability to maintain high intensity and awareness of redlining.'
    },
    {
        name: 'max aerobic power',
        text: 'The intended stimulus of Max Aerobic Power Day is maximal sustainable intensity. Scores of 100, 100, 100, 100, 100 are better than score of 110, 105, 100, 95, 90. If you are unsure of your pace, start slowly and gradually increase, ie. 90, 95, 100, 105, 110. After a few weeks you will be able to pace it by feel. The adaptations include pacing sensitivity and increased power from oxidative energy.',
        stimuli: 'Develops oxidative capacity in fast twitch fibers and enhances sensitivity to pace changes.'

    },
    {
        name: 'anaerobic',
        text: 'The intended stimulus of Anaerobic Day is to go as fast as you can every interval. Anaerobic Day recruits primarily fast twitch fibers. It is OK if your speed drops off between intervals. Just attack every interval with max effort. The adantations of Anaerobic Day are increased top end power and increased sustainability at sub-maximal intensity.',
        stimuli: 'Increases your maximum power output, resulting in higher top speeds and fewer muscle fiber recruitment for sub-maximal efforts'
    },
    {
        name: 'interval',
        text: 'The intended stimulus of Interval Days is the highest consistent score. The work to rest ratio will determine the intensity of the interval. The adaptation is increased sustainability of high power output. Intervals are integral for developing pacing by field, and are foundational for developing sustainable work capacity at every intensity. Intervals will be part of the program in all phases.',
        stimuli: 'Allows precises targeting of a narrow spectrum of muscle fibers. Work/rest ratios determine intensity.'
    }
];

export const paceDefinitions: PaceDefinition[] = [
    {
        type: 'endurance pace',
        text: 'This is a classic Zone 2 or “Steady State” day. This means RPE of about 7/10.  If you\'re using a HR Monitor, your heart rate should be about 70% of your max HR, to minimize glycolytic activity. Your pace should remain constant throughout the entire session.'
    },
    {
        type: 'max effort',
        text: 'For Max Effort, you should be at about a 9.8 / 10 RPE. Attack every interval, even if your pace drops off. Max Effort  can be a bit uncomfortable, but this is required to attain the desired stimulus.'
    },
    {
        type: 'race pace',
        text: 'Race Pace means accelerate to your highest sustainable speed and maintain that speed throughout. This is usually about 8.5 / 10 RPE. Consistency is important; a drop off means some muscle fibers were prematurely fatigued and not properly trained. On days where Race Pace is indicated, do not sprint at the end of the session.'
    },
    {
        type: 'consistency',
        text: 'Consistency is important for intervals. For example, hypothetical scores of 50-50-50-50-50 are better than 60-55-50-45-40. While both results average 50, the second example means that some muscle fibers were prematurely fatigued and not properly trained. Consistency means that the intended muscle fibers are properly trained. If you\'re unsure of your pace, start conservatively an increase each round, until you reach your maximum sustainable pace.'
    },
    {
        type: 'time trial',
        text: 'Time Trials are 10 minute tests in which you should try to achieve the highest possible score, using whatever pacing works for you. On time trials (unlike rest days), you are encouraged to sprint at the end, as well as to make whatever trade-offs are necessary to attain the highest possible score. The Time Trial is a benchmark which will be used throughout the program.'
    }
];
