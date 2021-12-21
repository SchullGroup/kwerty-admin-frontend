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
    search: '',
    paginationData: {
      page: 1,
      totalItems: 0,
      itemsOnPage: 20,
      totalPages: 0,
    },
    displayFields: ['name', 'activity', 'createdAt'],
    duration: '',
    optionsDisplay: {
      '': 'All',
      '24hours': 'Last 24 hours',
      '7days': 'Last 7 days',
      '30days': 'Last 30 days',
      '3months': 'Last 3 months',
      '6months': 'Last 6 months',
      lastyear: 'Last year',
    },
    modalOpen: false,
    fileType: 'csv',
    startDate: '',
    endDate: '',
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
    search() {
      this.fetchActivities();
    },
    duration() {
      this.fetchActivities();
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
      exportActivities: 'activity/exportActivities',
    }),
    async fetchActivities(page = 1) {
      const { type, search, duration } = this;
      this.isLoading = true;
      try {
        const activitiesFetched = await this.getAdminActivities({
          page,
          type,
          search,
          duration,
        });
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
    async downloadActivities() {
      const {
        type,
        startDate,
        endDate,
        fileType,
      } = this;
      this.isLoading = true;
      try {
        const downloaded = await this.exportActivities({
          type,
          startDate,
          endDate,
          fileType,
        });
        if (downloaded) {
          this.$toast.show({ message: downloaded });
        } else {
          throw Error(downloaded.error);
        }
        this.isLoading = false;
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    setType() {
      const { type } = this.$route.params;
      this.type = type === 'admin' ? 'admin' : 'user';
      this.fetchActivities();
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
