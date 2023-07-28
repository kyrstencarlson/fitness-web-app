import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  IEngineWorkoutDay,
  IEngineWorkoutLog,
  IEngineWorkoutLogBase,
  IEngineWorkoutLogParamsCreate,
  IEngineWorkoutLogParamsModality,
  IEngineWorkoutLogParamsModalityUnits,
  IEngineWorkoutLogParamsUpdate,
} from "../../../types";
import { api } from "../utils/api";
import { toast } from "../utils/alerts";

const WORKOUT_LOGS_QUERY_KEY = "engine-workout-logs";

const createWorkoutLog = async (params: IEngineWorkoutLogParamsCreate) => {
  const { data } = await api.post("/engine/logs", params);

  return data;
};

const updateWorkoutLog = async (params: IEngineWorkoutLogParamsUpdate) => {
  const { data } = await api.put("/engine/logs", params);

  return data;
};

const deleteWorkoutLog = async (log_id: string) => {
  const { data } = await api.delete(`/engine/logs/${log_id}`);

  return data;
};

const fetchLogsMonth = async (user_id: string, month: number) => {
  const { data } = await api.post(`/engine/logs/${user_id}/month/${month}`);

  return data;
};

const fetchLogsType = async (user_id: string, type: string) => {
  const { data } = await api.post(`/engine/logs/${user_id}/type/${type}`);

  return data;
};

const fetchLogsModality = async (params: IEngineWorkoutLogParamsModality) => {
  const { data } = await api.post("/engine/logs/modality", params);

  return data;
};
const fetchLogsModalityUnits = async (
  params: IEngineWorkoutLogParamsModalityUnits
) => {
  const { data } = await api.post("/engine/logs/modality-units", params);

  return data;
};

const getWorkoutLog = async (id: string) => {
  const { data } = await api.get(`/engine/logs/${id}`);

  return data;
};

const getCompletedMonths = async (user_id: string) => {
  const { data } = await api.get(`/engine/logs/${user_id}/completed`);

  return data;
};

const findWorkoutLog = async (params: Partial<IEngineWorkoutLogBase>) => {
  const { data } = await api.post(
    `/engine/logs/${params.user_id}/find-one`,
    params
  );

  return data;
};

const findUserWorkoutLogs = async (user_id: string) => {
  const { data } = await api.get(`/engine/logs/${user_id}/find`);

  return data;
};

const getAllLogs = async () => {
  const { data } = await api.post("/engine/logs/list");

  return data;
};

//

export const useCreateWorkoutLog = (
  queryOptions?: UseMutationOptions<
    IEngineWorkoutLogParamsCreate,
    unknown,
    IEngineWorkoutLogParamsCreate
  >
) => {
  const queryClient = useQueryClient();

  return useMutation(createWorkoutLog, {
    onSettled: () => {
      queryClient.invalidateQueries(WORKOUT_LOGS_QUERY_KEY);
    },
    onSuccess: () => {
      toast({
        icon: "success",
        title: "Score Created",
      });
    },
    ...queryOptions,
  });
};

export const useUpdateWorkoutLog = (
  queryOptions?: UseMutationOptions<
    IEngineWorkoutLogParamsUpdate,
    unknown,
    IEngineWorkoutLogParamsUpdate
  >
) => {
  const queryClient = useQueryClient();

  return useMutation(updateWorkoutLog, {
    onSettled: () => {
      queryClient.invalidateQueries(WORKOUT_LOGS_QUERY_KEY);
    },
    onSuccess: () => {
      toast({
        icon: "success",
        title: "Score Updated",
      });
    },
    ...queryOptions,
  });
};

export const useDeleteWorkoutLog = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteWorkoutLog(id), {
    onSettled: () => {
      queryClient.invalidateQueries(WORKOUT_LOGS_QUERY_KEY);
    },
    onSuccess: () => {
      toast({
        icon: "success",
        title: "Score Deleted",
      });
    },
  });
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

export const useGetCompletedMonths = (
  user_id: string,
  queryOptions?: UseQueryOptions<number[], unknown, number[]>
) =>
  useQuery<number[], unknown>(
    [WORKOUT_LOGS_QUERY_KEY, "completed"],
    () => getCompletedMonths(user_id),
    queryOptions
  );

export const useFindWorkoutLog = (
  params: Partial<IEngineWorkoutLogBase>,
  queryOptions?: UseQueryOptions<IEngineWorkoutLog, unknown, IEngineWorkoutLog>
) =>
  useQuery<IEngineWorkoutLog, unknown>(
    [WORKOUT_LOGS_QUERY_KEY, "search"],
    () => findWorkoutLog(params),
    queryOptions
  );

export const useGetAllWorkoutLogs = (
  queryOptions?: UseQueryOptions<
    IEngineWorkoutLog[],
    unknown,
    IEngineWorkoutLog[]
  >
) =>
  useQuery<IEngineWorkoutLog[], unknown>(
    [WORKOUT_LOGS_QUERY_KEY, "list"],
    () => getAllLogs(),
    queryOptions
  );
