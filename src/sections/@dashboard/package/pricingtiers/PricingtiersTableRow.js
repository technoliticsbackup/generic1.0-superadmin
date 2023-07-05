import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Iconify from '../../../../components/iconify';
import LoadingScreen from '../../../../components/loading-screen';
import MenuPopover from '../../../../components/menu-popover/MenuPopover';
import { useGetAllStudentrange } from '../../../../services/studentrangeServices';

ValueaddedpacksTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
};

export default function ValueaddedpacksTableRow({ row, index, onEditRow }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [open, setOpen] = React.useState(false);

  const { _id, package_name, rows } = row;

  const {
    data: allValue,
    isLoading: studentrangeIsLoading,
  } = useGetAllStudentrange();

  if (studentrangeIsLoading) return <LoadingScreen />;

  const columns = []

  allValue?.map((item, index) => {
    columns.push({
      field: `${item?.min}-${item?.max}`,
      headerName: `${item?.min}-${item?.max}`,
    })
  });

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{index + 1}</TableCell>
        <TableCell>
          {package_name}
        </TableCell>

        <TableCell>
          <LoadingButton
            // fullWidth
            type="button"
            variant="contained"
            size="small"
            onClick={() => handleClickOpen()}
          >
            View Matrix
          </LoadingButton>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
        <MenuItem>
          <Iconify icon="octicon:log-16" />
          log
        </MenuItem>
      </MenuPopover>

      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Matrix</DialogTitle>
        <DialogContent>

          <Box sx={{ height: 150, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              hideFooter
              disableRowSelectionOnClick
            />
          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
