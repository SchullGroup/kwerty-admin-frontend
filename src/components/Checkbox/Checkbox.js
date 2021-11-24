export default {
  name: 'KCheckbox',
  props: {
    fill: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: null,
      default: '',
    },
  },
};
