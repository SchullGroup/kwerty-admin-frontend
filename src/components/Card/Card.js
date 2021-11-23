export default {
  name: 'ICard',
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
