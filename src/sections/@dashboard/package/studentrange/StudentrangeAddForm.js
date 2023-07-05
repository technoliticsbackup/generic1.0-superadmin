import { LoadingButton } from '@mui/lab';
import { Card, Button, Grid, Stack, IconButton } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import { useCreateStudentRange } from '../../../../services/studentrangeServices';
import Iconify from '../../../../components/iconify';

StudentrangeAddForm.propTypes = {
  range: PropTypes.array,
  readOnly: PropTypes.any,
  setReadOnly: PropTypes.func,
};

export default function StudentrangeAddForm({ range, readOnly, setReadOnly }) {
  const queryClient = useQueryClient();

  const [deleteRow, setDeleteRow] = useState([]);

  const methods = useForm({
    defaultValues: { range: range },
  });

  const { handleSubmit, control } = methods;

  const { createStudentrange } = useCreateStudentRange();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'range',
  });

  const onSubmit = (data) => {
    try {
      const payload = {
        studentRanges: data?.range,
        deleteRow: deleteRow,
      };
      createStudentrange(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries('_getGetAllStudentrange');
          onHandleReadOnly();
        },
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  const onHandleReadOnly = () => {
    setReadOnly(!readOnly);
  };

  const onRemoveRow = (item) => {
    setDeleteRow([...deleteRow, item]);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} sx={{ mb: 4 }}>
        <Card sx={{ p: 3, mt: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                {fields.map((item, index) => {
                  return (
                    <Grid container spacing={3} key={index} sx={{ mb: 3 }}>
                      <Grid item xs={5} md={5.5}>
                        <RHFTextField
                          type="number"
                          name={`range.${index}.min`}
                          label="Min"
                          inputProps={{ readOnly: readOnly }}
                        />
                      </Grid>
                      <Grid item xs={5} md={5.5}>
                        <RHFTextField
                          type="number"
                          name={`range.${index}.max`}
                          label="Max"
                          inputProps={{ readOnly: readOnly }}
                        />
                      </Grid>

                      {readOnly === true ? null : fields[fields?.length - 1] === item ? (
                        <Grid item xs={1} md={1}>
                          <IconButton
                            onClick={() => {
                              remove(index);
                              onRemoveRow(item?._id);
                            }}
                            color="inherit"
                            sx={{ position: 'absolute', right: 15, marginTop: 1.5 }}
                          >
                            <Iconify icon="akar-icons:cross" />
                          </IconButton>
                        </Grid>
                      ) : null}
                    </Grid>
                  );
                })}

                {readOnly === true ? null : (
                  <Button
                    size="small"
                    onClick={() => append({ min: '', max: '' })}
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    Add More
                  </Button>
                )}

                <Grid item xs={12} md={12} sx={{mt: 3}}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <LoadingButton
                        type="button"
                        variant="outlined"
                        disabled={!readOnly}
                        onClick={() => onHandleReadOnly()}
                        sx={{ mr: 2 }}
                      >
                        Edit
                      </LoadingButton>
                      <LoadingButton type="button" variant="outlined">
                        Log
                      </LoadingButton>
                    </div>
                    {readOnly === true ? null : (
                      <LoadingButton type="submit" variant="contained">
                        Submit
                      </LoadingButton>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </FormProvider>
        </Card>
      </Grid>
    </Grid>
  );
}
