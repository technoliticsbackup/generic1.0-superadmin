import { Card, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from '../../../../../components/hook-form';
import Image from '../../../../../components/image/Image';

InstmanegementAddForm.propTypes = {
  isEdit: PropTypes.bool,
  instdata: PropTypes.func,
};

export default function InstmanegementAddForm({ instdata }) {

  const defaultValues = useMemo(
    () => ({
      _id: instdata?._id,
      name: instdata?.name,
      contact_no: instdata?.contact_no,
      email_id: instdata?.email_id,
      city: instdata?.city,
      state: instdata?.state,
      inst_logo: instdata?.inst_logo,
      address: instdata?.address,
      inst_type: instdata?.inst_type,
      org_id: instdata?.org_name,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [instdata]
  );

  const methods = useForm({
    defaultValues,
  });

  return (
    <FormProvider methods={methods} >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>

          <Card sx={{ py: 5, px: 3 }}>
            <Image
              alt="register"
              src={instdata?.inst_logo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              fill
              sx={{ borderRadius: '16px', objectFit: 'cover' }}
            />
          </Card>

        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="name" label="Name" inputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="contact_no" label="Contact No" inputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="email_id" label="Email Id" inputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="city" label="City" inputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="state" label="State" inputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="inst_type" label="Inst Type" inputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="org_id" label="Org" inputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="address" label="Address" inputProps={{ readOnly: true }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

