import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../components/snackbar';
import axiosInstance from '../utils/axios';

export const useGetAllStaff = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllStaff'],
    () => axiosInstance.get('/adminuser/all'),
    {
      enabled: true,
    }
  );
  return {
    data: data?.data?.users,
    isLoading,
    isError,
  };
};

export const useGetOneStaffById = (id) => {
  const { data, isError, isLoading } = useQuery(['_getOneStaffById'], () =>
    axiosInstance.get(`/adminuser/one/${id}`)
  );
  return {
    data: data?.data?.user,
    isLoading,
    isError,
  };
};

export const useCreateStaff = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.post('/adminuser/signup', formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createStaff']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    createStaff: mutate,
    isLoading,
  };
};

export const useUpdateStaffById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      const id = formData.get('id');
      return axiosInstance.put(`/adminuser/update/${id}`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_updateStaffById']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    updateStaff: mutate,
    isLoading,
  };
};

export const useUpdatePasswordById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      console.log('formData', formData);
      const id = formData?.id;
      return axiosInstance.put(`/adminuser/updatepassword/${id}`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_updatePasswordById']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    updatePassword: mutate,
    isLoading,
  };
};

export const useStatusUpdateStaffById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.put(`/adminuser/updateStatus/${formData?.id}`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_updateStaffById']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    updateStaff: mutate,
  };
};

export const useDeleteStaffById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, data } = useMutation(
    (id) => {
      const _id = id;
      return axiosInstance.delete(`/adminuser/delete/${_id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['_deleteStaffById']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return { DeleteStaff: mutate };
};
