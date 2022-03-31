import { mapGetters, mapActions } from 'vuex';
import { KDashboardLayout, KInput } from '../../components';
import doughnutColors from '../../utils/doughnut-colors';
import DoughnutWrapper from '../../components/Charts/DoughnutWrapper.vue';
import LineWrapper from '../../components/Charts/LineWrapper.vue';
import OverviewTableRow from './TableRow.vue';
import ProfileMixin from '@/mixins/Profile';
import avatar from '@/assets/avatar.svg';
import { getActiveUsers } from '@/api/dashboard';

export default {
  name: 'DashboardHome',
  components: {
    KInput,
    KDashboardLayout,
    OverviewTableRow,
    DoughnutWrapper,
    LineWrapper,
  },
  mixins: [ProfileMixin],
  data: () => ({
    isLoading: false,
    isLoadingUser: false,
    isLoadingChart: true,
    activities: null,
    isHours: false,
    totalSearches: '',
    totalClicked: '',
    chartDataset: [],
    mostActiveUser: [],
    topUser: {},
    accounts: '',
    showChart: true,
    showLineChart: true,
    dummyImage: avatar,
    overviewDuration: '7 days',
    activeUserPeriod: '7 days',
    optionsDisplay: {
      '24 hours': 'Last 24 hours',
      '7 days': 'Last 7 days',
      '30 days': 'Last 30 days',
      '3 months': 'Last 3 months',
      '6 months': 'Last 6 months',
      '12 months': 'Last year',
    },
    displayFields: ['activity', 'createdAt', 'status'],
    svgPath:
      'M18.896.44a2.91 2.91 0 0 1 2.91 2.909v1.94h-1.94v11.637a2.91 2.91 0 0 1-2.91 2.91H3.38a2.91 2.91 0 0 1-2.91-2.91v-1.94h15.518v1.94a.97.97 0 0 0 .856.963l.113.007a.97.97 0 0 0 .963-.857l.007-.113V2.379H5.32a.97.97 0 0 0-.963.856l-.007.114v9.698h-1.94V3.349A2.91 2.91 0 0 1 5.32.439h13.577Z', // eslint-disable-line
    doughnutLabels: ['Agriculture', 'Finance', 'Population', 'Technology', 'Health'],
    doughnutDatasets: [],
    lineLabels: [],
    lineDatasets: [],
  }),
  async mounted() {
    await this.getProfile();
    await this.getRecentActivities();
    await this.getDashBoardAnalytics();
    await this.fetchActiveUsers();
  },
  watch: {
    overviewDuration() {
      this.getDashBoardAnalytics();
    },
    showChart(val) {
      if (!val) {
        setTimeout(this.setShow, 0);
      }
    },
    showLineChart(val) {
      if (!val) {
        setTimeout(this.setLineShow, 0);
      }
    },
    activeUserPeriod() {
      this.fetchActiveUsers();
    },
  },
  computed: {
    ...mapGetters({
      Profile: 'auth/getProfile',
      recentActivities: 'dashboard/getRecentActivities',
    }),
    userName() {
      const { firstName, lastName } = this.Profile;
      return `${firstName} ${lastName}`;
    },
    chartData() {
      const { chartDataset } = this;
      return {
        labels: chartDataset.map((item) => item.category),
        datasets: [
          {
            data: chartDataset.map((item) => item.count),
            backgroundColor: doughnutColors,
          },
        ],
      };
    },
    lineData() {
      const { lineDatasets } = this;
      const lineData = lineDatasets.map((item) => ({ x: item.dateTrunc, y: item.count }));
      lineData.sort((a, b) => new Date(a.x) - new Date(b.x));
      return {
        datasets: [
          {
            data: lineData,
            borderColor: 'rgb(90,11,117)',
            pointBackgroundColor: 'rgba(90,11,117,1)',
            pointHoverBackgroundColor: 'rgba(90,11,117,1)',
            pointBorderColor: 'rgba(90,11,117,0)',
            pointRadius: 1.5,
            pointHitRadius: 4,
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      };
    },
  },
  methods: {
    ...mapActions({
      getRecentAdminActivities: 'dashboard/getRecentAdminActivities',
      getAnalytics: 'dashboard/getAnalytics',
    }),
    setShow() {
      this.showChart = true;
    },
    setLineShow() {
      this.showLineChart = true;
    },
    async fetchActiveUsers() {
      const { activeUserPeriod } = this;
      try {
        const response = await getActiveUsers({ duration: activeUserPeriod });
        console.log(response.data.message);
        if (response.status === 200) {
          this.lineDatasets = response.data.data;
          this.showLineChart = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getRecentActivities() {
      const { id } = this.Profile;
      const { overviewDuration } = this;
      this.isLoading = true;
      try {
        const response = await this.getRecentAdminActivities({ id, duration: overviewDuration });
        console.log(response);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    async getDashBoardAnalytics() {
      const { overviewDuration } = this;
      this.isLoadingUser = true;
      try {
        const response = await this.getAnalytics({ duration: overviewDuration });
        if (!response.error) {
          this.totalSearches = response.data.searchTotal.count;
          this.totalClicked = response.data.totalClickedSearch.percentage;
          this.accounts = response.data.userAccountTotal[0].count;
          this.isLoadingChart = true;
          this.chartDataset = response.data.totalSearchPerCategory;
          this.isLoadingChart = false;
          this.showChart = false;
          this.mostActiveUser = response.data.mostActiveUser;
          this.isLoadingUser = false;
          this.topUser = this.mostActiveUser.find((user) => user.rank === '1');
        } else {
          throw Error(response.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
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
