import { IconButton, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Iconify from '../../../../components/iconify';
import Image from '../../../../components/image';
import MenuPopover from '../../../../components/menu-popover/MenuPopover';
import { useUpdateOrgmanegerStatusById } from '../../../../services/orgmanegerServices';

StudentrangeTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
};


export default function StudentrangeTableRow({ row, index, onEditRow}) {

  const { _id, range } = row;




  return (
    <>
      <TableRow hover>
        <TableCell align="range">{range}</TableCell>
      </TableRow>
    </>
  );
}
