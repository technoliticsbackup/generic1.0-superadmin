import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// auth
// _mock_
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import {
  Detail,
  InstitutionsList
} from '../../../sections/@dashboard/orgmanegement/staff/detail';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../../../components/loading-screen';
import { useGetOneOrgmanegerById } from '../../../services/orgmanegerServices';
// ----------------------------------------------------------------------

export default function OrgmanegementDetailsPage() {
  const { themeStretch } = useSettingsContext();
  const [currentTab, setCurrentTab] = useState('organization_detail');

  const { id } = useParams();

  const { data, isLoading } = useGetOneOrgmanegerById(id);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <Helmet>
        <title> Organization: Detail | Super Admin</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Organization Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Organization', href: PATH_DASHBOARD.orgmanagment.root },
            { name: data?.name },
          ]}
        />
        
        <Button variant={currentTab === "organization_detail" ? "contained" : "outlined"} onClick={() => setCurrentTab("organization_detail")} color={currentTab === "organization_detail" ? "primary" : "inherit"} sx={{ mr: 2 }} >
          Organization Detail
        </Button>

        <Button variant={currentTab === "institutions_list" ? "contained" : "outlined"} onClick={() => setCurrentTab("institutions_list")} color={currentTab === "institutions_list" ? "primary" : "inherit"} >
          Institutions List
        </Button>

        <div style={{ marginTop: 50 }}>
          {currentTab === "organization_detail" ? <Detail data={data} /> : null}
          {currentTab === "institutions_list" ? <InstitutionsList orgId={id} /> : null}
        </div>

      </Container>
    </>
  );
}
