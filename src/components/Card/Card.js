export default {
  name: 'KCard',
  props: {
    heading: {
      type: String,
      required: true,
    },
    variants: {
      type: Array,
      default: [],
    },
  },
  computed: {
    variantClasses() {
      return this.variants.map((variant) => `card--${variant}`);
    },
  },
};
