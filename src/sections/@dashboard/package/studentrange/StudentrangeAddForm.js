import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import {
  useCreateStudentRange
} from '../../../../services/studentrangeServices';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

StudentrangeAddForm.propTypes = {
  range: PropTypes.array,
  readOnly: PropTypes.any,
  setReadOnly: PropTypes.func,
};

export default function StudentrangeAddForm({ range, readOnly, setReadOnly }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const [deleteRow, setDeleteRow] = useState([]);

  const methods = useForm({
    defaultValues: { range: range }
  });

  const {
    reset,
    handleSubmit,
    setValue,
    register,
    control
  } = methods;

  const { createStudentrange } = useCreateStudentRange();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "range"
  });

  const onSubmit = (data) => {
    try {
      const payload = {
        studentRanges: data?.range,
        deleteRow: deleteRow
      }
      createStudentrange(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries('_getGetAllStudentrange');
          onHandleReadOnly()
        }
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  const onHandleReadOnly = () => {
    setReadOnly(!readOnly)
  }


  const onRemoveRow = (item) => {
    setDeleteRow([...deleteRow, item])
  }

  return (
    <Grid container>
      <Grid item xs={12} md={5.2} sx={{ mb: 4 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <LoadingButton type="button" variant='outlined' disabled={!readOnly} onClick={() => onHandleReadOnly()} sx={{ mr: 2, height: 45 }}>
            Edit
          </LoadingButton>
          <LoadingButton type="button" variant="outlined">
            Log
          </LoadingButton>
        </div>
      </Grid>

      <Grid item xs={12} md={12}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {fields.map((item, index) => {
                return (
                  <Grid container spacing={3} key={index} sx={{ mb: 3 }}>
                    <Grid item xs={4} md={4}>
                      <RHFTextField type="number" name={`range.${index}.min`} label="Min" inputProps={{ readOnly: readOnly }} />
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <RHFTextField type="number" name={`range.${index}.max`} label="Max" inputProps={{ readOnly: readOnly }} />
                    </Grid>

                    {readOnly == true ? null : fields[fields?.length - 1] === item ? (
                      <Grid item xs={2} md={2}>
                        <LoadingButton
                          onClick={() => {
                            remove(index);
                            onRemoveRow(item?._id)
                          }}
                          type="button"
                          variant="contained"
                          sx={{ height: 55, backgroundColor: 'red', color: 'white' }}
                        >
                          Delete
                        </LoadingButton>
                      </Grid>
                    ) : null}
                    {readOnly == true ? null : fields[fields?.length - 1] === item ? (
                      <Grid item xs={2} md={2}>
                        <LoadingButton onClick={() => append({ min: "", max: "" })} type="button" variant="contained" sx={{ height: 55 }}>
                          Add More
                        </LoadingButton>
                      </Grid>
                    ) : null}
                  </Grid>
                );
              })}
              {readOnly == true ? null : (
                <Grid item xs={12} md={8}>
                  <Stack alignItems="flex-end" sx={{ py: 3 }} spacing={3}>
                    <LoadingButton type="submit" variant="contained">
                      Submit
                    </LoadingButton>
                  </Stack>
                </Grid>
              )}

            </Grid>
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  );
}