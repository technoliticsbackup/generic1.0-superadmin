/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../routes/paths';
import {
  useCreateDesignation,
  useUpdateDesignationById,
} from '../../../services/designationServices';

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
      const payload = {
        name: _data?.name,
        id: defaultValues?._id,
      };
      if (isEdit) {
        console.log("payload==",payload);
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
        <Grid item xs={12} md={5}>
          <RHFTextField name="name" label="Designation Name" />
        </Grid>

        <Grid item xs={12} md={7} />

        {/* <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }} spacing={3}>
            <Typography variant="h6">ECOM Management</Typography>
            <Divider borderColor="grey.500" sx={{ marginTop: '10px', marginBottom: '5px' }} />
            <Stack spacing={2}>
              <RHFCheckbox name="addstaff" label="Staff Management" />
              <RHFCheckbox name="customer" label="Customer Management" />
              <RHFCheckbox name="dealerManagement" label="Dealer Management" />
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
        </Grid> */}

        {/* <Grid item xs={12} md={6}>
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
              <RHFCheckbox name="designation" label="Designation And Rights" />
              <RHFCheckbox name="discount" label="Discount" />
              <RHFCheckbox name="generalconfig" label="General Config" />
              <RHFCheckbox name="offer" label="Offer" />
            </Stack>
          </Card>
        </Grid> */}

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
