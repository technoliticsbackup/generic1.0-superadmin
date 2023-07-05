import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// assets
// components
import FormProvider, {
    RHFSelect,
    RHFTextField,
    RHFUploadAvatar
} from '../../../../components/hook-form';
import {
    useCreateOrgStaff,
    useGetAllDesignationTypeAdmin
} from '../../../../services/orgmanegerServices';
// ----------------------------------------------------------------------

StaffNewForm.propTypes = {
    isEdit: PropTypes.bool,
    id: PropTypes.node,
};

export default function StaffNewForm({ isEdit = false, id }) {
    const navigate = useNavigate();

    const { createOrgStaff, isLoading: staffIsLoading } = useCreateOrgStaff();

    const NewUserSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email_id: Yup.string().required('Email is required').email('Email must be a valid email address'),
        contact_no: Yup.string().required('Phone number is required'),
        designation: Yup.string().required('Designation is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = useMemo(
        () => ({
            profile: '',
            email_id: '',
            contact_no: '',
            designation: '',
            username: '',
            org_id: ''
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        reset,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    useEffect(() => {
        if (isEdit) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit]);

    const { data: designationAlldata } = useGetAllDesignationTypeAdmin();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('profile', data.profile);
            formData.set('username', data.username);
            formData.set('email_id', data.email_id);
            formData.set('contact_no', data.contact_no);
            formData.set('designation_id', data.designation);
            formData.set('org_id', id);
            formData.set('password', data.password);
            createOrgStaff(formData, {
                onSuccess: () => closeIt(),
            });
        } catch (error) {
            console.error('error', error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });
            if (file) {
                setValue('profile', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );

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
                                name="profile"
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
                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >

                            <RHFTextField name="username" label="Username" />
                            {designationAlldata?.length ? <RHFSelect native name="designation" label="Designation" placeholder="Designation">
                                <option value="" />
                                {designationAlldata.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </RHFSelect> : null}

                            <RHFTextField type="number"
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                }}
                                name="contact_no" label="Contact No" />
                            <RHFTextField name="email_id" label="Email ID" />
                            <RHFTextField name="password" type="password" label="Password" />
                        </Box>

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting || staffIsLoading}>
                                {!isEdit ? 'Create User' : 'Save Changes'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
