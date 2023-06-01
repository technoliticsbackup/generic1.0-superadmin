import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import LoadingScreen from '../../../../components/loading-screen';
import { useSettingsContext } from '../../../../components/settings';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import StaffEditForm from '../../../../sections/@dashboard/instmanegement/staff/StaffEditForm';
import { useGetOneStaffById } from '../../../../services/instmanegerServices';

export default function InstmanegementEditForm() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const { data, isLoading, isError } = useGetOneStaffById(id);

  if (isLoading) return <LoadingScreen />;

  console.log("data", data)

  
  return (
    <>
      <Helmet>
        <title>Edit Staff : Edit Edit Staff</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Staff"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Institution',
              href: PATH_DASHBOARD.instmanagment.list,
            },
            { name: data?.name },
          ]}
        />

        <StaffEditForm currentUser={data} />
      </Container>
    </>
  );
}
