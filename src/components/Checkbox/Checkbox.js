export default {
  name: 'KCheckbox',
  props: {
    type: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Label',
    },
  },
};
