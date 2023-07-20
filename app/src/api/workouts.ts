import { UseQueryOptions, useQuery } from "react-query";
import {
  IEngineWorkoutDay,
  IEngineWorkoutMonth,
  IEngineWorkoutWeek,
} from "../../../types";
import { api } from "../utils/api";
import { getMonths, getWeeksFromMonth } from "../utils/formatDays";

const WORKOUT_QUERY_KEY = "engine-workout";

const fetchMonth = async (month: number) => {
  const { data } = await api.post(`/engine/workout/month/${month}`);

  const weeks = getWeeksFromMonth(data);
  return weeks;
};

const fetchMonths = async () => {
  const { data } = await api.get(`/engine/workout`);

  const months = getMonths(data);

  return months;
};

const fetchWeek = async (week: number) => {
  const { data } = await api.post(`/engine/workout/week/${week}`);

  const weeks = getWeeksFromMonth(data);

  return weeks;
};

const getWorkout = async (id: string) => {
  const { data } = await api.get(`/engine/workout/${id}`);

  return data;
};

const findWorkout = async (params: Partial<IEngineWorkoutDay>) => {
  const { data } = await api.post(`/engine/workout/find`, params);

  return data;
};

export const useFetchWorkout = (
  id: string,
  queryOptions?: UseQueryOptions<IEngineWorkoutDay, unknown, IEngineWorkoutDay>
) =>
  useQuery<IEngineWorkoutDay, unknown>(
    [WORKOUT_QUERY_KEY, id],
    () => getWorkout(id),
    queryOptions
  );

export const useGetMonthsFormatted = (
  queryOptions?: UseQueryOptions<
    IEngineWorkoutMonth[],
    unknown,
    IEngineWorkoutMonth[]
  >
) =>
  useQuery<IEngineWorkoutMonth[], unknown>(
    [WORKOUT_QUERY_KEY],
    () => fetchMonths(),
    queryOptions
  );

export const useFetchMonth = (
  month: number,
  queryOptions?: UseQueryOptions<
    IEngineWorkoutDay[][],
    unknown,
    IEngineWorkoutDay[][]
  >
) =>
  useQuery<IEngineWorkoutDay[][], unknown>(
    [WORKOUT_QUERY_KEY, "month", month],
    () => fetchMonth(month),
    queryOptions
  );

export const useFetchWeek = (
  week: number,
  queryOptions?: UseQueryOptions<
    IEngineWorkoutWeek[],
    unknown,
    IEngineWorkoutWeek[]
  >
) =>
  useQuery<IEngineWorkoutWeek[], unknown>(
    [WORKOUT_QUERY_KEY, "week", week],
    () => fetchWeek(week) as any,
    queryOptions
  );

export const useFindWorkout = (
  params: Partial<IEngineWorkoutDay>,
  queryOptions?: UseQueryOptions<IEngineWorkoutDay, unknown, IEngineWorkoutDay>
) =>
  useQuery<IEngineWorkoutDay, unknown>(
    [WORKOUT_QUERY_KEY],
    () => findWorkout(params),
    queryOptions
  );
