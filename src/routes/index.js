import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  AboutPage,
  //
  BlankPage,
  BlogNewPostPage,
  BlogPostPage,
  // Dashboard: Blog
  BlogPostsPage,
  CalendarPage,
  // Dashboard: App
  ChatPage,
  ComingSoonPage,
  //
  ComponentsOverviewPage,
  Contact,
  //
  DemoAnimatePage,
  DemoCarouselsPage,
  DemoChartsPage,
  DemoCopyToClipboardPage,
  DemoEditorPage,
  DemoFormValidationPage,
  DemoImagePage,
  DemoLabelPage,
  DemoLightboxPage,
  DemoMapPage,
  DemoMarkdownPage,
  DemoMegaMenuPage,
  DemoMultiLanguagePage,
  DemoNavigationBarPage,
  DemoOrganizationalChartPage,
  DemoScrollbarPage,
  DemoSnackbarPage,
  DemoTextMaxLinePage,
  DemoUploadPage,
  EcommerceCheckoutPage,
  EcommerceProductCreatePage,
  EcommerceProductDetailsPage,
  EcommerceProductEditPage,
  EcommerceProductListPage,
  // Dashboard: Ecommerce
  EcommerceShopPage,
  FaqsPage,
  // Dashboard: FileManager
  FileManagerPage,
  FoundationColorsPage,
  FoundationGridPage,
  FoundationIconsPage,
  FoundationShadowsPage,
  FoundationTypographyPage,
  GeneralAnalyticsPage,
  // Dashboard: General
  GeneralAppPage,
  GeneralBankingPage,
  GeneralBookingPage,
  GeneralEcommercePage,
  GeneralFilePage,
  InvoiceCreatePage,
  InvoiceDetailsPage,
  InvoiceEditPage,
  // Dashboard: Invoice
  InvoiceListPage,
  KanbanPage,
  LoginPage,
  //
  MUIAccordionPage,
  MUIAlertPage,
  MUIAutocompletePage,
  MUIAvatarPage,
  MUIBadgePage,
  MUIBreadcrumbsPage,
  MUIButtonsPage,
  MUICheckboxPage,
  MUIChipPage,
  MUIDataGridPage,
  MUIDialogPage,
  MUIListPage,
  MUIMenuPage,
  MUIPaginationPage,
  MUIPickersPage,
  MUIPopoverPage,
  MUIProgressPage,
  MUIRadioButtonsPage,
  MUIRatingPage,
  MUISliderPage,
  MUIStepperPage,
  MUISwitchPage,
  MUITablePage,
  MUITabsPage,
  MUITextFieldPage,
  MUITimelinePage,
  MUITooltipPage,
  MUITransferListPage,
  MUITreesViewPage,
  MailPage,
  MaintenancePage,
  NewPasswordPage,
  Page403,
  Page404,
  //
  Page500,
  PaymentPage,
  PermissionDeniedPage,
  PricingPage,
  RegisterPage,
  ResetPasswordPage,
  UserAccountPage,
  UserCardsPage,
  UserCreatePage,
  UserEditPage,
  // Dashboard: User
  UserListPage,
  UserProfilePage,
  VerifyCodePage,
  // new lsit
  StaffUserCreatePage,
  StaffUserEditPage,
  StaffUserListPage,
  StaffChangePassword,
  StaffDetailsPage,
  DesignationCreatePage,
  DesignationEditForm,
  DesignationListPage,
  DepartmentListPage,
  DepartmentCreatePage,
  DepartmentEditForm,
  OrgmanegementListPage,
  OrgmanegementCreatePage,
  OrgmanegementEditForm,
  OrgmanegementDetailsPage,
  OrgStaffCreatePage,
  OrgStaffEditPage,
  OrgStaffChangePassword,
  InstmanegementListPage,
  InstmanegementCreatePage,
  InstmanegementCreatePageWithId,
  InstmanegementEditForm,
  InstmanegementDetailsPage,
  InstStaffCreatePage,
  InstStaffEditPage,
  InstStaffChangePassword,
  
  StudentrangeListPage,

  PricingtiersCreatePage,
  PricingtiersEditForm,
  PricingtiersListPage,
  ValueaddedpacksCreatePage,
  ValueaddedpacksEditForm,
  ValueaddedpacksListPage,
  PackageCreatePage,
  PackageEditForm,
  PackageListPage
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },

        {
          path: 'staff',
          children: [
            { element: <Navigate to="/dashboard/staff/list" replace />, index: true },
            { path: 'list', element: <StaffUserListPage /> },
            { path: 'new', element: <StaffUserCreatePage /> },
            { path: 'passwordchange/:id', element: <StaffChangePassword /> },
            { path: 'edit/:id', element: <StaffUserEditPage /> },
            { path: ':id', element: <StaffDetailsPage /> },
          ],
        },

        {
          path: 'designation',
          children: [
            { element: <Navigate to="/dashboard/designation/list" replace />, index: true },
            { path: 'list', element: <DesignationListPage /> },
            { path: 'new', element: <DesignationCreatePage /> },
            { path: 'edit/:id', element: <DesignationEditForm /> },
          ],
        },

        {
          path: 'studentrange',
          children: [
            { element: <Navigate to="/dashboard/studentrange/list" replace />, index: true },
            { path: 'list', element: <StudentrangeListPage /> },
          ],
        },

        {
          path: 'pricingtiers',
          children: [
            { element: <Navigate to="/dashboard/pricingtiers/list" replace />, index: true },
            { path: 'list', element: <PricingtiersListPage /> },
            { path: 'new', element: <PricingtiersCreatePage /> },
            { path: 'edit/:id', element: <PricingtiersEditForm /> },
          ],
        },

        {
          path: 'valueaddedpacks',
          children: [
            { element: <Navigate to="/dashboard/valueaddedpacks/list" replace />, index: true },
            { path: 'list', element: <ValueaddedpacksListPage /> },
            { path: 'new', element: <ValueaddedpacksCreatePage /> },
            { path: 'edit/:id', element: <ValueaddedpacksEditForm /> },
          ],
        },

        {
          path: 'packages',
          children: [
            { element: <Navigate to="/dashboard/packages/list" replace />, index: true },
            { path: 'list', element: <PackageListPage /> },
            { path: 'new', element: <PackageCreatePage /> },
            { path: 'edit/:id', element: <PackageEditForm /> },
          ],
        },

        {
          path: 'department',
          children: [
            { element: <Navigate to="/dashboard/department/list" replace />, index: true },
            { path: 'list', element: <DepartmentListPage /> },
            { path: 'new', element: <DepartmentCreatePage /> },
            { path: 'edit/:id', element: <DepartmentEditForm /> },
          ],
        },

        {
          path: 'orgmanagment',
          children: [
            { element: <Navigate to="/dashboard/orgmanagment/list" replace />, index: true },
            { path: 'list', element: <OrgmanegementListPage /> },
            { path: 'new', element: <OrgmanegementCreatePage /> },
            { path: 'edit/:id', element: <OrgmanegementEditForm /> },
            { path: ':id', element: <OrgmanegementDetailsPage /> },
            { path: 'addstaff/:id', element: <OrgStaffCreatePage /> },
            { path: 'editstaff/:id', element: <OrgStaffEditPage /> },
            { path: 'changepassword/:id', element: <OrgStaffChangePassword /> },
          ],
        },

        {
          path: 'instmanagment',
          children: [
            { element: <Navigate to="/dashboard/instmanagment/list" replace />, index: true },
            { path: 'list', element: <InstmanegementListPage /> },
            { path: 'new', element: <InstmanegementCreatePage /> },
            { path: 'create/:id', element: <InstmanegementCreatePageWithId /> },
            { path: 'edit/:id', element: <InstmanegementEditForm /> },
            { path: ':id', element: <InstmanegementDetailsPage /> },
            { path: 'addstaff/:id', element: <InstStaffCreatePage /> },
            { path: 'editstaff/:id', element: <InstStaffEditPage /> },
            { path: 'changepassword/:id', element: <InstStaffChangePassword /> },
          ],
        },


        { path: 'ecommerce', element: <GeneralEcommercePage /> },
        { path: 'analytics', element: <GeneralAnalyticsPage /> },
        { path: 'banking', element: <GeneralBankingPage /> },
        { path: 'booking', element: <GeneralBookingPage /> },
        { path: 'file', element: <GeneralFilePage /> },
        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShopPage /> },
            { path: 'product/:name', element: <EcommerceProductDetailsPage /> },
            { path: 'list', element: <EcommerceProductListPage /> },
            { path: 'product/new', element: <EcommerceProductCreatePage /> },
            { path: 'product/:name/edit', element: <EcommerceProductEditPage /> },
            { path: 'checkout', element: <EcommerceCheckoutPage /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceListPage /> },
            { path: ':id', element: <InvoiceDetailsPage /> },
            { path: ':id/edit', element: <InvoiceEditPage /> },
            { path: 'new', element: <InvoiceCreatePage /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPostsPage /> },
            { path: 'post/:title', element: <BlogPostPage /> },
            { path: 'new', element: <BlogNewPostPage /> },
          ],
        },
        { path: 'files-manager', element: <FileManagerPage /> },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <MailPage /> },
            { path: 'label/:customLabel/:mailId', element: <MailPage /> },
            { path: ':systemLabel', element: <MailPage /> },
            { path: ':systemLabel/:mailId', element: <MailPage /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <ChatPage />, index: true },
            { path: 'new', element: <ChatPage /> },
            { path: ':conversationKey', element: <ChatPage /> },
          ],
        },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'kanban', element: <KanbanPage /> },
        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },

    // Main Routes
    {
      children: [
        {
          element: <GuestGuard>
            <LoginPage />
          </GuestGuard>, index: true
        },
        { path: 'about-us', element: <AboutPage /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <FaqsPage /> },
        // Demo Components
        {
          path: 'components',
          children: [
            { element: <ComponentsOverviewPage />, index: true },
            {
              path: 'foundation',
              children: [
                { element: <Navigate to="/components/foundation/colors" replace />, index: true },
                { path: 'colors', element: <FoundationColorsPage /> },
                { path: 'typography', element: <FoundationTypographyPage /> },
                { path: 'shadows', element: <FoundationShadowsPage /> },
                { path: 'grid', element: <FoundationGridPage /> },
                { path: 'icons', element: <FoundationIconsPage /> },
              ],
            },
            {
              path: 'mui',
              children: [
                { element: <Navigate to="/components/mui/accordion" replace />, index: true },
                { path: 'accordion', element: <MUIAccordionPage /> },
                { path: 'alert', element: <MUIAlertPage /> },
                { path: 'autocomplete', element: <MUIAutocompletePage /> },
                { path: 'avatar', element: <MUIAvatarPage /> },
                { path: 'badge', element: <MUIBadgePage /> },
                { path: 'breadcrumbs', element: <MUIBreadcrumbsPage /> },
                { path: 'buttons', element: <MUIButtonsPage /> },
                { path: 'checkbox', element: <MUICheckboxPage /> },
                { path: 'chip', element: <MUIChipPage /> },
                { path: 'data-grid', element: <MUIDataGridPage /> },
                { path: 'dialog', element: <MUIDialogPage /> },
                { path: 'list', element: <MUIListPage /> },
                { path: 'menu', element: <MUIMenuPage /> },
                { path: 'pagination', element: <MUIPaginationPage /> },
                { path: 'pickers', element: <MUIPickersPage /> },
                { path: 'popover', element: <MUIPopoverPage /> },
                { path: 'progress', element: <MUIProgressPage /> },
                { path: 'radio-button', element: <MUIRadioButtonsPage /> },
                { path: 'rating', element: <MUIRatingPage /> },
                { path: 'slider', element: <MUISliderPage /> },
                { path: 'stepper', element: <MUIStepperPage /> },
                { path: 'switch', element: <MUISwitchPage /> },
                { path: 'table', element: <MUITablePage /> },
                { path: 'tabs', element: <MUITabsPage /> },
                { path: 'textfield', element: <MUITextFieldPage /> },
                { path: 'timeline', element: <MUITimelinePage /> },
                { path: 'tooltip', element: <MUITooltipPage /> },
                { path: 'transfer-list', element: <MUITransferListPage /> },
                { path: 'tree-view', element: <MUITreesViewPage /> },
              ],
            },
            {
              path: 'extra',
              children: [
                { element: <Navigate to="/components/extra/animate" replace />, index: true },
                { path: 'animate', element: <DemoAnimatePage /> },
                { path: 'carousel', element: <DemoCarouselsPage /> },
                { path: 'chart', element: <DemoChartsPage /> },
                { path: 'copy-to-clipboard', element: <DemoCopyToClipboardPage /> },
                { path: 'editor', element: <DemoEditorPage /> },
                { path: 'form-validation', element: <DemoFormValidationPage /> },
                { path: 'image', element: <DemoImagePage /> },
                { path: 'label', element: <DemoLabelPage /> },
                { path: 'lightbox', element: <DemoLightboxPage /> },
                { path: 'map', element: <DemoMapPage /> },
                { path: 'mega-menu', element: <DemoMegaMenuPage /> },
                { path: 'multi-language', element: <DemoMultiLanguagePage /> },
                { path: 'navigation-bar', element: <DemoNavigationBarPage /> },
                { path: 'organization-chart', element: <DemoOrganizationalChartPage /> },
                { path: 'scroll', element: <DemoScrollbarPage /> },
                { path: 'snackbar', element: <DemoSnackbarPage /> },
                { path: 'text-max-line', element: <DemoTextMaxLinePage /> },
                { path: 'upload', element: <DemoUploadPage /> },
                { path: 'markdown', element: <DemoMarkdownPage /> },
              ],
            },
          ],
        },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: 'pricing', element: <PricingPage /> },
        { path: 'payment', element: <PaymentPage /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
