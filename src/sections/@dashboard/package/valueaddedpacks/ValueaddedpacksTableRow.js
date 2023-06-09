import { IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover/MenuPopover';

ValueaddedpacksTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
};

export default function ValueaddedpacksTableRow({ row, index, onEditRow }) {
  const [openPopover, setOpenPopover] = useState(null);

  const { _id, pack_name, service_type, quantity, price, validity } = row;

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };




  return (
    <>
      <TableRow hover>
        <TableCell align="left">{index + 1}</TableCell>

        <TableCell>
          {pack_name}
        </TableCell>
        <TableCell>
          {service_type}
        </TableCell>
        <TableCell>
          {quantity}
        </TableCell>
        <TableCell>
          {price}
        </TableCell>
        <TableCell>
          {validity}
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
