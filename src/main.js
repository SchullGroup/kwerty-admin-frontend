import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ToastNotification from './plugins/toast';
import { instance } from './config';
import { getProfile } from './api';

Vue.config.productionTip = false;
Vue.prototype.debounce = (func, delay = 500) => function debounced(...args) {
  const context = this;
  // set on global to maintain a single pointer
  clearTimeout(window.debounce);
  window.debounce = setTimeout(() => func.apply(context, args), delay);
};

Vue.use(ToastNotification);

router.beforeEach((to, from, next) => {
  const token = store.getters['auth/getToken'];
  const isAuthenticated = !!token;
  const isAuthView = to.meta.authView;
  if (!isAuthView && !isAuthenticated) next({ name: 'Login' });
  else {
    const { id } = store.getters['auth/getUser'];
    if (!isAuthView) getProfile({ id, token });
    next();
  }
});

new Vue({
  router,
  store,
  computed: {
    token() {
      return store.state.auth.token;
    },
  },
  watch: {
    token(val) {
      this.setHeader(val);
    },
  },
  methods: {
    setHeader(token) {
      instance.defaults.headers.Authorization = `Bearer ${token}`;
    },
  },
  created() {
    this.setHeader(store.state.auth.token);
  },
  render: (h) => h(App),
}).$mount('#app');
