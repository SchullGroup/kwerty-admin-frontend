import { mapActions, mapGetters } from 'vuex';
import formatISO from 'date-fns/formatISO';
import { saveAs } from 'file-saver';

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
    fileType: 'csv',
    status: '',
    page: 1,
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
    fileTypes: {
      csv: 'CSV',
      pdf: 'PDF',
    },
  }),
  watch: {
    search() {
      this.fetchAllCustomers();
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
    async fetchAllCustomers() {
      const { search, page } = this;
      this.isLoading = true;
      try {
        const response = await this.getAllCustomers({ page, search });
        if (!response.error) {
          this.pagination.page = Number(response.currentPage);
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
    async changeUserStatus(user) {
      try {
        const response = await this.changeCustomerStatus(user);
        if (!response.error) {
          this.$toast.show({ message: response });
        } else {
          throw Error(response.error);
        }
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    async downloadCustomers() {
      const {
        startDate,
        endDate,
        fileType,
        title,
      } = this;
      const startdate = formatISO(new Date(startDate));
      const enddate = formatISO(new Date(endDate));
      console.log(startdate);
      console.log(enddate);
      this.isLoading = true;
      try {
        const downloaded = await this.exportCustomers({
          startDate: startdate,
          endDate: enddate,
          fileType,
          title,
        });
        if (downloaded.error) {
          throw Error(downloaded.error);
        }
        const blob = new Blob([downloaded], { type: 'text/plain;charset=UTF-8' });
        saveAs(blob, `${title}.csv`);
        this.$toast.show({ message: `Exported ${title}.csv` });
        this.isLoading = false;
        this.modalOpen = false;
      } catch (error) {
        this.$toast.show({ message: error });
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
