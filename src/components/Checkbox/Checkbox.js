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
    checkedValue: {
      type: null,
      default: [],
    },
  },
  data: () => ({
    innerValue: '',
  }),
  watch: {
    innerValue(value) {
      if (value) {
        this.checkedValue.push(this.value);
      } else {
        const index = this.checkedValue.indexOf(this.value);
        this.checkedValue.splice(index, 1);
      }
    },
    value(val) {
      this.innerValue = val;
    },
  },
  model: {
    prop: 'checkedValue',
  },
};
