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
      default: () => [],
    },
  },
  data: () => ({
    innerValue: '',
  }),
  watch: {
    innerValue() {
      this.checkValue(this.checkedValue);
    },
    checkedValue(val) {
      if (!val.length) {
        this.innerValue = false;
        return;
      }
      this.checkValue(val, true);
    },
  },
  methods: {
    checkValue(checkedValue, fromOutside = false) {
      const { innerValue } = this;
      const index = checkedValue.indexOf(this.value);
      const found = index !== -1;
      const notFound = index === -1;
      if (!fromOutside) {
        if (innerValue && notFound) {
          this.checkedValue.push(this.value);
        }
        if (!innerValue && found) {
          this.checkedValue.splice(index, 1);
        }
      } else {
        if (innerValue && notFound) {
          this.innerValue = false;
        }
        if (!innerValue && found) {
          this.innerValue = true;
        }
      }
    },
  },
  model: {
    prop: 'checkedValue',
  },
};
