import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ToastNotification from './plugins/toast';
import { instance } from './config';

Vue.config.productionTip = false;

Vue.use(ToastNotification);

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
