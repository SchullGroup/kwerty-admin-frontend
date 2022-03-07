import {
  KDashboardLayout,
  KInput,
  KButton,
  KPagination,
} from '@/components';
import doughnutColors from '../../../../utils/doughnut-colors';
import DoughnutWrapper from '../../../../components/Charts/DoughnutWrapper.vue';
import { getCountryAnalytics } from '@/api/country';
import avatar from '@/assets/avatar.svg';

export default {
  name: 'ManageCountry',
  components: {
    KDashboardLayout,
    KInput,
    KButton,
    KPagination,
    DoughnutWrapper,
  },
  data: () => ({
    totalVisit: [],
    totalRequestSent: [],
    totalChartClicked: [],
    totalVisitsPerCountry: [],
    countriesNotFound: [],
    topUsers: [],
    showChart: true,
    isLoadingChart: false,
    isLoading: false,
    avatar,
    status: 'down',
    path:
    // eslint-disable-next-line
    'M4.00004 3.73242L0.906288 0.638672L0.0225387 1.52242L4.00004 5.49992L7.97754 1.52242L7.09379 0.638672L4.00004 3.73242Z',
    pagination: {
      totalItems: 20,
      totalPages: 6,
      page: 1,
    },
    duration: '7 days',
    optionsDisplay: {
      '24 hours': 'Last 24 hours',
      '7 days': 'Last 7 days',
      '30 days': 'Last 30 days',
      '3 months': 'Last 3 months',
      '6 months': 'Last 6 months',
      '12 months': 'Last year',
    },
  }),
  mounted() {
    this.fetchCountryAnalytics();
  },
  watch: {
    showChart(val) {
      if (!val) {
        setTimeout(this.setShow, 0);
      }
    },
    duration() {
      this.fetchCountryAnalytics();
    },
  },
  computed: {
    chartData() {
      const { totalVisitsPerCountry } = this;
      return {
        labels: totalVisitsPerCountry.map((item) => item.name),
        datasets: [
          {
            data: totalVisitsPerCountry.map((item) => item.count),
            backgroundColor: doughnutColors,
          },
        ],
      };
    },
  },
  methods: {
    setShow() {
      this.showChart = true;
    },
    async fetchCountryAnalytics() {
      const { duration } = this;
      try {
        const response = await getCountryAnalytics({ duration });
        if (!response.error) {
          this.totalVisit = response.data.data.totalVisit[0].count;
          this.totalRequestSent = response.data.data.totalRequestSent[0].count;
          this.totalChartClicked = response.data.data.totalChartClicks[0].count;
          this.isLoadingChart = true;
          this.totalVisitsPerCountry = response.data.data.totalVisitPerCountry;
          this.isLoadingChart = false;
          this.showChart = false;
          this.isLoading = true;
          this.countriesNotFound = response.data.data.countriesNotFound;
          this.isLoading = false;
          this.topUsers = response.data.data.topUsers;
        } else {
          throw Error(response.error);
        }
        this.isLoadingChart = false;
      } catch (error) {
        console.log(error);
        this.isLoadingChart = false;
      }
    },
  },
  filters: {
    formatSearchVal(val) {
      const newVal = new Intl.NumberFormat('en-GB', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(val);
      return newVal;
    },
  },
};
