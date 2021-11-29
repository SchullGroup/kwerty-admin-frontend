import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardOverview from '../views/Overview/Overview.vue';
import Components from '../views/Components.vue';
import ActivityHome from '../views/Activity/Activity.vue';

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
    path: '/activities/:type',
    name: 'Activities',
    component: ActivityHome,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
