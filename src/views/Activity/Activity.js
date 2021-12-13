import { mapActions, mapGetters } from 'vuex';
import {
  KDashboardLayout,
  KPagination,
  KInput,
  KButton,
  KModal,
  KCard,
} from '@/components';
import ActivityTableRow from './TableRow.vue';

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
    paginationData: {
      page: 1,
      totalItems: 0,
      itemsOnPage: 20,
      totalPages: 0,
    },
    displayFields: ['name', 'activity', 'createdAt'],
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
  mounted() {
    this.fetchActivities();
    this.setType();
  },
  watch: {
    page(value) {
      console.log(value);
      if (value) {
        this.fetchActivities(value);
      }
    },
    $route() {
      this.setType();
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      allActivities: 'activity/getActivities',
    }),
    title() {
      const { type } = this;
      return type ? `${type[0].toUpperCase()}${type.slice(1)} Activity` : 'Activity';
    },
  },
  methods: {
    ...mapActions({
      getAllActivities: 'activity/getActivities',
    }),
    async fetchActivities(page = 1) {
      const { user } = this;
      const adminToken = user.token;
      try {
        const activitiesFetched = await this.getAllActivities({ page, adminToken });
        if (!activitiesFetched.error) {
          this.paginationData.page = Number(activitiesFetched.currentPage);
          this.paginationData.totalItems = Number(activitiesFetched.total);
          this.paginationData.totalPages = activitiesFetched.totalPages;
        } else {
          throw Error(activitiesFetched.error);
        }
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    setType() {
      this.type = this.$route.params.type;
    },
    nextPage() {
      this.page += 1;
    },
    prevPage() {
      this.page -= 1;
    },
    firstPage() {
      this.page = 1;
    },
    lastPage() {
      this.page = this.paginationData.totalPages;
    },
  },
};
