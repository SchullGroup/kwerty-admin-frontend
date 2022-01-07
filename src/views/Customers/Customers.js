import {
  KDashboardLayout,
  KButton,
  KInput,
  KPagination,
  KTable,
  KModal,
  KCard,
} from '@/components/index';
import data from '@/utils/dummy-database';

export default {
  name: 'Customers',
  components: {
    KDashboardLayout,
    KButton,
    KInput,
    KPagination,
    KTable,
    KModal,
    KCard,
  },
  data: () => ({
    isLoading: false,
    search: '',
    modalOpen: false,
    startDate: '',
    endDate: '',
    title: '',
    pagination: {
      page: 1,
      totalItems: 9,
      totalPages: 4,
    },
    tableFields: ['name', 'email', 'joined', 'lastSeen'],
    tableFieldsDisplay: {
      name: 'Full Name',
      email: 'Email',
      joined: 'Joined',
      lastSeen: 'Last seen',
    },
    fileType: 'csv',
    fileTypes: {
      csv: 'CSV',
      pdf: 'PDF',
    },
    customers: data.Customers,
  }),
  methods: {
    downloadUsers() {},
    prevPage() {
      this.page -= 1;
    },
    nextPage() {
      this.page += 1;
    },
    firstPage() {
      this.page = 1;
    },
    lastPage() {
      this.page = this.pagination.totalPages;
    },
  },
};
