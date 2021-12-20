import TableRow from './TableRow.vue';

export default {
  name: 'KTable',
  components: {
    TableRow,
  },
  props: {
    fields: {
      type: Array,
    },
    datalist: {
      type: Array,
    },
    fieldsDisplay: {
      type: Object,
    },
    value: {
      type: null,
    },
    clickAction: {
      type: Function,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    selected: [],
  }),
  model: {
    event: 'change',
  },
  watch: {
    selected(val) {
      this.$emit('change', val);
    },
    value(val) {
      this.selected = val;
    },
  },
};
