import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import LoadingScreen from '../../../components/loading-screen';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useCreateInstmaneger } from '../../../services/instmanegerServices';
import { fData } from '../../../utils/formatNumber';

const stateAlldata = [{ name: 'MP' }, { name: 'CG' }, { name: 'UP' }];

const inst_type = ['SCHOOL', 'PRESCHOOL', 'COLLEGE', 'COACHING'];

export default function InstmanegementAddFormWithId({ org_id }) {
  const navigate = useNavigate();

  const { createInstmaneger, isLoading: instmanegerIsLoading } = useCreateInstmaneger();

  const NewDesignationSchema = Yup.object().shape({
    name: Yup.string().required('Designation Name is required'),
    inst_type: Yup.string().required('Inst Type is required'),
    contact_no: Yup.string().required('Phone number is required'),
    email_id: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    address: Yup.string().required('Address is required'),
  });

  const defaultValues = useMemo(
    () => ({
      _id: '',
      name: '',
      contact_no: '',
      email_id: '',
      city: '',
      state: '',
      inst_logo: '',
      address: '',
      inst_type: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (instmanegerIsLoading) return <LoadingScreen />;

  const onSubmit = async (data) => {
    try {
      const payload = new FormData();
      payload.set('id', defaultValues?._id);
      payload.append('inst_logo', data.inst_logo);
      payload.set('name', data?.name);
      payload.set('contact_no', data?.contact_no);
      payload.set('email_id', data?.email_id);
      payload.set('city', data?.city);
      payload.set('state', data?.state);
      payload.set('address', data?.address);
      payload.set('inst_type', data?.inst_type);
      payload.set('org_id', org_id);

      createInstmaneger(payload, {
        onSuccess: () => closeIt(),
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    if (file) {
      setValue('inst_logo', newFile, { shouldValidate: true });
    }
  };

  const closeIt = () => {
    reset();
    navigate(PATH_DASHBOARD.instmanagment.list);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="inst_logo"
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
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <RHFTextField name="name" label="Name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  type="number"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
                  }}
                  name="contact_no"
                  label="Contact No"
                />
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
                <RHFSelect
                  native
                  name="inst_type"
                  label="Select Inst Type"
                  placeholder="Select Inst Type"
                >
                  <option value="" />
                  {inst_type?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField name="address" label="Address" />
              </Grid>
            </Grid>
            <Stack alignItems="flex-end" sx={{ pt: 3 }} spacing={3}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || instmanegerIsLoading}
              >
                Create Now
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
