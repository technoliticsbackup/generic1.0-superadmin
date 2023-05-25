import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { OrgmanegementAddForm } from '../../../sections/@dashboard/orgmanegement';

export default function OrgmanegementCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Organization: New Organization</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="New Organization"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Organization',
              href: PATH_DASHBOARD.orgmanagment.list,
            },
            { name: 'New Organization' },
          ]}
        />
        <OrgmanegementAddForm />
      </Container>
    </>
  );
}
