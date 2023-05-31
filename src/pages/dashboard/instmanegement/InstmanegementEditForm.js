import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import LoadingScreen from '../../../components/loading-screen';
import { useSettingsContext } from '../../../components/settings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { InstmanegementAddForm } from '../../../sections/@dashboard/instmanegement';
import { useGetOneOrgmanegerById } from '../../../services/orgmanegerServices';
import BlankPage from '../BlankPage';

export default function InstmanegementEditForm() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const { data, isLoading, isError } = useGetOneOrgmanegerById(id);

  if (isLoading) return <LoadingScreen />;

  if (isError) return <BlankPage />;
  
  return (
    <>
      <Helmet>
        <title>Designation : Edit Designation</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Institution"
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

        <InstmanegementAddForm orgdata={data} isEdit />
      </Container>
    </>
  );
}
