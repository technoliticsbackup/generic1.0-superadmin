import { IconButton, MenuItem, TableCell, TableRow, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover/MenuPopover';
import { useUpdatePackageById } from '../../../../services/packageServices';

PackageTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
};

export default function PackageTableRow({ row, index, onEditRow }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [statusPage, setStatusPage] = useState(null);

  const { _id, packageName, institutionNo, status } = row;

  const { updatePackage } = useUpdatePackageById();

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
    updatePackage(payload);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{index + 1}</TableCell>

        <TableCell>{packageName}</TableCell>
        <TableCell>{institutionNo}</TableCell>
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
    </>
  );
}
