import { IconButton, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Iconify from '../../../../../components/iconify';
import Image from '../../../../../components/image';
import MenuPopover from '../../../../../components/menu-popover/MenuPopover';
import { useUpdateInstmanegerStatusById } from '../../../../../services/instmanegerServices';

InstmanegementTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onAddStaff: PropTypes.func,
  onViewDetail: PropTypes.func,
};

export default function InstmanegementTableRow({ row, index, onEditRow, onAddStaff, onViewDetail }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [statusPage, setStatusPage] = useState(null);

  const { _id, name, code, org_name, contact_no, email_id, city, instadminusers, inst_logo, status } = row;

  const { updateStatusInstmaneger } = useUpdateInstmanegerStatusById();

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  useEffect(() => {
    if (status === 'Active') {
      setStatusPage('Active');
    } else if (status === "Expired") {
      setStatusPage('Expired');
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
    updateStatusInstmaneger(payload);
  };


  return (
    <>
      <TableRow hover>
        <TableCell align="left">{index + 1}</TableCell>

        <TableCell
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          {inst_logo ? (
            <Image
              disabledEffect
              alt={name}
              src={inst_logo}
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

        <TableCell onClick={() => onViewDetail()} style={{ cursor: 'pointer' }}>
          {code}
        </TableCell>

        <TableCell onClick={() => onViewDetail()} style={{ cursor: 'pointer' }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>

        <TableCell onClick={() => onViewDetail()} style={{ cursor: 'pointer' }}>
          <Typography variant="subtitle2" noWrap>
            {org_name}
          </Typography>
        </TableCell>


        <TableCell onClick={() => onViewDetail()} style={{ cursor: 'pointer' }}>
          {contact_no}
        </TableCell>

        <TableCell onClick={() => onViewDetail()} style={{ cursor: 'pointer' }}>
          {email_id}
        </TableCell>

        <TableCell style={{ cursor: 'pointer' }}>
          {city}
        </TableCell>

        <TableCell style={{ cursor: 'pointer' }}>

        </TableCell>

        <TableCell style={{ cursor: 'pointer' }}>
          {instadminusers}
        </TableCell>
        <TableCell style={{ cursor: 'pointer' }}>

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
            <MenuItem value="Expired">Expired</MenuItem>
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
        <MenuItem
          onClick={() => {
            onAddStaff();
            handleClosePopover();
          }}
        >
          <Iconify icon="ri:user-add-line" />
          Inst User
        </MenuItem>
      </MenuPopover>
    </>
  );
}
