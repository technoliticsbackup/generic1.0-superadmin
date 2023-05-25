import React, { useCallback, useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';

import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { fData } from '../../../utils/formatNumber';
import { PATH_DASHBOARD } from '../../../routes/paths';
import {
  useCreateDesignation,
  useUpdateDesignationById,
} from '../../../services/designationServices';

import LoadingScreen from '../../../components/loading-screen';
import {
  useGetAllDepartmentStatus
} from '../../../services/departmentServices';

OrgmanegementAddForm.propTypes = {
  isEdit: PropTypes.bool,
  data: PropTypes.func,
};

const stateAlldata = [
  { name: "MP" },
  { name: "CG" },
  { name: "UP" }
];

export default function OrgmanegementAddForm({ isEdit = false, data }) {
  const navigate = useNavigate();

  const { createDesignation, isLoading: designationIsLoading } = useCreateDesignation();
  const { updateDesignation, isLoading: updatedesignationIsLoading } = useUpdateDesignationById();

  const NewDesignationSchema = Yup.object().shape({
    name: Yup.string().required('Designation Name is required'),
    contact_no: Yup.string().required('Phone number is required'),
    email_id: Yup.string().required('Email is required').email('Email must be a valid email address'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    address: Yup.string().required('Address is required'),
  });

  const defaultValues = useMemo(
    () => ({
      _id: data?._id || '',
      name: data?.name || "",
      contact_no: data?.contact_no || '',
      email_id: data?.email_id || "",
      city: data?.city || "",
      state: data?.state || "",
      address: data?.address || ""
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
    setValue,
    formState: { isSubmitting },
  } = methods;

  const { data: departmentAlldata, isLoading: departmentIsLoading } = useGetAllDepartmentStatus();

  useEffect(() => {
    if (isEdit && data) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, data]);

  if (departmentIsLoading) return <LoadingScreen />;

  const onSubmit = async (_data) => {
    try {
      const payload = {
        id: data?._id,
        name: data?.name,
        contact_no: data?.contact_no,
        email_id: data?.email_id,
        city: data?.city,
        state: data?.state,
        address: data?.address
      };

      console.log(payload);

      // if (isEdit) {
      //   updateDesignation(payload, {
      //     onSuccess: () => closeIt(),
      //   });
      // } else {
      //   createDesignation(payload, {
      //     onSuccess: () => closeIt(),
      //   });
      // }
    } catch (error) {
      console.error('error', error);
    }
  };
  
  const handleDrop = () => {
   console.log("New Data")
  };


  const closeIt = () => {
    reset();
    navigate(PATH_DASHBOARD.orgmanagment.list);
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="logo"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(1145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="name" label="Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="contact_no" label="Contact No" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="email_id" label="Email Id" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="city" label="City" />
            </Grid>

            <Grid item xs={12} md={6}>
              <RHFSelect native name="state" label="Select State" placeholder="Select State">
                <option value="" />
                {stateAlldata?.map((item) => (
                  <option key={item?.name} value={item?.name}>
                    {item?.name}
                  </option>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="address" label="Address" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Stack alignItems='flex-end' sx={{ py: 3 }} spacing={3}>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting || designationIsLoading || updatedesignationIsLoading}
        >
          {isEdit ? 'Update Now' : 'Create Now'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

