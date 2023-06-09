/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridCellEditStopReasons, GridCellModes } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormProvider, { RHFSelect } from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import {
  useCreatePricingtiers
} from '../../../../services/pricingtiersServices';
import { useQueryClient } from '@tanstack/react-query';


PricingtiersAddForm.propTypes = {
  isEdit: PropTypes.bool,
  data: PropTypes.any,
  rows: PropTypes.any,
  columns: PropTypes.any,
};

const PACKAGENAME = [
  "FREE",
  "SILVER",
  "GOLD",
  "PLATINUM",
]


export default function PricingtiersAddForm({ isEdit = false, data, columns, rows }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { createPricingtiers, isLoading: updatePricingtiersIsLoading } = useCreatePricingtiers();

  const [instRow, setInstRow] = useState(rows)

  const [cellModesModel, setCellModesModel] = useState({});

  const NewValueaddedpackSchema = Yup.object().shape({
    package_name: Yup.string().required('Package Name is required'),

  });

  const defaultValues = useMemo(
    () => ({
      _id: data?._id || '',
      package_name: data?.package_name || '',
    }),
    [data]
  );

  useEffect(() => {
    const form = document.querySelector('form');
    form.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
  }, []);

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
        package_name: _data.package_name,
        rows: instRow
      };
      createPricingtiers(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries('_getOnePricingtiersById');
          closeIt()
        }
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  const closeIt = () => {
    reset();
    navigate(PATH_DASHBOARD.pricingtiers.list);
  };


  const handleCellClick = React.useCallback((params) => {
    setCellModesModel((prevModel) => {
      return {
        ...Object.keys(prevModel).reduce(
          (acc, id) => ({
            ...acc,
            [id]: Object.keys(prevModel[id]).reduce(
              (acc2, field) => ({
                ...acc2,
                [field]: { mode: GridCellModes.View },
              }),
              {}
            ),
          }),
          {}
        ),
        [params.id]: {
          ...Object.keys(prevModel[params.id] || {}).reduce(
            (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
            {}
          ),
          [params.field]: { mode: GridCellModes.Edit },
        },
      };
    });
  }, []);


  const handleCellModesModelChange = React.useCallback((newModel) => {
    setCellModesModel(newModel);
  }, []);

  const processRowUpdate = (newRow, oldRow) => {
    setInstRow(prevRows => {
      const updatedRows = prevRows.map(row => {
        if (row.id === newRow.id) {
          return newRow;
        }
        return row;
      });
      return updatedRows;
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={6}>
          <RHFSelect native name="package_name" label="Select Package Name" placeholder="Select Package Name">
            <option value="" />
            {PACKAGENAME?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </RHFSelect>
        </Grid>

        <Grid item xs={12} md={12}>
          <Box sx={{ height: 100, width: '100%', }}>
            <DataGrid
              density="compact"
              hideFooter
              rows={instRow || []}
              columns={columns || []}
              experimentalFeatures={{ newEditingApi: true }}
              cellModesModel={cellModesModel}
              onCellModesModelChange={handleCellModesModelChange}
              onCellClick={handleCellClick}
              processRowUpdate={processRowUpdate}
              onCellEditStop={(params, event) => {
                if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                  event.defaultMuiPrevented = true;
                }
              }}
              disableColumnMenu
            />
          </Box>
        </Grid>
      </Grid>

      <Stack alignItems="flex-end" sx={{ py: 3 }} spacing={3}>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting || updatePricingtiersIsLoading}
        >
          {isEdit ? 'Update Now' : 'Create Now'}
        </LoadingButton>
      </Stack>

    </FormProvider>
  );
}