import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../components/snackbar';
import axiosInstance from '../utils/axios';

export const useGetAllPricingtiers = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllPricingtiers'],
    () => axiosInstance.get('/pricingtiers/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.pricingtiers,
    isLoading,
    isError,
  };
};

export const useGetOnePricingtiersById = (id) => {
  const { data, isError, isLoading } = useQuery(['_getOnePricingtiersById', id], () =>
    axiosInstance.get(`/pricingtiers/one/${id}`),
    { enabled: !!id }
  );
  return {
    data: data?.data?.pricingtiers,
    isLoading,
    isError,
  };
};

export const useCreatePricingtiers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.post('/pricingtiers/addAndUpdate', formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createPricingtiers']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    createPricingtiers: mutate,
    isLoading,
  };
};
