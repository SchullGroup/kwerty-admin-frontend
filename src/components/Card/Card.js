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
};
