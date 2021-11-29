export default {
  name: 'KCard',
  props: {
    heading: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
    },
  },
  computed: {
    inModal() {
      return this.variant === 'in-modal';
    },
  },
};
