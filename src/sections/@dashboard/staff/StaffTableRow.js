import { Divider, IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';
import MenuPopover from '../../../components/menu-popover/MenuPopover';
import { useStatusUpdateStaffById } from '../../../services/staffServices';

StaffTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  handleDetailsView: PropTypes.func,
  handleChangePassword: PropTypes.func,
};

export default function StaffTableRow({
  row,
  index,
  onEditRow,
  handleChangePassword,
  handleDetailsView,
}) {
  const [statusPage, setStatusPage] = useState(null);
  const [openPopover, setOpenPopover] = useState(null);
  const { _id, name, email_id, contact_no, designation_name, profile, status } = row;

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
        <TableCell
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          
        >
          {profile ? (
            <Image
              disabledEffect
              alt={name}
              src={profile}
              sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
            />
          ) : (
            <Image
              disabledEffect
              alt={name}
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
            />
          )}
        </TableCell>

        <TableCell  style={{ cursor: 'pointer' }}>
          {name}
        </TableCell>

        <TableCell  style={{ cursor: 'pointer' }}>
          {designation_name}
        </TableCell>

        <TableCell  style={{ cursor: 'pointer' }}>
          {contact_no}
        </TableCell>
        <TableCell  style={{ cursor: 'pointer' }}>
          {email_id}
        </TableCell>

        <TableCell align="left">
          {designation_name === 'Admin' ? (
            <MenuItem value="Active">Active</MenuItem>
          ) : (
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
          )}
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
        {designation_name === 'Admin' ? null : (
          <>
            <MenuItem
              onClick={() => {
                onEditRow();
                handleClosePopover();
              }}
            >
              Edit
            </MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )}

        <MenuItem
          onClick={() => {
            handleChangePassword();
            handleClosePopover();
          }}
        >
          Change Password
        </MenuItem>
      </MenuPopover>
    </>
  );
}
