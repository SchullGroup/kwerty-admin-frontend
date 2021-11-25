/* eslint-disable no-param-reassign */
import { KToast } from '@/components';
import EventBus from '@/utils/event-bus';

export default {
  install(Vue) {
    Vue.component('KToast', KToast);
    const toast = {
      show(options) {
        EventBus.$emit('addNotification', options);
      },
    };
    Vue.prototype.$toast = toast;
  },
};
