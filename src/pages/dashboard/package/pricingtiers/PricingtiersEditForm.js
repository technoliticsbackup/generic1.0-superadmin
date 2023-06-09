import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import LoadingScreen from '../../../../components/loading-screen';
import { useSettingsContext } from '../../../../components/settings';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { PricingtiersAddForm } from '../../../../sections/@dashboard/package/pricingtiers';
import { useGetOnePricingtiersById } from '../../../../services/pricingtiersServices';
import { useGetAllStudentrange } from '../../../../services/studentrangeServices';

export default function PricingtiersEditForm() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const { data, isLoading } = useGetOnePricingtiersById(id);
  const {
    data: allValue,
    isLoading: studentrangeIsLoading,
  } = useGetAllStudentrange();

  if (isLoading) return <LoadingScreen />;

  const columns = []

  allValue?.map((item, index) => {
    columns.push({
      field: `${item?.min}-${item?.max}`,
      headerName: `${item?.min}-${item?.max}`,
      width: 150,
      editable: true,
    })
  });


  return (
    <>
      <Helmet>
        <title>Pricing Tiers: New Pricing Tiers</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="New Pricing Tiers"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Pricing Tiers',
              href: PATH_DASHBOARD.pricingtiers.list,
            },
            { name: 'New Pricing Tiers' },
          ]}
        />
        <PricingtiersAddForm columns={columns} data={data} rows={data?.rows} />
      </Container>
    </>
  );
}
