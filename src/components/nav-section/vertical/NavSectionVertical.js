import { Box, List } from '@mui/material';
import PropTypes from 'prop-types';
import { useAuthContext } from '../../../auth/useAuthContext';
import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgColor from '../../svg-color';
import NavList from './NavList';
import { StyledSubheader } from './styles';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {

  dashboard: icon('ic_dashboard'),
  user: icon('ic_user'),
  department: icon('ic_department'),
  employeemanagement: icon('ic_employeemanagement'),
  institution: icon('ic_institution'),
  organization: icon('ic_organization'),
  permissionsettings: icon('ic_permissionsettings'),
};

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavSectionVertical({ isCollapse = false, ...other }) {

  const { user } = useAuthContext();

  return (
    <Box {...other}>
      <List disablePadding sx={{ px: 2 }}>
        <StyledSubheader>DASHBOARD</StyledSubheader>
        <NavList
          data={{ title: 'Dashboard', path: "/dashboard/app", icon: ICONS.dashboard }}
          depth={1}
        />
      </List>

      {user?.designations.staff ? <List disablePadding sx={{ px: 2 }}>
        <StyledSubheader>MANAGEMENT</StyledSubheader>
        <NavList
          data={{ title: 'Staff managment', path: PATH_DASHBOARD.staff.root, icon: ICONS.employeemanagement }}
          depth={1}
        />
        <NavList
          data={{ title: 'Organization Management', path: PATH_DASHBOARD.orgmanagment.list, icon: ICONS.organization }}
          depth={1}
        />
        <NavList
          data={{ title: 'Institution Management', path: PATH_DASHBOARD.instmanagment.list, icon: ICONS.institution }}
          depth={1}
        />

        <NavList
          data={{
            title: 'Package Management',
            path: PATH_DASHBOARD.studentrange.list,
            icon: ICONS.permissionsettings,
            children: [
              { title: 'Student Range', path: PATH_DASHBOARD.studentrange.list},
              { title: 'Pricing Tiers', path: PATH_DASHBOARD.pricingtiers.list},
              { title: 'Value Added Packs', path: PATH_DASHBOARD.valueaddedpacks.list},
              { title: 'Packages', path: PATH_DASHBOARD.packages.list},
            ],
          }}
          depth={1}
          hasChild={[
            { title: 'Student Range', path: PATH_DASHBOARD.studentrange.list},
            { title: 'Pricing Tiers', path: PATH_DASHBOARD.pricingtiers.list},
            { title: 'Value Added Packs', path: PATH_DASHBOARD.valueaddedpacks.list},
            { title: 'Packages', path: PATH_DASHBOARD.packages.list},
          ]}
        />

      </List> : null}

      {user?.designations.department && user?.designations.designation ? (
        <List disablePadding sx={{ px: 2 }}>
          <StyledSubheader>configuration</StyledSubheader>
          {user?.designations.department ? <NavList
            data={{ title: 'Department', path: PATH_DASHBOARD.department.list, icon: ICONS.department }}
            depth={1}
          />
            : null}

          {user?.designations.designation ?
            <NavList
              data={{ title: 'Designation', path: PATH_DASHBOARD.designation.list, icon: ICONS.permissionsettings }}
              depth={1}
            />
            : null}

        </List>
      ) : null}

    </Box>
  );
}
