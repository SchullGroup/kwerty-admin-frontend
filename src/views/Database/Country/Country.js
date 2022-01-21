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
  name: 'Country',
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
