import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../components/snackbar';
import axiosInstance from '../utils/axios';

export const useGetAllStudentrange = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllStudentrange'],
    () => axiosInstance.get('/studentrange/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.studentrange,
    isLoading,
    isError,
  };
};

export const useCreateStudentRange = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.post('/studentrange/addAndUpdate', formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createStudentrange']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    createStudentrange: mutate,
    isLoading,
  };
};
