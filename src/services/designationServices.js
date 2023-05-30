import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../components/snackbar';
import axiosInstance from '../utils/axios';

export const useGetAllDesignation = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllDesignation'],
    () => axiosInstance.get('/designation/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.designation,
    isLoading,
    isError,
  };
};


export function useGetAllDesignationStatusAndDepartment(departmentId) {
  const { data, isLoading, isError, refetch } = useQuery(
    ['_getAllDesignationStatusAndDepartment', departmentId],
    async () => {
      const response = await axiosInstance.get(`/designation/web/allbydepartment/${departmentId}`);
      return response.data;
    },
    {
      enabled: !!departmentId,
    }
  );

  return {
    data: data?.designation || [],
    isLoading,
    isError,
    refetch,
  };
}

export const useGetAllDesignationStatus = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllDesignationStatus'],
    () => axiosInstance.get('/designation/web/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.designation,
    isLoading,
    isError,
  };
};

export const useGetOneDesignationById = (id) => {
  const { data, isError, isLoading } = useQuery(['_getOneDesignationById'], () =>
    axiosInstance.get(`/designation/one/${id}`)
  );
  return {
    data: data?.data?.designation,
    isLoading,
    isError,
  };
};

export const useCreateDesignation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.post('/designation/add', formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createDesignation']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    createDesignation: mutate,
    isLoading,
  };
};

export const useUpdateDesignationById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.put(`/designation/update/${formData?.id}`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_updateDesignationById']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    updateDesignation: mutate,
    isLoading,
  };
};
