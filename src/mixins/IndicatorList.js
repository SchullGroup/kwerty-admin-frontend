import { mapActions, mapGetters } from 'vuex';

export default {
  created() {
    this.getInitialIndicators();
  },
  watch: {
    category(val) {
      this.fetchIndicatorsWith({ name: '', category: val });
    },
  },
  computed: {
    ...mapGetters({
      getIndicatorList: 'indicators/asOptions',
      categories: 'indicators/categoryOptions',
    }),
    indicatorOptions() {
      return this.getIndicatorList(this.category || '');
    },
  },
  methods: {
    ...mapActions({
      getInitialIndicators: 'indicators/getInitialIndicators',
      fetchIndicatorsWith: 'indicators/fetchIndicatorsWith',
    }),
  },
};
