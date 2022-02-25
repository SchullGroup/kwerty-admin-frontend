import {
  KDashboardLayout,
  KInput,
  KButton,
  KPagination,
} from '@/components';
import { getAllDashboards, deleteDashboard, searchDashboards } from '@/api/country';
import stringHelpers from '@/utils/string-helpers';

export default {
  name: 'ManageCountry',
  components: {
    KDashboardLayout,
    KInput,
    KButton,
    KPagination,
  },
  data: () => ({
    pagination: {
      totalItems: NaN,
      totalPages: NaN,
    },
    page: 1,
    dashboardList: [],
    search: '',
    isFetching: true,
  }),
  async created() {
    await this.fetchDashboards({ page: 1 });
  },
  watch: {
    async page(val) {
      await this.fetchDashboards({ page: val });
    },
    async search(val) {
      if (!val) await this.fetchDashboards({ page: 1 });
      else {
        try {
          this.isFetching = true;
          const response = await searchDashboards({ search: val });
          const {
            total,
            dashboard,
            totalPages,
          } = response.data.data;
          this.dashboardList = dashboard;
          this.pagination = {
            totalItems: total,
            totalPages,
          };
        } catch (e) {
          this.$toast.show({ message: e.message });
        } finally {
          this.isFetching = false;
        }
      }
    },
  },
  methods: {
    ...stringHelpers,
    async deleteCountry(options) {
      try {
        const response = await deleteDashboard(options);
        // remove from UI
        this.dashboardList = this.dashboardList.filter((c) => c.id !== options.id);
        this.pagination.totalItems -= 1;
        this.$toast.show({ message: response.data.message });
      } catch (e) {
        this.$toast.show({ message: e.message });
      }
    },
    async fetchDashboards({ page = 1 }) {
      try {
        this.isFetching = true;
        const response = await getAllDashboards({ page });
        const {
          total,
          dashboard,
          totalPages,
        } = response.data.data;
        this.dashboardList = dashboard;
        this.pagination = {
          totalItems: total,
          totalPages,
        };
      } catch (e) {
        this.$toast.show({ message: e.message });
      } finally {
        this.isFetching = false;
      }
    },
  },
};
