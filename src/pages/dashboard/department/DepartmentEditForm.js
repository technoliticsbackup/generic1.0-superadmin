import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import LoadingScreen from '../../../components/loading-screen';
import { useSettingsContext } from '../../../components/settings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { DepartmentAddForm } from '../../../sections/@dashboard/department';
import { useGetOneDepartmentById } from '../../../services/departmentServices';
import BlankPage from '../BlankPage';

export default function DepartmentEditForm() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const { data, isLoading, isError } = useGetOneDepartmentById(id);

  if (isLoading) return <LoadingScreen />;

  if (isError) return <BlankPage />;
  return (
    <>
      <Helmet>
        <title>Department : Edit Department</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Department"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Department',
              href: PATH_DASHBOARD.department.list,
            },
            { name: data?.name },
          ]}
        />

        <DepartmentAddForm data={data} isEdit />
      </Container>
    </>
  );
}
