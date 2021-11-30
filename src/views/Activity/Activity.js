import {
  KDashboardLayout, KPagination, KInput, KButton, KModal, KCard,
} from '@/components';
import ActivityTableRow from './TableRow.vue';
import dummyActivity from './dummyActivity';

export default {
  name: 'ActivityHome',
  components: {
    KCard,
    KModal,
    KButton,
    ActivityTableRow,
    KInput,
    KPagination,
    KDashboardLayout,
  },
  data: () => ({
    type: null,
    page: 1,
    maxItemsOnPage: 20,
    totalItems: 18,
    displayFields: ['name', 'action', 'timestamp'],
    activities: [],
    duration: '>7days',
    optionsDisplay: {
      alltime: 'All time',
      '>24hours': 'Last 24 hours',
      '>7days': 'Last 7 days',
      '>30days': 'Last 30 days',
      '>3months': 'Last 3 months',
      '>6months': 'Last 6 months',
      lastyear: 'Last year',
    },
    modalOpen: false,
    defaultFileType: 'csv',
    defaultStartDate: '22-02-2021',
    defaultEndDate: '24-02-21',
    fileTypes: {
      csv: 'CSV',
      pdf: 'PDF',
    },
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
    this.activities = dummyActivity;
  },
};
