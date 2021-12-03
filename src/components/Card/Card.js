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
    wrapHeading: {
      type: Boolean,
    },
    longerHeading: {
      type: Boolean,
    },
  },
  computed: {
    inModal() {
      return this.variant === 'in-modal';
    },
  },
};
