/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Divider, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormProvider, { RHFCheckbox, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../routes/paths';
import {
  useCreateDesignation,
  useUpdateDesignationById,
} from '../../../services/designationServices';

import {
  useGetAllDepartmentStatus
} from '../../../services/departmentServices';
import LoadingScreen from '../../../components/loading-screen';



DesignationAddForm.propTypes = {
  isEdit: PropTypes.bool,
  data: PropTypes.func,
};

export default function DesignationAddForm({ isEdit = false, data }) {
  const navigate = useNavigate();

  const { createDesignation, isLoading: designationIsLoading } = useCreateDesignation();
  const { updateDesignation, isLoading: updatedesignationIsLoading } = useUpdateDesignationById();
  


  const NewDesignationSchema = Yup.object().shape({
    name: Yup.string().required('Designation Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      _id: data?._id || '',
      name: data?.name || '',
      staff: data?.staff || false,
      designation: data?.designation || false,
      department: data?.department || false,
    }),
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(NewDesignationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { data: departmentAlldata, isLoading: departmentIsLoading} = useGetAllDepartmentStatus();

  useEffect(() => {
    if (isEdit && data) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, data]);


  if (departmentIsLoading) return <LoadingScreen />;

 

  const onSubmit = async (_data) => {
    try {
      const payload = {
        name: _data?.name,
        id: defaultValues?._id,
        department_id: _data.department_id,
        staff: _data?.staff,
        designation: _data?.designation,
        department: _data?.department,
      };

      console.log("payload==", payload);
      if (isEdit) {
        updateDesignation(payload, {
          onSuccess: () => closeIt(),
        });
      } else {
        createDesignation(payload, {
          onSuccess: () => closeIt(),
        });
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  const closeIt = () => {
    reset();
    navigate(PATH_DASHBOARD.designation.list);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RHFTextField name="name" label="Designation Name" />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFSelect native name="department_id" label="Select Department" placeholder="Select Department">
            <option value="" />
            {departmentAlldata?.map((item) => (
              <option key={item?._id} value={item?._id}>
                {item?.name}
              </option>
            ))}
          </RHFSelect>
        </Grid>

        <Grid item xs={12} md={7} />

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }} spacing={3}>
            <Typography variant="h6">MANAGEMENT</Typography>
            <Divider borderColor="grey.500" sx={{ marginTop: '10px', marginBottom: '5px' }} />
            <Stack spacing={2}>
              <RHFCheckbox name="staff" label="Staff Management" />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }} spacing={3}>
            <Typography variant="h6">CONFIGRATION</Typography>
            <Divider borderColor="grey.500" sx={{ marginTop: '10px', marginBottom: '5px' }} />
            <Stack spacing={2}>
              <RHFCheckbox name="designation" label="Designation Management" />
              <RHFCheckbox name="department" label="Department Management" />
            </Stack>
          </Card>
        </Grid>

        <Stack alignItems="flex-start" sx={{ p: 3 }} spacing={3}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || designationIsLoading || updatedesignationIsLoading}
          >
            {isEdit ? 'Update Now' : 'Create Now'}
          </LoadingButton>
        </Stack>
      </Grid>
    </FormProvider>
  );
}
