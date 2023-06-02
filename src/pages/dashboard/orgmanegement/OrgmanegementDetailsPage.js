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
} from '../../../sections/@dashboard/orgmanegement/staff/detail';

// ----------------------------------------------------------------------

export default function OrgmanegementDetailsPage() {
  const { themeStretch } = useSettingsContext();


  const [currentTab, setCurrentTab] = useState('organization_detail');


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
            { name: 'Organization', href: PATH_DASHBOARD.instmanagment.root }
          ]}
        />

        <Button variant={currentTab === "organization_detail" ? "contained" : "outlined"} onClick={()=> setCurrentTab("Organization_detail")} color={currentTab === "organization_detail" ? "primary" : "inherit"} sx={{ mr: 2 }} >
          Organization Detail
        </Button>

        <Button variant={currentTab === "organization_other" ? "contained" : "outlined"} onClick={()=> setCurrentTab("Organization_other")} color={currentTab === "organization_other" ? "primary" : "inherit"} >
          Other
        </Button>

        <div style={{marginTop: 50}}>
          {currentTab === "organization_detail" ? <Detail /> : null}
        </div>

      </Container>
    </>
  );
}
