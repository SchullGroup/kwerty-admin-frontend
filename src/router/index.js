import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardOverview from '../views/Overview/Overview.vue';
import Components from '../views/Components.vue';
import Login from '../views/Auth/Login/Login.vue';
import ResetPassword from '../views/Auth/ResetPassword/ResetPassword.vue';
import CheckInbox from '../views/Auth/CheckInbox/CheckInbox.vue';
import ActivityHome from '../views/Activity/Activity.vue';
import Settings from '../views/Settings/Settings.vue';
import Indicators from '../views/Database/Indicators/Indicators.vue';
import Country from '../views/Database/Country/CountryOverview/CountryOverview.vue';
import ManageCountry from '../views/Database/Country/ManageCountry/ManageCountry.vue';
import AddCountry from '../views/Database/Country/AddCountry/AddCountry.vue';
import ManageData from '../views/Database/Manage/Manage.vue';
import UploadData from '../views/Database/Manage/Upload/Upload.vue';
import Customers from '../views/Customers/Customers.vue';
import SingleCustomer from '../views/Customers/Customer.vue';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'Overview',
    component: DashboardOverview,
  },
  {
    path: '/components',
    name: 'Components',
    component: Components,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      authView: true,
    },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      authView: true,
    },
  },
  {
    path: '/check-inbox',
    name: 'CheckInbox',
    component: CheckInbox,
    meta: {
      authView: true,
    },
  },
  {
    path: '/activities/:type',
    name: 'Activities',
    component: ActivityHome,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers,
  },
  {
    path: '/single-user',
    name: 'SingleCustomer',
    component: SingleCustomer,
  },
  {
    path: '/database/indicators',
    name: 'Indicators',
    component: Indicators,
  },
  {
    path: '/database/country',
    name: 'CountryOverview',
    component: Country,
  },
  {
    path: '/database/country/all',
    name: 'ManageCountry',
    component: ManageCountry,
  },
  {
    path: '/database/country/add',
    name: 'AddCountry',
    component: AddCountry,
  },
  {
    path: '/database/country/:id',
    name: 'ViewSingleCountry',
    component: AddCountry,
  },
  {
    path: '/database',
    name: 'ManageData',
    component: ManageData,
  },
  {
    path: '/database/upload',
    name: 'Upload',
    component: UploadData,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
