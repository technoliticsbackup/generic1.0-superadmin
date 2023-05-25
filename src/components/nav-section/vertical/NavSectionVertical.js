// import PropTypes from 'prop-types';
// // @mui
// import { List, Stack } from '@mui/material';
// // locales
// import { useLocales } from '../../../locales';
// //
// import { StyledSubheader } from './styles';
// import NavList from './NavList';
// import { PATH_DASHBOARD } from 'src/routes/paths';

// // ----------------------------------------------------------------------

// NavSectionVertical.propTypes = {
//   sx: PropTypes.object,
//   data: PropTypes.array,
// };




// export default function NavSectionVertical({ data, sx, ...other }) {
//   const { translate } = useLocales();

//   return (
//     <Stack sx={sx} {...other}>
//       {data.map((group) => {
//         const key = group.subheader || group.items[0].title;

//         return (
//           <List key={key} disablePadding sx={{ px: 2 }}>
//             {group.subheader && (
//               <StyledSubheader disableSticky>MANAGEMENT</StyledSubheader>
//             )}

// <List disablePadding sx={{ px: 2 }}>
//           <StyledSubheader>ECOM MANAGEMENT</StyledSubheader>

//           {user?.designations?.addstaff === true ? (
//             <NavList
//               data={{
//                 title: 'Staff Management',
//                 path: PATH_DASHBOARD.staff.list,
//                 icon: ICONS.user,
//               }}
//               depth={1}
//             />
//           ) : null}

//           {user?.designations?.customer === true ? (
//             <NavList
//               data={{ title: 'Customer', path: PATH_DASHBOARD.customer.list, icon: ICONS.menuItem }}
//               depth={1}
//             />
//           ) : null}

//           {user?.designations?.dealerManagement === true ? (
//             <NavList
//               data={{
//                 title: 'Dealer Management',
//                 path: PATH_DASHBOARD.dealer.list,
//                 icon: ICONS.user,
//               }}
//               depth={1}
//             />
//           ) : null}

//           {user?.designations?.productmanagement === true ? (
//             <NavList
//               data={{
//                 title: 'Product Management',
//                 path: PATH_DASHBOARD.product.list,
//                 icon: ICONS.cart,
//               }}
//               depth={1}
//             />
//           ) : null}

//           {user?.designations?.order === true ? (
//             <NavList
//               data={{
//                 title: 'Order Management',
//                 path: PATH_DASHBOARD.order.list,
//                 icon: ICONS.booking,
//               }}
//               depth={1}
//             />
//           ) : null}
//         </List>


//             {group.items.map((list) => (
//               <NavList
//                 key={"app" + PATH_DASHBOARD.staff.root}
//                 data={list}
//                 depth={1}
//                 hasChild={!!list.children}
//               />
//             ))}
//           </List>
//         );
//       })}
//     </Stack>
//   );
// }


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

// // {
// //   subheader: 'MANAGEMENT',
// //   items: [
// //     // { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
// //     { title: '', path: PATH_DASHBOARD.staff.root, icon: ICONS.user },
// //   ],
// // },

// // {
// //   subheader: 'configuration',
// //   items: [
// //     // { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
// //     { title: 'DEPARTMENT', path: PATH_DASHBOARD.department.list, icon: ICONS.user },
// //     { title: 'DESIGNATION', path: PATH_DASHBOARD.designation.list, icon: ICONS.user },
// //   ],
// // },

export default function NavSectionVertical({ isCollapse = false, ...other }) {

  const { user } = useAuthContext();

  console.log("user", user)

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
