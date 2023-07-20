import { UseQueryOptions, useQuery } from "react-query";
import {
  IEngineWorkoutDay,
  IEngineWorkoutLog,
  IEngineWorkoutLogParamsModality,
  IEngineWorkoutLogParamsModalityUnits,
} from "../../../types";
import { api } from "../utils/api";

const WORKOUT_LOGS_QUERY_KEY = "engine-workout-logs";

const fetchLogsMonth = async (user_id: string, month: number) => {
  const { data } = await api.post(`/engine/logs/${user_id}/month/${month}`);

  return data;
};

const fetchLogsType = async (user_id: string, type: string) => {
  const { data } = await api.post(`/engine/logs/${user_id}/type/${type}`);

  return data;
};

const fetchLogsModality = async (params: IEngineWorkoutLogParamsModality) => {
  const { data } = await api.post(`/engine/logs/modality`, params);

  return data;
};
const fetchLogsModalityUnits = async (
  params: IEngineWorkoutLogParamsModalityUnits
) => {
  const { data } = await api.post(`/engine/logs/modality-units`, params);

  return data;
};

const getWorkoutLog = async (id: string) => {
  const { data } = await api.get(`/engine/logs/${id}`);

  return data;
};

const findWorkoutLogs = async (
  user_id: string,
  params: Partial<IEngineWorkoutDay>
) => {
  const { data } = await api.post(`/engine/logs/${user_id}/find-one`, params);

  return data;
};

const findUserWorkoutLogs = async (user_id: string) => {
  const { data } = await api.get(`/engine/logs/${user_id}/find`);

  return data;
};

export const useFetchWorkoutLog = (
  id: string,
  queryOptions?: UseQueryOptions<IEngineWorkoutLog, unknown, IEngineWorkoutLog>
) =>
  useQuery<IEngineWorkoutLog, unknown>(
    [WORKOUT_LOGS_QUERY_KEY, id],
    () => getWorkoutLog(id),
    queryOptions
  );

export const useFetchUserWorkoutLogs = (
  id: string,
  queryOptions?: UseQueryOptions<
    IEngineWorkoutLog[],
    unknown,
    IEngineWorkoutLog[]
  >
) =>
  useQuery<IEngineWorkoutLog[], unknown>(
    [WORKOUT_LOGS_QUERY_KEY, id],
    () => findUserWorkoutLogs(id),
    queryOptions
  );

export const useFetchUserMonthLogs = (
  user_id: string,
  month: number,
  queryOptions?: UseQueryOptions<
    IEngineWorkoutLog[],
    unknown,
    IEngineWorkoutLog[]
  >
) =>
  useQuery<IEngineWorkoutLog[], unknown>(
    [WORKOUT_LOGS_QUERY_KEY, "month", month],
    () => fetchLogsMonth(user_id, month),
    queryOptions
  );

export const useFetchUserLogsType = (
  user_id: string,
  type: string,
  queryOptions?: UseQueryOptions<
    IEngineWorkoutLog[],
    unknown,
    IEngineWorkoutLog[]
  >
) =>
  useQuery<IEngineWorkoutLog[], unknown>(
    [WORKOUT_LOGS_QUERY_KEY, "type", type],
    () => fetchLogsType(user_id, type),
    queryOptions
  );

export const useFetchUserLogsModality = (
  params: IEngineWorkoutLogParamsModality,
  queryOptions?: UseQueryOptions<
    IEngineWorkoutLog[],
    unknown,
    IEngineWorkoutLog[]
  >
) =>
  useQuery<IEngineWorkoutLog[], unknown>(
    [WORKOUT_LOGS_QUERY_KEY, "modality"],
    () => fetchLogsModality(params),
    queryOptions
  );

export const useFetchUserLogsModalityUnits = (
  params: IEngineWorkoutLogParamsModalityUnits,
  queryOptions?: UseQueryOptions<
    IEngineWorkoutLog[],
    unknown,
    IEngineWorkoutLog[]
  >
) =>
  useQuery<IEngineWorkoutLog[], unknown>(
    [WORKOUT_LOGS_QUERY_KEY, "modality-units"],
    () => fetchLogsModalityUnits(params),
    queryOptions
  );
