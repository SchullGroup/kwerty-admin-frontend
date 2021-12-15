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
    isLoading: false,
    // userActivities: [],
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
    svgPath:
      'M18.896.44a2.91 2.91 0 0 1 2.91 2.909v1.94h-1.94v11.637a2.91 2.91 0 0 1-2.91 2.91H3.38a2.91 2.91 0 0 1-2.91-2.91v-1.94h15.518v1.94a.97.97 0 0 0 .856.963l.113.007a.97.97 0 0 0 .963-.857l.007-.113V2.379H5.32a.97.97 0 0 0-.963.856l-.007.114v9.698h-1.94V3.349A2.91 2.91 0 0 1 5.32.439h13.577Z',
  }),
  mounted() {
    this.setType();
  },
  watch: {
    page(value) {
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
      adminActivities: 'activity/getActivities',
      userActivities: 'activity/getUserActivities',
    }),
    title() {
      const { type } = this;
      return type ? `${type[0].toUpperCase()}${type.slice(1)} Activity` : 'Activity';
    },
    activities() {
      return this.type === 'admin' ? this.adminActivities : this.userActivities;
    },
  },
  methods: {
    ...mapActions({
      getAdminActivities: 'activity/getActivities',
      getUserActivities: 'activity/getUserActivities',
    }),
    async fetchActivities(page = 1) {
      if (this.type !== 'admin') return;
      this.isLoading = true;
      try {
        const activitiesFetched = await this.getAdminActivities({ page });
        if (!activitiesFetched.error) {
          this.paginationData.page = Number(activitiesFetched.currentPage);
          this.paginationData.totalItems = Number(activitiesFetched.total);
          this.paginationData.totalPages = activitiesFetched.totalPages;
        } else {
          throw Error(activitiesFetched.error);
        }
        this.isLoading = false;
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    async fetchUserActivities(page = 1) {
      if (this.type !== 'user') return;
      this.isLoading = true;
      try {
        const userActivities = await this.getUserActivities({ page });
        if (!userActivities.error) {
          this.paginationData.page = Number(userActivities.currentPage);
          this.paginationData.totalItems = Number(userActivities.total);
          this.paginationData.totalPages = userActivities.totalPages;
        } else {
          throw Error(userActivities.error);
        }
        this.isLoading = false;
      } catch (error) {
        this.toast.show({ message: error });
      }
    },
    setType() {
      const { type } = this.$route.params;
      this.type = type === 'admin' ? 'admin' : 'user';
      if (type === 'admin') {
        this.fetchActivities();
      } else {
        this.fetchUserActivities();
      }
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
