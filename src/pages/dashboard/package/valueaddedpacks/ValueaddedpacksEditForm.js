import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import LoadingScreen from '../../../../components/loading-screen';
import { useSettingsContext } from '../../../../components/settings';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { ValueaddedpacksAddForm } from '../../../../sections/@dashboard/package/valueaddedpacks';
import { useGetOneValueaddedpackById } from '../../../../services/valueaddedpackServices';

export default function DesignationEditForm() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const { data, isLoading } = useGetOneValueaddedpackById(id);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <Helmet>
        <title>Value Added Packs : Edit Value Added Packs</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Value Added Packs"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Value Added Packs',
              href: PATH_DASHBOARD.valueaddedpacks.list,
            },
            { name: data?.pack_name },
          ]}
        />

        <ValueaddedpacksAddForm data={data} isEdit />
      </Container>
    </>
  );
}
