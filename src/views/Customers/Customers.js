import { mapActions, mapGetters } from 'vuex';
import {
  KDashboardLayout,
  KButton,
  KInput,
  KPagination,
  KTable,
  KModal,
  KCard,
} from '@/components/index';

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
    tableFields: ['fullName', 'email', 'joined', 'userLastSeen'],
    tableFieldsDisplay: {
      fullName: 'Full Name',
      email: 'Email',
      joined: 'Joined',
      userLastSeen: 'Last seen',
    },
    fileType: 'csv',
    fileTypes: {
      csv: 'CSV',
      pdf: 'PDF',
    },
  }),
  mounted() {
    this.fetchAllCustomers();
  },
  computed: {
    ...mapGetters({
      customers: 'customers/getCustomers',
    }),
  },
  methods: {
    ...mapActions({
      getAllCustomers: 'customers/getAllCustomers',
    }),
    async fetchAllCustomers() {
      this.isLoading = true;
      try {
        const response = await this.getAllCustomers();
        if (!response.error) {
          this.pagination.page = response.currentPage;
          this.pagination.totalItems = response.total;
          this.pagination.totalPages = response.totalPages;
        } else {
          throw Error(response.error);
        }
        this.isLoading = false;
      } catch (error) {
        this.$toast.show({ message: error });
        this.isLoading = false;
      }
    },
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
