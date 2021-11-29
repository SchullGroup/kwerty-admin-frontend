import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardOverview from '../views/Overview/Overview.vue';
import Components from '../views/Components.vue';
import Login from '../views/Auth/Login/Login.vue';
import ResetPassword from '../views/Auth/ResetPassword/ResetPassword.vue';
import CheckInbox from '../views/Auth/CheckInbox/CheckInbox.vue';
import ActivityHome from '../views/Activity/Activity.vue';
import Settings from '../views/Settings/Settings.vue';

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
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/check-inbox',
    name: 'CheckInbox',
    component: CheckInbox,
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
