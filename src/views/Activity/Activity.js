import { KDashboardLayout, KPagination, KInput } from '@/components';
import TableRow from './TableRow.vue';
import dummyActivities from './dummyActivities';

export default {
  name: 'ActivityHome',
  components: {
    TableRow,
    KInput,
    KPagination,
    KDashboardLayout,
  },
  data: () => ({
    type: null,
    page: 1,
    maxItemsOnPage: 20,
    totalItems: 18,
    displayFields: ['name', 'action', 'status', 'timestamp'],
    activities: [],
  }),
  computed: {
    title() {
      const { type } = this;
      return type ? `${type[0].toUpperCase()}${type.slice(1)} Activity` : 'Activity';
    },
  },
  methods: {
    setType() {
      this.type = this.$route.params.type;
    },
  },
  watch: {
    $route() {
      this.setType();
    },
  },
  mounted() {
    this.setType();
    this.activities = dummyActivities;
  },
};
