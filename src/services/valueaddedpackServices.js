import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../components/snackbar';
import axiosInstance from '../utils/axios';

export const useGetAllValueaddedpack = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllValueaddedpack'],
    () => axiosInstance.get('/valueaddedpack/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.valueaddedpack,
    isLoading,
    isError,
  };
};

export const useGetAllValueaddedpackStatus = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllValueaddedpackStatus'],
    () => axiosInstance.get('/valueaddedpack/web/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.valueaddedpack,
    isLoading,
    isError,
  };
};

export const useGetOneValueaddedpackById = (id) => {
  const { data, isError, isLoading } = useQuery(['_getOneValueaddedpackById'], () =>
    axiosInstance.get(`/valueaddedpack/one/${id}`)
  );
  return {
    data: data?.data?.valueaddedpack,
    isLoading,
    isError,
  };
};

export const useCreateValueaddedpack = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.post('/valueaddedpack/add', formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createValueaddedpack']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    createValueaddedpack: mutate,
    isLoading,
  };
};

export const useUpdateValueaddedpackById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.put(`/valueaddedpack/update/${formData?.id}`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_updateValueaddedpackById']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    updateValueaddedpack: mutate,
    isLoading,
  };
};
