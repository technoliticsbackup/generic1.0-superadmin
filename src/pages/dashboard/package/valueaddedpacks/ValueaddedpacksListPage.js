import { Button, Card, Container, Divider, Table, TableBody, TableContainer } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import Iconify from '../../../../components/iconify';
import LoadingScreen from '../../../../components/loading-screen';
import Scrollbar from '../../../../components/scrollbar';
import { useSettingsContext } from '../../../../components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  emptyRows,
  getComparator,
  useTable,
} from '../../../../components/table';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { ValueaddedpacksTableRow, ValueaddedpacksToolbar } from '../../../../sections/@dashboard/package/valueaddedpacks';
import { useGetAllValueaddedpack } from '../../../../services/valueaddedpackServices';

const TABLE_HEAD = [
  { id: 'index', label: 'SNO', align: 'left' },
  { id: 'pack_name', label: 'PACK NAME', align: 'left' },
  { id: 'service_type', label: 'SERVICE TYPE', align: 'left' },
  { id: 'quanity', label: 'QUANTITY', align: 'left' },
  { id: 'price', label: 'PRICE', align: 'left' },
  { id: 'validity', label: 'VALIDITY', align: 'left' },
  { id: '' },
];

const headers = [
  { label: 'NAME', key: 'name' },
  { label: 'STATUS', key: 'status' },
];

export default function DesignationListPage() {
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
    isLoading: valueaddedpackIsLoading,
  } = useGetAllValueaddedpack();

  useEffect(() => {
    if (data) {
      setTableData(data);
      setGetDownload(data);
    }
  }, [data]);

  console.log('data', data);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  if (valueaddedpackIsLoading) return <LoadingScreen />;

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.valueaddedpacks.edit(id));
  };

  return (
    <>
      <Helmet>
        <title>Value Added Packs</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Value Added Packs List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Value Added Packs', href: PATH_DASHBOARD.valueaddedpacks.root },
            { name: 'Value Added Packs List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.valueaddedpacks.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Value Added Packs
            </Button>
          }
        />

        <Card>
          <ValueaddedpacksToolbar
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
                      <ValueaddedpacksTableRow
                        key={row.id}
                        row={row}
                        index={index}
                        onEditRow={() => handleEditRow(row._id)}
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
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

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
      (item) => item?.pack_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 || item?.service_type.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
