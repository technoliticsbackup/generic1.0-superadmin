/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormProvider, { RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../routes/paths';
import {
  useCreateDepartment,
  useUpdateDepartmentById,
} from '../../../services/departmentServices';
import { fData } from '../../../utils/formatNumber';


DepartmentAddForm.propTypes = {
  isEdit: PropTypes.bool,
  data: PropTypes.func,
};

export default function DepartmentAddForm({ isEdit = false, data }) {
  const navigate = useNavigate();

  const { createDepartment, isLoading: departmentIsLoading } = useCreateDepartment();
  const { updateDepartment, isLoading: updatedepartmentIsLoading } = useUpdateDepartmentById();

  const NewDepartmentSchema = Yup.object().shape({
    name: Yup.string().required('Department Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      _id: data?._id || '',
      name: data?.name || '',
    }),
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(NewDepartmentSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && data) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, data]);

  const onSubmit = async (_data) => {
    try {
      const payload = new FormData();
      payload.set('id', defaultValues?._id);
      payload.append('icon', _data.icon);
      payload.set('name', _data?.name);
      
      if (isEdit) {
        updateDepartment(payload, {
          onSuccess: () => closeIt(),
        });
      } else {
        createDepartment(payload, {
          onSuccess: () => closeIt(),
        });
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  const closeIt = () => {
    reset();
    navigate(PATH_DASHBOARD.department.list);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('icon', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>


      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="icon"
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
        <Grid item xs={12} md={6}>
          <RHFTextField name="name" label="Department Name" />
        </Grid>

        <Grid item xs={12} md={7} />

        {/* <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }} spacing={3}>
            <Typography variant="h6">CONFIGRATION</Typography>
            <Divider borderColor="grey.500" sx={{ marginTop: '10px', marginBottom: '5px' }} />
            <Stack spacing={2}>
              <RHFCheckbox name="Department" label="Department Management" />
              <RHFCheckbox name="department" label="Department Management" />

               <RHFCheckbox name="order" label="Order Management" />
              <Stack spacing={0} style={{ marginLeft: '50px' }}>
                <RHFCheckbox name="all" label="All" />
                <RHFCheckbox name="pending" label="Pending" />
                <RHFCheckbox name="designing" label="Designing" />
                <RHFCheckbox name="acnoc" label="AC/NOC" />
                <RHFCheckbox name="processing" label="Processing" />
                <RHFCheckbox name="ready" label="Ready" />
                <RHFCheckbox name="dispatched" label="Dispatched" />
                <RHFCheckbox name="cancelled" label="Cancelled" />
              </Stack>
              <RHFCheckbox name="productmanagement" label="Product Management" /> 
            </Stack>
          </Card>
        </Grid>
         <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }} spacing={3}>
            <Typography variant="h6">Enquiry Management</Typography>
            <Divider borderColor="grey.500" sx={{ marginTop: '10px', marginBottom: '5px' }} />
            <Stack spacing={2}>
              <RHFCheckbox name="contactenquiries" label="Contact Enquires" />
              <RHFCheckbox name="productenquiry" label="Product Enquires" />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }} spacing={3}>
            <Typography variant="h6">CONFIGRATION</Typography>
            <Divider borderColor="grey.500" sx={{ marginTop: '10px', marginBottom: '5px' }} />
            <Stack spacing={2}>
              <RHFCheckbox name="testimonials" label="Testimonial" />
              <RHFCheckbox name="blogmanagement" label="Blog" />
              <RHFCheckbox name="banner" label="Banner management" />
              <RHFCheckbox name="client" label="Client" />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }} spacing={3}>
            <Typography variant="h6">POSTS</Typography>
            <Divider borderColor="grey.500" sx={{ marginTop: '10px', marginBottom: '5px' }} />
            <Stack spacing={2}>
              <RHFCheckbox name="category" label="Category" />
              <RHFCheckbox name="subcategory" label="Sub Category" />
              <RHFCheckbox name="supersubcategory" label="Super Sub Category" />

              <RHFCheckbox name="brandmanagement" label="Brand Management" />
              <RHFCheckbox name="Department" label="Department And Rights" />
              <RHFCheckbox name="discount" label="Discount" />
              <RHFCheckbox name="generalconfig" label="General Config" />
              <RHFCheckbox name="offer" label="Offer" />
            </Stack>
          </Card>
        </Grid> */}


      </Grid>
      <Stack alignItems="flex-end" spacing={3}>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting || departmentIsLoading || updatedepartmentIsLoading}
        >
          {isEdit ? 'Update Now' : 'Create Now'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
