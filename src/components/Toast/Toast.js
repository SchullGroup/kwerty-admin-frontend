import EventBus from '@/utils/event-bus';

export default {
  name: 'ToastNotification',
  data: () => ({
    notifications: [],
    endList: false,
    svgPath:
      // eslint-disable-next-line vue/max-len
      'm7.84 9.235.912.913 5.473-5.473.915.914-6.388 6.387-4.114-4.114.914-.914L6.926 8.32l.914.913Zm.001-1.828 3.201-3.202.912.911-3.202 3.202-.911-.911Zm-1.828 3.655-.913.914L.986 7.862l.914-.914.913.913 3.2 3.201Zm-.913-.914.913.914-3.2-3.2V7.86L1.9 6.948l-.914.914L5.1 10.148Zm-.462-2.286',
  }),
  created() {
    EventBus.$on('addNotification', (options) => {
      this.addNotification(options);
    });
  },
  methods: {
    removeToast(id) {
      const index = this.notifications.findIndex((notification) => notification.id === id);
      if (this.notifications.length <= 1) {
        this.endList = true;
        setTimeout(() => {
          this.notifications.splice(index, 1);
          this.endList = false;
        }, 500);
      } else {
        this.notifications.splice(index, 1);
      }
    },
    addNotification(options) {
      const { message } = options;
      const id = Math.floor(Math.random() * 90000) + 10000;
      this.notifications.push({
        message,
        id,
      });
      setTimeout(() => {
        this.removeToast(id);
      }, 2000);
    },
  },
};
