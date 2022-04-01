import TableRow from './TableRow.vue';
import KCheckbox from '../Checkbox/Checkbox';

export default {
  name: 'KTable',
  components: {
    KCheckbox,
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
    selectAll: {
      type: Boolean,
      default: false,
    },
    changeStatus: {
      type: null,
    },
    manageData: {
      type: Boolean,
      default: false,
    },
    showStatus: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    selected: [],
    sortField: '',
    direction: 'asc',
    all: [],
    // order: {
    //   asc: () => {
    //   }
    // }
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
      if (!val.length && this.all.length) {
        this.all = [];
      }
    },
    all: {
      deep: true,
      handler(val) {
        const has = val.includes('yes');
        this.$emit('selectAll', has);
      },
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
