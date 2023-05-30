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
import StaffNewForm from '../../../../sections/@dashboard/orgmanegement/staff/StaffNewForm';

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title> User: Create a new staff | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new staff"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Staff',
              href: PATH_DASHBOARD.staff.list,
            },
            { name: 'New staff' },
          ]}
        />
        <StaffNewForm id={id} />
      </Container>
    </>
  );
}
