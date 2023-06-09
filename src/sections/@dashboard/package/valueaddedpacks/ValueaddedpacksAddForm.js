/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormProvider, { RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import {
  useCreateValueaddedpack,
  useUpdateValueaddedpackById
} from '../../../../services/valueaddedpackServices';


ValueaddedpacksAddForm.propTypes = {
  isEdit: PropTypes.bool,
  data: PropTypes.func,
};

const SERVICETYPE = [
  "SMS",
  "WHATSAPP"
]

const VALIDITY = [
  "ONE TIME",
  "ANNUAL"
]

export default function ValueaddedpacksAddForm({ isEdit = false, data }) {
  const navigate = useNavigate();

  const { createValueaddedpack, isLoading: valueaddedpackIsLoading } = useCreateValueaddedpack();
  const { updateValueaddedpack, isLoading: updatevalueaddedpackIsLoading } = useUpdateValueaddedpackById();

  const NewValueaddedpackSchema = Yup.object().shape({
    pack_name: Yup.string().required('Pack Name is required'),
    service_type: Yup.string().required('Service Type is required'),
    quantity: Yup.string().required('Quantity is required'),
    price: Yup.string().required('Price is required'),
    validity: Yup.string().required('Validity is required'),
  });

  const defaultValues = useMemo(
    () => ({
      _id: data?._id || '',
      pack_name: data?.pack_name || '',
      service_type: data?.service_type || '',
      quantity: data?.quantity || '',
      price: data?.price || '',
      validity: data?.validity || '',
    }),
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(NewValueaddedpackSchema),
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
        id: defaultValues?._id,
        pack_name: _data.pack_name,
        service_type: _data?.service_type,
        quantity: _data?.quantity,
        price: _data?.price,
        validity: _data?.validity,
      };
      if (isEdit) {
        updateValueaddedpack(payload, {
          onSuccess: () => closeIt(),
        });
      } else {
        createValueaddedpack(payload, {
          onSuccess: () => closeIt(),
        });
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  const closeIt = () => {
    reset();
    navigate(PATH_DASHBOARD.valueaddedpacks.list);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RHFTextField name="pack_name" label="Pack Name" />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFSelect native name="service_type" label="Select Service Type" placeholder="Select Service Type">
            <option value="" />
            {SERVICETYPE?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </RHFSelect>
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFTextField name="quantity" label="Quantity" />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFTextField name="price" label="Price" />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFSelect native name="validity" label="Select Validity" placeholder="Select Validity">
            <option value="" />
            {VALIDITY?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </RHFSelect>
        </Grid>
      </Grid>

      <Stack alignItems="flex-end" sx={{ py: 3 }} spacing={3}>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting || valueaddedpackIsLoading || updatevalueaddedpackIsLoading}
        >
          {isEdit ? 'Update Now' : 'Create Now'}
        </LoadingButton>
      </Stack>

    </FormProvider>
  );
}
