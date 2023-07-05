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
import { useCreateDepartment, useUpdateDepartmentById } from '../../../services/departmentServices';
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
        <Grid item xs={12} md={8}>
          <Card sx={{ pt: 3, pb: 3, px: 3 }}>
            <Grid item xs={12} md={12}>
              <RHFTextField name="name" label="Department Name" />
            </Grid>

            <Card sx={{ pt: 10, pb: 5, px: 3, mt: 3 }}>
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
            <Stack alignItems="flex-end" sx={{mt: 3}} spacing={3}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || departmentIsLoading || updatedepartmentIsLoading}
              >
                {isEdit ? 'Update Now' : 'Create Now'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
