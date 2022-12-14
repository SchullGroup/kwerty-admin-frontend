import { mapActions, mapGetters } from 'vuex';
import downloadCsv from '@/mixins/export';

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
  mixins: [downloadCsv],
  data: () => ({
    isLoading: false,
    isDownloading: false,
    search: '',
    modalOpen: false,
    status: '',
    page: 1,
    pagination: {
      page: 1,
      totalItems: NaN,
      totalPages: NaN,
    },
    tableFields: ['fullName', 'email', 'joined', 'userLastSeen'],
    tableFieldsDisplay: {
      fullName: 'Full Name',
      email: 'Email',
      joined: 'Joined',
      userLastSeen: 'Last seen',
    },
    fileTypes: {
      csv: 'CSV',
      pdf: 'PDF',
    },
  }),
  watch: {
    search() {
      this.debounce(this.fetchAllCustomers, 500)();
    },
    page(val) {
      this.fetchAllCustomers(val);
    },
  },
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
      changeCustomerStatus: 'customers/changeCustomerStatus',
      exportCustomers: 'customers/exportCustomers',
    }),
    async fetchAllCustomers(page = 1) {
      const { search } = this;
      this.isLoading = true;
      try {
        const response = await this.getAllCustomers({ page, nameOrEmail: search });
        if (!response.error) {
          this.pagination.page = Number(response.currentPage);
          this.pagination.totalItems = response.total;
          this.pagination.totalPages = response.totalPages;
        } else {
          throw Error(response.error);
        }
        this.isLoading = false;
      } catch (error) {
        this.$toast.show({ message: error.message });
        this.isLoading = false;
      }
    },
    async changeUserStatus(user) {
      try {
        const response = await this.changeCustomerStatus(user);
        if (!response.error) {
          this.$toast.show({ message: response });
        } else {
          throw Error(response.error);
        }
      } catch (error) {
        this.$toast.show({ message: error.message });
      }
    },
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
