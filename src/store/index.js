import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import { APP_NAME } from '../config/app';

// Import all modules from modules folder
import auth from './modules/auth';
import admin from './modules/admin';
import roles from './modules/roles';
import activity from './modules/activity';
import indicators from './modules/indicators';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth'],
  key: APP_NAME,
});

Vue.use(Vuex);

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    admin,
    roles,
    activity,
    indicators,
  },
  plugins: [vuexLocal.plugin],
});
