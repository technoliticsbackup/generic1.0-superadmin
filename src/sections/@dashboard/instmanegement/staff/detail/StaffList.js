import { Card, Divider, Table, TableBody, TableContainer } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Scrollbar from '../../../../../components/scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  emptyRows,
  getComparator,
  useTable,
} from '../../../../../components/table';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import { useDeleteInstById, useGetAllStaff } from '../../../../../services/instmanegerServices';
import StaffTableRow from './StaffTableRow';
import StaffToolbar from './StaffToolbar';

const TABLE_HEAD = [
  { id: 'index', label: 'SNO', align: 'left' },
  { id: 'name', label: 'NAME', align: 'left' },
  { id: 'designation', label: 'DESIGNATION', align: 'left' },
  { id: 'contact_no', label: 'CONTACT NO', align: 'left' },
  { id: 'email_id', label: 'EMAIL ID', align: 'left' },
  { id: 'status', label: 'STATUS', align: 'left' },
  { id: '' },
];


const headers = [
  { label: 'NAME', key: 'name' },
  { label: 'STATUS', key: 'status' },
];

InstmanegementListPage.propTypes = {
  instId: PropTypes.string,
};

export default function InstmanegementListPage({instId}) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();


  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [getDownload, setGetDownload] = useState([]);
  const [filterName, setFilterName] = useState('');

  const {
    data
  } = useGetAllStaff(instId);

  const { deleteInst } = useDeleteInstById();

  useEffect(() => {
    if (data) {
      setTableData(data);
      setGetDownload(data);
    }
  }, [data]);


  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.instmanagment.editstaff(id));
  };

  const handleChangePassword = (id) => {
    navigate(PATH_DASHBOARD.instmanagment.changepassword(id));
  }

  const handleDeleteRow = (id) => {
    deleteInst(id)
    const filterData = tableData.filter((item) => item._id !== id);
    setTableData(filterData);
  };

  return (
    <>
      <Card>
        <StaffToolbar
          filterName={filterName}
          onFilterName={handleFilterName}
          headers={headers}
          getDownload={getDownload}
        />
        <Divider />

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StaffTableRow
                      key={row._id}
                      row={row}
                      index={index}
                      onEditRow={() => handleEditRow(row._id)}
                      onChangePassword={() => handleChangePassword(row._id)}
                      onDeleteRow={() => handleDeleteRow(row._id)}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                />

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          dense={dense}
          onChangeDense={onChangeDense}
        />
      </Card>
    </>
  );
}

function applyFilter({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (item) => item?.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
