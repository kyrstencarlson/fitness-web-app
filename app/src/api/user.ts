import {
    UseMutationOptions,
    UseQueryOptions,
    useMutation,
    useQuery,
    useQueryClient
} from 'react-query';
import { IUser, IUserParamsCreate, IUserParamsUpdate } from '../../../types';
import { toast } from '../utils/alerts';
import { api } from '../utils/api';

const USER_QUERY_KEY = 'user';

const updateUser = async (params: IUserParamsUpdate) => {
    const { data } = await api.put('/user', params);

    return data;
};

const deleteUser = async (id: string) => {
    const { data } = await api.delete(`/user/${id}`);

    return data;
};

const getUser = async (id: string) => {
    const { data } = await api.get(`/user/${id}`);

    return data;
};

const getUsers = async () => {
    const { data } = await api.get('/user');

    return data;
};

const findUser = async (params: Partial<IUser>) => {
    const { data } = await api.post('/user/find-one', params);

    return data;
};

const getUserProfile = async (id: string): Promise<IUser['profile']> => {
    const { data } = await api.get(`/user/${id}`);

    const { profile } = data;

    return profile;
};

export const useFetchUser = (
    id: string,
    queryOptions?: UseQueryOptions<IUser, unknown, IUser>
) => useQuery<IUser, unknown>(
    [USER_QUERY_KEY, id],
    () => getUser(id),
    queryOptions
);

export const useFetchAllUsers = (
    queryOptions?: UseQueryOptions<IUser[], unknown, IUser[]>
) => useQuery<IUser[], unknown>(
    [USER_QUERY_KEY],
    () => getUsers(),
    queryOptions
);

export const useGetUserProfile = (
    id: string,
    queryOptions?: UseQueryOptions<IUser['profile'], unknown, IUser['profile']>
) => useQuery<IUser['profile'], unknown>(
    [USER_QUERY_KEY, 'profile', id],
    () => getUserProfile(id),
    queryOptions
);

export const useFindUser = (
    params: Partial<IUser>,
    queryOptions?: UseQueryOptions<IUser, unknown, IUser>
) => useQuery<IUser, unknown>(
    [USER_QUERY_KEY],
    () => findUser(params),
    queryOptions
);

export const useUpdateUser = (
    queryOptions?: UseMutationOptions<
    IUserParamsUpdate,
    unknown,
    IUserParamsUpdate
  >
) => {
    const queryClient = useQueryClient();

    return useMutation(updateUser, {
        onSettled: () => {
            queryClient.invalidateQueries(USER_QUERY_KEY);
        },
        onSuccess: () => {
            toast({
                icon: 'success',
                title: 'User Updated'
            });
        },
        ...queryOptions
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation((id: string) => deleteUser(id), {
        onSettled: () => {
            queryClient.invalidateQueries(USER_QUERY_KEY);
        },
        onSuccess: () => {
            toast({
                icon: 'success',
                title: 'User Deleted'
            });
        }
    });
};
