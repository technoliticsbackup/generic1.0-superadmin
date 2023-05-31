import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { InstmanegementAddForm } from '../../../sections/@dashboard/instmanegement';

export default function InstmanegementCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Institution: New Institution</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="New Institution"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Institution',
              href: PATH_DASHBOARD.instmanagment.list,
            },
            { name: 'New Institution' },
          ]}
        />
        <InstmanegementAddForm />
      </Container>
    </>
  );
}
