import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { ValueaddedpacksAddForm } from '../../../../sections/@dashboard/package/valueaddedpacks';

export default function CategoryCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Value Added Packs: New Value Added Packs</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="New Value Added Packs"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Value Added Packs',
              href: PATH_DASHBOARD.valueaddedpacks.list,
            },
            { name: 'New Value Added Packs' },
          ]}
        />
        <ValueaddedpacksAddForm />
      </Container>
    </>
  );
}
