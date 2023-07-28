import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import React from 'react';
import { EWorkoutLogUnits } from '../workouts/SubmitForm';

const ResultLineChart = (props: { logs: any[] }) => {

    const { logs } = props;

    const units = Object.values(EWorkoutLogUnits);
    const unitFormatted: any[] = [];
    for (const unit of units) {
        const unitFilter = logs?.filter((log: any) => log.units === unit);

        if (unitFilter) {
            const unitPace = `pace: ${unit}`;
            for (const f of unitFilter) {
                unitFormatted.push({
                    ...f,
                    [unitPace]: f.pace
                });
            }
        }
    }

    return (
        unitFormatted &&
                    <LineChart width={600} height={300} data={unitFormatted} style={{ margin: '0 auto' }}>
                        <XAxis dataKey='day' />
                        <YAxis />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Line type='monotone' dataKey={'pace'} stroke={'#8884d8'} />

                        {/* {units && units.map((unit: any) => {
                            if (!unitFormatted.map(log => log.units).includes(unit)) {
                                return;
                            }

                            let stroke = '#8884d8';
                            switch (unit) {
                            case EWorkoutLogUnits.METERS: {
                                stroke = '#82ca9d';
                                break;
                            }
                            case EWorkoutLogUnits.CALORIES: {
                                stroke = '#ffc658';
                                break;
                            }
                            case EWorkoutLogUnits.REPS: {
                                stroke = '#ff0000';
                                break;
                            }
                            case EWorkoutLogUnits.KILOMETERS: {
                                stroke = '#0000ff';
                                break;
                            }
                            case EWorkoutLogUnits.MILES: {
                                stroke = '#00ff00';
                                break;
                            }
                            case EWorkoutLogUnits.WATTS: {
                                stroke = '#ff00ff';
                                break;
                            }


                            }

                            return (
                                <Bar type='monotone' dataKey={`pace: ${unit}`} fill={stroke} />
                            );
                        })} */}

                    </LineChart>

    );
};

export default ResultLineChart;
