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
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  category: icon('ic_category'),
  subcategory: icon('ic_sub_category'),
  supercategory: icon('ic_super_category'),
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
          data={{ title: 'Staff managment', path: PATH_DASHBOARD.staff.root, icon: ICONS.user }}
          depth={1}
        />
        <NavList
          data={{ title: 'Organization Management', path: PATH_DASHBOARD.orgmanagment.list, icon: ICONS.user }}
          depth={1}
        />
      </List> : null}

      {user?.designations.department && user?.designations.designation ? (
        <List disablePadding sx={{ px: 2 }}>
          <StyledSubheader>configuration</StyledSubheader>
          {user?.designations.department ? <NavList
            data={{ title: 'Department', path: PATH_DASHBOARD.department.list, icon: ICONS.user }}
            depth={1}
          />
            : null}

          {user?.designations.designation ?
            <NavList
              data={{ title: 'Designation', path: PATH_DASHBOARD.designation.list, icon: ICONS.user }}
              depth={1}
            />
            : null}
        </List>
      ) : null}
    </Box>
  );
}
