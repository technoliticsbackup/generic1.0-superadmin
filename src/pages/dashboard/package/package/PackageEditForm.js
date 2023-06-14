import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import LoadingScreen from '../../../../components/loading-screen';
import { useSettingsContext } from '../../../../components/settings';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { PackageAddForm } from '../../../../sections/@dashboard/package/package';
import { useGetOnePackageById } from '../../../../services/packageServices';

export default function PackageEditForm() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const { data, isLoading } = useGetOnePackageById(id);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <Helmet>
        <title>Package : Edit Package</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Package"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Package',
              href: PATH_DASHBOARD.packages.list,
            },
            { name: data?.packageName },
          ]}
        />

        <PackageAddForm data={data} isEdit />
      </Container>
    </>
  );
}
