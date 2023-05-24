import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../components/snackbar';
import axiosInstance from '../utils/axios';

export const useGetAllDepartment = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllDepartment'],
    () => axiosInstance.get('/department/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.department,
    isLoading,
    isError,
  };
};

export const useGetAllDepartmentStatus = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllDepartmentStatus'],
    () => axiosInstance.get('/department/web/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.department,
    isLoading,
    isError,
  };
};

export const useGetOneDepartmentById = (id) => {
  const { data, isError, isLoading } = useQuery(['_getOneDepartmentById'], () =>
    axiosInstance.get(`/department/one/${id}`)
  );
  return {
    data: data?.data?.department,
    isLoading,
    isError,
  };
};

export const useCreateDepartment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      console.log('data123', data);
      const formData = data;
      return axiosInstance.post('/department/add', formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createDepartment']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    createDepartment: mutate,
    isLoading,
  };
};

export const useUpdateDepartmentById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.put(`/department/update/${formData?.id}`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_updateDepartmentById']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    updateDepartment: mutate,
    isLoading,
  };
};
