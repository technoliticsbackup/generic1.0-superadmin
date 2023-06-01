import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
// sections
import ChangePassword from '../../../../sections/@dashboard/instmanegement/staff/ChangePassword';

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title> User: Change Password | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Change Password"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Institution',
              href: PATH_DASHBOARD.instmanagment.list,
            },
            { name: 'Change Password' },
          ]}
        />
        <ChangePassword id={id} />
      </Container>
    </>
  );
}
