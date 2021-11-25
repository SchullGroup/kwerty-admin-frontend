import EventBus from '@/utils/event-bus';

export default {
  name: 'ToastNotification',
  data: () => ({
    notifications: [],
    endList: false,
    svgPath: `
      M7.83966 9.23473L8.75247 10.1475L14.2254 4.67457L15.1395 5.58867L8.75247 11.9757L4.63837 7.86164L5.55247 6.94754L6.9262 8.32128L7.83966 9.23409V9.23473ZM7.84095 7.40653L11.0422 4.20459L11.9538 5.11611L8.75247 8.31805L7.84095 7.40653ZM6.0134 11.0623L5.09994 11.9757L0.98584 7.86164L1.89994 6.94754L2.8134 7.861L2.81275 7.86164L6.0134 11.0623ZM5.09994 10.1475L6.0134 11.0623L2.81275 7.86164L2.8134 7.861L1.89994 6.94754L0.98584 7.86164L5.09994 10.1475ZM4.63837 7.86164L8.75247
    `,
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
      }, 1000);
    },
  },
};
