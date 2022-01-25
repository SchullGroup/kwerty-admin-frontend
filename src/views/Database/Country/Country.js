import {
  KDashboardLayout,
  KInput,
  KButton,
  KPagination,
} from '@/components';
import doughnutColors from '../../../utils/doughnut-colors';
import DoughnutWrapper from '../../../components/Charts/DoughnutWrapper.vue';

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
    duration: '',
    status: 'down',
    path:
      // eslint-disable-next-line
      'M4.00004 3.73242L0.906288 0.638672L0.0225387 1.52242L4.00004 5.49992L7.97754 1.52242L7.09379 0.638672L4.00004 3.73242Z',
    pagination: {
      totalItems: 20,
      totalPages: 6,
      page: 1,
    },
    optionsDisplay: {
      alltime: 'All time',
      '>24hours': 'Last 24 hours',
      '>7days': 'Last 7 days',
      '>30days': 'Last 30 days',
      '>3months': 'Last 3 months',
      '>6months': 'Last 6 months',
      lastyear: 'Last year',
    },
    doughnutLabels: ['Ghana', 'Benin Republic', 'Poland', 'Cameroon', 'Nigeria'],
    doughnutDatasets: [
      {
        data: [89231, 13423, 72423, 90123, 192191],
        backgroundColor: doughnutColors,
      },
    ],
  }),
};
