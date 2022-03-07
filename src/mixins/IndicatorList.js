import { mapActions, mapGetters } from 'vuex';

export default {
  created() {
    this.getIndicatorsList();
  },
  computed: {
    ...mapGetters({
      indicatorsFromState: 'indicators/asOptions',
      categories: 'indicators/categoryOptions',
    }),
  },
  methods: {
    ...mapActions({
      getIndicatorsList: 'indicators/getInitialIndicators',
      fetchIndicatorsList: 'indicators/fetchIndicatorsWith',
    }),
  },
};
