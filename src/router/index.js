import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Components from '../views/Components.vue';
import Login from '../views/Auth/Login/Login.vue';
import ResetPassword from '../views/Auth/ResetPassword/ResetPassword.vue';
import CheckInbox from '../views/Auth/CheckInbox/CheckInbox.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
