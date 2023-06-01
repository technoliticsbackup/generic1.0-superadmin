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
} from '../../../sections/@dashboard/instmanegement/staff/detail';

// ----------------------------------------------------------------------

export default function InstmanegementDetailsPage() {
  const { themeStretch } = useSettingsContext();


  const [currentTab, setCurrentTab] = useState('institution_detail');


  return (
    <>
      <Helmet>
        <title> Institution: Detail | Super Admin</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Institution Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Institution', href: PATH_DASHBOARD.instmanagment.root }
          ]}
        />

        <Button variant={currentTab === "institution_detail" ? "contained" : "outlined"} onClick={()=> setCurrentTab("institution_detail")} color={currentTab === "institution_detail" ? "primary" : "inherit"} sx={{ mr: 2 }} >
          Institution Detail
        </Button>

        <Button variant={currentTab === "institution_other" ? "contained" : "outlined"} onClick={()=> setCurrentTab("institution_other")} color={currentTab === "institution_other" ? "primary" : "inherit"} >
          Other
        </Button>

        <div style={{marginTop: 50}}>
          {currentTab === "institution_detail" ? <Detail /> : null}
        </div>

      </Container>
    </>
  );
}
