import { UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { IAuthParamsRegister } from "../../../types";
import { toast } from "../utils/alerts";
import { api } from "../utils/api";

const USER_QUERY_KEY = "auth";

const useRegister = async (params: IAuthParamsRegister) => {
  const { data } = await api.post("/auth/register", params);

  return data;
};

export const useRegisterUser = (
  queryOptions?: UseMutationOptions<
    IAuthParamsRegister,
    unknown,
    IAuthParamsRegister
  >
) => {
  const queryClient = useQueryClient();

  return useMutation(useRegister, {
    onSettled: () => {
      queryClient.invalidateQueries(USER_QUERY_KEY);
    },
    onSuccess: () => {
      // toast({
      //   icon: "success",
      //   title: "Successfully Registered",
      // });
    },
    ...queryOptions,
  });
};
