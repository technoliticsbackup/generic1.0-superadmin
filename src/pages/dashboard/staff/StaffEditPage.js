import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
import { _userList } from '../../../_mock/arrays';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { useGetOneStaffById } from '../../../services/staffServices';
import StaffEditForm from '../../../sections/@dashboard/staff/StaffEditForm';
import BlankPage from '../BlankPage';
import LoadingScreen from '../../../components/loading-screen';


export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const { data: currentUser, isLoading, isError } = useGetOneStaffById(id);

  if (isLoading) return <LoadingScreen />;

  if (isError === true) return <BlankPage />;

  return (
    <>
      <Helmet>
        <title> User: Edit user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit user"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'User',
              href: PATH_DASHBOARD.user.list,
            },
            { name: currentUser?.name },
          ]}
        />

        <StaffEditForm isEdit currentUser={currentUser} />
      </Container>
    </>
  );
}
