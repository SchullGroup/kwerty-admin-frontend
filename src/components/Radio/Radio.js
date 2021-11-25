export default {
  name: 'KRadio',
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    inputValue: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  data: () => ({
  }),
  computed: {
    isChecked() {
      return this.modelValue === this.value;
    },
  },
};
