import { Avatar, IconButton, MenuItem, Stack, TableCell, TableRow, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Iconify from '../../../../../components/iconify';
import Image from '../../../../../components/image';
import MenuPopover from '../../../../../components/menu-popover/MenuPopover';
import { useStatusUpdateStaffById } from '../../../../../services/instmanegerServices';

InstmanegementTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onChangePassword: PropTypes.func,
  onDeleteRow: PropTypes.func,

};

export default function InstmanegementTableRow({ row, index, onEditRow, onChangePassword, onDeleteRow }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [statusPage, setStatusPage] = useState(null);

  const { _id, profile, name, contact_no, email_id, status, designation_name } = row;

  const { updateStaff } = useStatusUpdateStaffById();

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  useEffect(() => {
    if (status === 'Active') {
      setStatusPage('Active');
    } else {
      setStatusPage('InActive');
    }
  }, [status]);

  const onSubmit = async (data) => {
    setStatusPage(data);
    const payload = {
      id: _id,
      status: data,
    };
    updateStaff(payload);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{index + 1}</TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={profile} />

            <Typography>
              {name}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell style={{ cursor: 'pointer' }}>
          {designation_name}
        </TableCell>

        <TableCell style={{ cursor: 'pointer' }}>
          {contact_no}
        </TableCell>

        <TableCell style={{ cursor: 'pointer' }}>
          {email_id}
        </TableCell>

        <TableCell align="left">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={(e) => onSubmit(e.target.value)}
            value={statusPage}
            sx={{ height: '40px', width: 120 }}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="InActive">InActive</MenuItem>
          </Select>
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
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit User
        </MenuItem>
        <MenuItem
          onClick={() => {
            onChangePassword();
            handleClosePopover();
          }}
        >
          <Iconify icon="carbon:password" />
          Change Password
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDeleteRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="fluent-mdl2:delete" />
          Delete User
        </MenuItem>
      </MenuPopover>
    </>
  );
}
