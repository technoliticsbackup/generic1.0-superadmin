import { Button, Card, Container, Divider, Table, TableBody, TableContainer } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Iconify from '../../../components/iconify';
import LoadingScreen from '../../../components/loading-screen';
import Scrollbar from '../../../components/scrollbar';
import { useSettingsContext } from '../../../components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  emptyRows,
  getComparator,
  useTable,
} from '../../../components/table';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { InstmanegementTableRow, InstmanegementToolbar } from '../../../sections/@dashboard/instmanegement';
import { useGetAllInstmaneger, useDeleteInstById } from '../../../services/instmanegerServices';
import BlankPage from '../BlankPage';


const TABLE_HEAD = [
  { id: 'index', label: 'SNO', align: 'left' },
  { id: 'org_logo', label: 'LOGO', align: 'left' },
  { id: 'inst_code', label: 'INST', align: 'left' },
  { id: 'name', label: 'NAME', align: 'left', },
  { id: 'org_name', label: 'ORG', align: 'left' },
  { id: 'contact_no', label: 'CONTACT', align: 'left' },
  { id: 'email_id', label: 'EMAIL ID', align: 'left' },
  { id: 'city', label: 'CITY', align: 'left' },
  { id: 'student', label: 'STUDENTS', align: 'left' },
  { id: 'staff', label: 'STAFF', align: 'left' },
  { id: 'validtill', label: 'VALIDITY', align: 'left' },
  { id: 'status', label: 'STATUS', align: 'left' },
  { id: '' },
];

const headers = [
  { label: 'NAME', key: 'name' },
  { label: 'STATUS', key: 'status' },
];

export default function InstmanegementListPage() {
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

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [getDownload, setGetDownload] = useState([]);
  const [filterName, setFilterName] = useState('');

  const {
    data,
    isLoading: designationIsLoading,
    isError: designationIsError,
  } = useGetAllInstmaneger();

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

  if (designationIsLoading) return <LoadingScreen />;

  if (designationIsError) return <BlankPage />;

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.instmanagment.edit(id));
  };

  const handleViewDetail = (id) => {
    navigate(PATH_DASHBOARD.instmanagment.view(id));
  };


  const handleDeleteRow = (id) => {
    deleteInst(id)
    const filterData = tableData.filter((item) => item._id !== id);
    setTableData(filterData);
  };

  const handleAddStaff = (id) => {
    navigate(PATH_DASHBOARD.instmanagment.addstaff(id));
  };


  return (
    <>
      <Helmet>
        <title>Institution</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Institution List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Institution', href: PATH_DASHBOARD.instmanagment.root },
            { name: 'Institution List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.instmanagment.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Institution
            </Button>
          }
        />

        <Card>
          <InstmanegementToolbar
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
                      <InstmanegementTableRow
                        key={row._id}
                        row={row}
                        index={index}
                        onEditRow={() => handleEditRow(row._id)}
                        onViewDetail={()=> handleViewDetail(row._id)}
                        onDeleteRow={() => handleDeleteRow(row._id)}
                        onAddStaff={() => handleAddStaff(row._id)}

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
      </Container>
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
