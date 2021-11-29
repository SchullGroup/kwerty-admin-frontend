import { KDashboardLayout, KInput } from '../../components';
import doughnutColors from '../../utils/doughnut-colors';
import DoughnutWrapper from '../../components/Charts/DoughnutWrapper.vue';
import LineWrapper from '../../components/Charts/LineWrapper.vue';
import OverviewTableRow from './TableRow.vue';
import dummyActivity from './dummyActivity';

export default {
  name: 'DashboardHome',
  components: {
    KInput,
    KDashboardLayout,
    OverviewTableRow,
    DoughnutWrapper,
    LineWrapper,
  },
  data: () => ({
    activities: null,
    overviewDuration: '>7days',
    activeUserPeriod: '>7days',
    optionsDisplay: {
      alltime: 'All time',
      '>24hours': 'Last 24 hours',
      '>7days': 'Last 7 days',
      '>30days': 'Last 30 days',
      '>3months': 'Last 3 months',
      '>6months': 'Last 6 months',
      lastyear: 'Last year',
    },
    displayFields: ['action', 'timestamp', 'status'],
    svgPath:
      'M18.896.44a2.91 2.91 0 0 1 2.91 2.909v1.94h-1.94v11.637a2.91 2.91 0 0 1-2.91 2.91H3.38a2.91 2.91 0 0 1-2.91-2.91v-1.94h15.518v1.94a.97.97 0 0 0 .856.963l.113.007a.97.97 0 0 0 .963-.857l.007-.113V2.379H5.32a.97.97 0 0 0-.963.856l-.007.114v9.698h-1.94V3.349A2.91 2.91 0 0 1 5.32.439h13.577Z',
    doughnutLabels: ['Agriculture', 'Finance', 'Population', 'Technology', 'Health'],
    doughnutDatasets: [
      {
        data: [424480, 130320, 176910, 205200, 419150],
        backgroundColor: doughnutColors,
      },
    ],
    lineLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    lineDatasets: [{
      data: [6000, 7500, 19000, 15000, 20500, 18000, 20000],
      borderColor: 'rgb(90,11,117)',
      pointBackgroundColor: 'rgba(90,11,117,1)',
      pointHoverBackgroundColor: 'rgba(90,11,117,1)',
      pointBorderColor: 'rgba(90,11,117,0)',
      pointRadius: 1,
      pointHitRadius: 64,
      borderWidth: 2,
    }],
  }),
  mounted() {
    this.activities = dummyActivity;
  },
};
