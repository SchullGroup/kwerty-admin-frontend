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
    page: 1,
    totalItems: 0,
    itemsOnPage: 20,
    totalPages: 1,
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
      Quarterly: 'Quarterly',
      Monthly: 'Monthly',
      Yearly: 'Yearly',
    },
    tableFields: ['indicator', 'category', 'frequency', 'available', 'lastModified'],
    tableFieldsDisplay: {
      indicator: 'Name of Indicator',
      category: 'category',
      frequency: 'frequency',
      available: 'Countries available',
      lastModified: 'Last Modified',
    },
    svgPath:
      'M18.896.44a2.91 2.91 0 0 1 2.91 2.909v1.94h-1.94v11.637a2.91 2.91 0 0 1-2.91 2.91H3.38a2.91 2.91 0 0 1-2.91-2.91v-1.94h15.518v1.94a.97.97 0 0 0 .856.963l.113.007a.97.97 0 0 0 .963-.857l.007-.113V2.379H5.32a.97.97 0 0 0-.963.856l-.007.114v9.698h-1.94V3.349A2.91 2.91 0 0 1 5.32.439h13.577Z',
  }),
  watch: {
    page(val) {
      if (val) {
        this.fetchIndicator(val);
      }
    },
  },
  mounted() {
    this.fetchIndicator();
  },
  computed: {
    ...mapGetters({
      indicators: 'indicators/getIndicators',
    }),
    selected() {
      return this.selectedRows.length;
    },
  },
  methods: {
    ...mapActions({
      addIndicator: 'indicators/addIndicator',
      getIndicators: 'indicators/getIndicators',
    }),
    async createIndicator() {
      const { indicator } = this;
      const tags = this.tags.join(',');
      this.isLoading = true;
      try {
        const newIndicator = await this.addIndicator({ indicator: { ...indicator, tags } });
        if (!newIndicator.error) {
          this.$toast.show({ message: newIndicator });
        } else {
          throw Error(newIndicator.error);
        }
        this.showModal = false;
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    async fetchIndicator(page = 1) {
      const { search } = this;
      this.isLoading = true;
      try {
        const fetchedIndicators = await this.getIndicators({ page, search });
        if (!fetchedIndicators.error) {
          this.page = Number(fetchedIndicators.currentPage);
          this.totalPages = fetchedIndicators.totalPages;
          this.totalItems = Number(fetchedIndicators.total);
        } else {
          throw Error(fetchedIndicators.error);
        }
        this.isLoading = false;
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
      this.page = this.totalPages;
    },
  },
};
