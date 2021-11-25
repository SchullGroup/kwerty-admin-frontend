export default {
  name: 'KToggle',
  data: () => ({
    isToggled: false,
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  }),
  methods: {
    toggle() {
      this.isToggled = !this.isToggled;
    },
  },
};
