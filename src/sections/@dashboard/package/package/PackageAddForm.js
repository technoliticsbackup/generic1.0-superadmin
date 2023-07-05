/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormProvider, {
  RHFCheckbox,
  RHFTextField,
  RHFEditor,
} from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useCreatePackage, useUpdatePackageById } from '../../../../services/packageServices';
import Iconify from '../../../../components/iconify/Iconify';

PackageAddForm.propTypes = {
  isEdit: PropTypes.bool,
  data: PropTypes.func,
};

export default function PackageAddForm({ isEdit = false, data }) {
  const navigate = useNavigate();

  const { createPackage, isLoading: packageIsLoading } = useCreatePackage();
  const { updatePackage, isLoading: updatepackageIsLoading } = useUpdatePackageById();

  const NewValueaddedpackSchema = Yup.object().shape({
    packageName: Yup.string().required('Package Name is required'),
    description: Yup.string().required('Service Type is required'),
  });

  const defaultValues = useMemo(
    () => ({
      _id: data?._id || '',
      packageName: data?.packageName || '',
      description: data?.description || '',
      featureLabels: data?.featureLabels,
      fee_advance: data?.fee_advance || false,
      fee_standard: data?.fee_standard || false,
      gallery_advance: data?.gallery_advance || false,
      gallery_standard: data?.gallery_standard || false,
      post_advance: data?.post_advance || false,
      post_standard: data?.post_standard || false,
      studend_standard: data?.studend_standard || false,
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
    control,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'featureLabels',
  });

  useEffect(() => {
    append();
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
        packageName: _data.packageName,
        description: _data?.description,
        featureLabels: _data?.featureLabels,
        fee_advance: _data?.fee_advance,
        fee_standard: _data?.fee_standard,
        gallery_advance: _data?.gallery_advance,
        gallery_standard: _data?.gallery_standard,
        post_advance: _data?.post_advance,
        post_standard: _data?.post_standard,
        studend_standard: _data?.studend_standard,
      };
      if (isEdit) {
        updatePackage(payload, {
          onSuccess: () => closeIt(),
        });
      } else {
        createPackage(payload, {
          onSuccess: () => closeIt(),
        });
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  const closeIt = () => {
    reset();
    navigate(PATH_DASHBOARD.packages.list);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <RHFTextField name="packageName" label="Package Name" />
              </Grid>

              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Description
                  </Typography>

                  <RHFEditor simple name="description" />
                </Stack>
              </Grid>

              {fields.map((item, index) => {
                return (
                  <>
                    <Grid item xs={12} md={12}>
                      <RHFTextField
                        name={`featureLabels.${index}.label`}
                        label={`Feature Label ${index + 1}`}
                      />
                      <IconButton
                        onClick={() => remove(index)}
                        color="inherit"
                        sx={{ position: 'absolute', right: 30, marginTop: 1.5 }}
                      >
                        <Iconify icon="akar-icons:cross" />
                      </IconButton>
                    </Grid>
                  </>
                );
              })}

              <Grid item xs={12} md={6}>
                <Button
                  size="small"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={append}
                  sx={{ flexShrink: 0 }}
                >
                  Add More Feature
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, mt: 3 }}>
            <Grid container spacing={3} >
              <Grid item xs={12} md={12}>
                <Typography variant="h6">CONFIGRATION</Typography>
                <Divider borderColor="grey.500" sx={{ marginTop: '10px', marginBottom: '5px' }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bolder' }}>
                      STUDENT
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <RHFCheckbox name="studend_standard" label="Standard" />
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bolder' }}>
                      FEE
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <RHFCheckbox name="fee_standard" label="Standard" />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <RHFCheckbox name="fee_advance" label="Advance (With Automation)" />
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bolder' }}>
                      POST
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <RHFCheckbox name="post_standard" label="Standard" />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <RHFCheckbox name="post_advance" label="Advance (With Automation)" />
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bolder' }}>
                      GALLERY
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <RHFCheckbox name="gallery_standard" label="Standard" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <RHFCheckbox name="gallery_advance" label="AI Based Gallery" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack alignItems="flex-end" sx={{ py: 3 }} spacing={3}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting || packageIsLoading || updatepackageIsLoading}
            >
              {isEdit ? 'Update Now' : 'Create Now'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
