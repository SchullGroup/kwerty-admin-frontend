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
  },
};
