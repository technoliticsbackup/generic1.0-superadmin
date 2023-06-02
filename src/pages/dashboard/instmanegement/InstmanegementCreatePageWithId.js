import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { InstmanegementAddFormWithId } from '../../../sections/@dashboard/instmanegement';
import { useParams } from 'react-router-dom';

export default function InstmanegementCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();

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
        <InstmanegementAddFormWithId org_id={id} />
      </Container>
    </>
  );
}
