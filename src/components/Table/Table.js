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
      type: null,
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
    customers: {
      type: Boolean,
      default: false,
    },
    customerOption: {
      type: Boolean,
      default: false,
    },
    changeStatus: {
      type: null,
    },
  },
  data: () => ({
    selected: [],
    sortField: '',
    direction: 'asc',
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
  computed: {
    sorted() {
      const { sortField, datalist, direction } = this;
      if (!sortField) {
        return datalist;
      }
      const newDatalist = [...datalist];
      newDatalist.sort(this[direction](sortField));
      return newDatalist;
    },
  },
  methods: {
    setSortField(fieldname) {
      if (fieldname === this.sortField) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc';
      }
      this.sortField = fieldname;
    },
    asc(sortField) {
      return (a, b) => a[sortField].toString().localeCompare(b[sortField].toString());
    },
    desc(sortField) {
      return (a, b) => b[sortField].toString().localeCompare(a[sortField].toString());
    },
  },
};
