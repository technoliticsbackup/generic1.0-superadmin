import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../components/snackbar';
import axiosInstance from '../utils/axios';

export const useGetAllInstmaneger = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllInstmaneger'],
    () => axiosInstance.get('/inst/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  };
};

export const useGetAllOrgList = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getAllOrgList'],
    () => axiosInstance.get('/org/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  };
};

export const useGetAllInstmanegerStatus = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllInstmanegerStatus'],
    () => axiosInstance.get('/inst/web/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  };
};

export const useGetOneInstmanegerById = (id) => {
  const { data, isError, isLoading } = useQuery(['_getOneInstmanegerById'], () =>
    axiosInstance.get(`/inst/one/${id}`)
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  };
};

export const useCreateInstmaneger = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.post('/inst/create', formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createInstmaneger']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    createInstmaneger: mutate,
    isLoading,
  };
};

export const useCreateInstStaff = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      console.log(formData)
      return axiosInstance.post('/inst/signup', formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createInstStaff']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    createInstStaff: mutate,
    isLoading,
  };
};

export const useUpdateInstmanegerById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      const id = formData.get('id');
      return axiosInstance.put(`/inst/update/${id}`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_updateInstmaneger']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    updateInstmaneger: mutate,
    isLoading,
  };
};


export const useUpdateInstmanegerStatusById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.put(`/inst/updateStatus/${formData?.id}`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_updateInstmaneger']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    updateStatusInstmaneger: mutate,
    isLoading,
  };
};
