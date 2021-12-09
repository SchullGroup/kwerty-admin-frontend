import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import { APP_NAME } from '../config/app';

// Import all modules from modules folder
import auth from './modules/auth';
import activity from './modules/activity';

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
    activity,
  },
  plugins: [vuexLocal.plugin],
});
