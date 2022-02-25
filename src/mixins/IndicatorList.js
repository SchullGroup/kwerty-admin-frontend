import { mapActions, mapGetters } from 'vuex';

export default {
  created() {
    this.getIndicators();
  },
  computed: {
    ...mapGetters({ indicators: 'indicators/asOptions', categories: 'indicators/categoryOptions' }),
  },
  methods: {
    ...mapActions({
      getIndicators: 'indicators/getInitialIndicators',
      fetchIndicators: 'indicators/fetchIndicatorsWith',
    }),
  },
};
