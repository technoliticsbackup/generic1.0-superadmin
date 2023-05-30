import { Container } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import LoadingScreen from '../../../components/loading-screen';
import { useSettingsContext } from '../../../components/settings';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { OrgmanegementAddForm } from '../../../sections/@dashboard/orgmanegement';
import { useGetOneOrgmanegerById } from '../../../services/orgmanegerServices';
import BlankPage from '../BlankPage';

export default function OrgmanegementEditForm() {
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
          heading="Edit Organization"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Organization',
              href: PATH_DASHBOARD.orgmanagment.list,
            },
            { name: data?.name },
          ]}
        />

        <OrgmanegementAddForm orgdata={data} isEdit />
      </Container>
    </>
  );
}
