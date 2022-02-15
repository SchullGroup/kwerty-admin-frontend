import {
  KDashboardLayout,
  KInput,
  KButton,
  KPagination,
  // KTable,
  // KModal,
  // KCard,
} from '@/components';

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
      totalItems: 20,
      totalPages: 6,
      page: 1,
    },
  }),
};
