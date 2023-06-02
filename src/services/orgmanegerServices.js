import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../components/snackbar';
import axiosInstance from '../utils/axios';

export const useGetAllOrgmaneger = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllOrgmaneger'],
    () => axiosInstance.get('/org/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  };
};

export const useGetAllOrgmanegerStatus = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllOrgmanegerStatus'],
    () => axiosInstance.get('/org/web/all'),
    { enabled: true }
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  };
};

export const useGetOneOrgmanegerById = (id) => {
  const { data, isError, isLoading } = useQuery(['_getOneOrgmanegerById'], () =>
    axiosInstance.get(`/org/one/${id}`)
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  };
};

export const useCreateOrgmaneger = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.post('/org/create', formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createOrgmaneger']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    createOrgmaneger: mutate,
    isLoading,
  };
};


export const useUpdateOrgmanegerById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      const id = formData.get('id');
      return axiosInstance.put(`/org/update/${id}`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_updateOrgmaneger']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    updateOrgmaneger: mutate,
    isLoading,
  };
};

export const useUpdateOrgmanegerStatusById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      return axiosInstance.put(`/org/updateStatus/${formData?.id}`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_updateOrgmaneger']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    updateStatusOrgmaneger: mutate,
    isLoading,
  };
};

export const useCreateOrgStaff = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      console.log(formData)
      return axiosInstance.post('/orgadminuser/signup', formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createOrgStaff']);
        enqueueSnackbar(data?.data?.message || 'success');
      },
      onError: (error) => {
        enqueueSnackbar(error?.data?.message || 'error');
        console.log(error);
      },
    }
  );
  return {
    createOrgStaff: mutate,
    isLoading,
  };
};

export const useGetAllStaff = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getGetAllStaff'],
    () => axiosInstance.get('/orgadminuser/all'),
    {
      enabled: true,
    }
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  };
};

export const useUpdateStaffById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data;
      const id = formData.get('id');
      return axiosInstance.put(`/orgadminuser/update/${id}`, formData);
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

export const useGetOneStaffById = (id) => {
  const { data, isError, isLoading } = useQuery(['_getOneStaffById'], () =>
    axiosInstance.get(`/orgadminuser/one/${id}`)
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
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
      return axiosInstance.put(`/orgadminuser/updatepassword/${id}`, formData);
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
      return axiosInstance.put(`/orgadminuser/updateStatus/${formData?.id}`, formData);
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
      return axiosInstance.delete(`/orgadminuser/delete/${_id}`);
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
  return { deleteStaff: mutate };
};