import { Container } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import LoadingScreen from '../../../../components/loading-screen';
import { useSettingsContext } from '../../../../components/settings';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { StudentrangeAddForm } from '../../../../sections/@dashboard/package/studentrange';
import { useGetAllStudentrange } from '../../../../services/studentrangeServices';

export default function StudentrangeCreatePage() {
  const { themeStretch } = useSettingsContext();
  const [readOnly, setReadOnly] = useState(true)

  const {
    data,
    isLoading: studentrangeIsLoading,
  } = useGetAllStudentrange();

  if (studentrangeIsLoading) return <LoadingScreen />;

  console.log("data",data)

  return (
    <>
      <Helmet>
        <title>Student Range: New Student Range</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="New Student Range"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Student Range',
              href: PATH_DASHBOARD.studentrange.list,
            },
            { name: 'New Student Range' },
          ]}
        />
          <StudentrangeAddForm range={data} readOnly={readOnly} setReadOnly={setReadOnly} />
      </Container>
    </>
  );
}
