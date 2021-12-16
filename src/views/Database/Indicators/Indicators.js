import { mapActions, mapGetters } from 'vuex';
import {
  KDashboardLayout,
  KInput,
  KButton,
  KPagination,
  KTable,
  KModal,
  KCard,
  KInputTag,
} from '@/components';

export default {
  name: 'Indicators',
  components: {
    KDashboardLayout,
    KInput,
    KButton,
    KPagination,
    KTable,
    KModal,
    KCard,
    KInputTag,
  },
  data: () => ({
    isLoading: false,
    tags: [],
    indicator: {},
    search: '',
    showModal: false,
    showDeleteModal: false,
    selectedRows: [],
    itemsOnPage: 20,
    empty: false,
    page: 1,
    pagination: {
      page: 1,
      totalItems: 0,
      totalPages: 1,
    },
    categories: 'All Categories',
    modalCategories: 'Economy',
    modalFrequency: 'Yearly',
    frequency: 'All',
    optionsCategories: {
      all: 'All Categories',
      Agriculture: 'Agriculture',
      Economy: 'Economy',
      Finance: 'Finance',
      Health: 'Health',
      Monetary: 'Monetary',
      Population: 'Population',
      Tax: 'Tax',
      Trade: 'Trade',
    },
    optionsFrequency: {
      all: 'All',
      quarterly: 'Quarterly',
      monthly: 'Monthly',
      yearly: 'Yearly',
    },
    tableFields: ['name', 'category', 'frequency', 'countriesAvailable', 'updatedAt'],
    tableFieldsDisplay: {
      name: 'Name of Indicator',
      category: 'category',
      frequency: 'frequency',
      countriesAvailable: 'Countries available',
      updatedAt: 'Last Modified',
    },
    modelDeleteText: '',
    svgPath:
      'M18.896.44a2.91 2.91 0 0 1 2.91 2.909v1.94h-1.94v11.637a2.91 2.91 0 0 1-2.91 2.91H3.38a2.91 2.91 0 0 1-2.91-2.91v-1.94h15.518v1.94a.97.97 0 0 0 .856.963l.113.007a.97.97 0 0 0 .963-.857l.007-.113V2.379H5.32a.97.97 0 0 0-.963.856l-.007.114v9.698h-1.94V3.349A2.91 2.91 0 0 1 5.32.439h13.577Z',
  }),
  watch: {
    page(val) {
      if (val) {
        this.fetchIndicators(val);
      }
    },
    search(val) {
      if (val) {
        this.fetchIndicators();
      } else if (!val) {
        this.fetchIndicators();
      }
    },
  },
  mounted() {
    this.fetchIndicators();
  },
  computed: {
    ...mapGetters({
      indicators: 'indicators/getIndicators',
    }),
    selected() {
      return this.selectedRows.length;
    },
    emptyState() {
      return this.pagination.page === 1 && this.indicators.length === 0 && !this.isLoading;
    },
    isSame() {
      return this.modelDeleteText === this.requiredMessage;
    },
    requiredMessage() {
      const { selected } = this;
      const suffixS = selected !== 1 ? 's' : '';
      return `Delete ${selected} Indicator${suffixS}`;
    },
  },
  methods: {
    ...mapActions({
      addIndicator: 'indicators/addIndicator',
      getIndicators: 'indicators/getIndicators',
      deleteIndicator: 'indicators/deleteIndicator',
    }),
    async createIndicator() {
      const { indicator } = this;
      const tags = this.tags.join(',');
      this.isLoading = true;
      try {
        const newIndicator = await this.addIndicator({ indicator: { ...indicator, tags } });
        console.log(indicator);
        if (newIndicator.error) {
          throw Error(newIndicator.error);
        }
        this.$toast.show({ message: newIndicator });
        this.isLoading = false;
        this.resetForm();
      } catch (error) {
        console.log(error);
        this.$toast.show({ message: error });
      }
    },
    async fetchIndicators(page = 1) {
      const { search } = this;
      this.isLoading = true;
      try {
        const fetchedIndicators = await this.getIndicators({ page, search });
        if (!fetchedIndicators.error) {
          this.pagination.page = Number(fetchedIndicators.currentPage);
          this.pagination.totalPages = fetchedIndicators.totalPages;
          this.pagination.totalItems = Number(fetchedIndicators.total);
        } else {
          throw Error(fetchedIndicators.error);
        }
        this.isLoading = false;
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    async removeIndicator() {
      const { selectedRows } = this;
      console.log(selectedRows);
      this.isLoading = true;
      try {
        const indicatorRemoved = await this.deleteIndicator({ ids: [...selectedRows] });
        if (indicatorRemoved.error) {
          throw Error(indicatorRemoved.error);
        }
        this.$toast.show({ message: indicatorRemoved });
        this.showDeleteModal = false;
        this.fetchIndicators();
      } catch (error) {
        this.$toast.show({ massage: error });
      }
    },
    resetForm() {
      this.indicator.name = '';
      this.indicator.category = '';
      this.indicator.frequency = '';
      this.tags = [];
      this.showModal = false;
    },
    closeAddIndicators() {
      this.showModal = false;
      this.fetchIndicators();
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
