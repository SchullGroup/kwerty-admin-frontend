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
    newIndicator: {},
    indicator: {},
    search: '',
    showModal: false,
    showDeleteModal: false,
    editIndicatorModal: false,
    selectedRows: [],
    itemsOnPage: 20,
    empty: false,
    page: 1,
    pagination: {
      page: 1,
      totalItems: 0,
      totalPages: 1,
    },
    category: '',
    modalCategories: 'Economy',
    modalFrequency: 'Yearly',
    frequency: '',
    optionsCategories: {
      '': 'All Categories',
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
      '': 'All',
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
      'M18.896.44a2.91 2.91 0 0 1 2.91 2.909v1.94h-1.94v11.637a2.91 2.91 0 0 1-2.91 2.91H3.38a2.91 2.91 0 0 1-2.91-2.91v-1.94h15.518v1.94a.97.97 0 0 0 .856.963l.113.007a.97.97 0 0 0 .963-.857l.007-.113V2.379H5.32a.97.97 0 0 0-.963.856l-.007.114v9.698h-1.94V3.349A2.91 2.91 0 0 1 5.32.439h13.577Z', // eslint-disable-line
  }),
  watch: {
    page(val) {
      if (val) {
        this.fetchIndicators(val);
      }
    },
    search() {
      this.fetchIndicators();
    },
    frequency() {
      this.fetchIndicators();
    },
    category() {
      this.fetchIndicators();
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
      updateIndicator: 'indicators/updateIndicator',
    }),
    async createIndicator() {
      const { newIndicator } = this;
      const tags = this.tags.join(',');
      this.isLoading = true;
      try {
        const createdIndicator = await this.addIndicator({ indicator: { ...newIndicator, tags } });
        if (createdIndicator.error) {
          throw Error(createdIndicator.error);
        }
        this.$toast.show({ message: createdIndicator });
        this.isLoading = false;
        this.resetForm();
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    async fetchIndicators(page = 1) {
      const { search, frequency, category } = this;
      this.isLoading = true;
      try {
        const fetchedIndicators = await this.getIndicators({
          page, options: search || frequency || category,
        });
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
      this.isLoading = true;
      try {
        const indicatorRemoved = await this.deleteIndicator({ ids: [...selectedRows] });
        if (indicatorRemoved.error) {
          throw Error(indicatorRemoved.error);
        }
        this.$toast.show({ message: indicatorRemoved });
        this.showDeleteModal = false;
        this.selected = '';
        this.fetchIndicators();
      } catch (error) {
        this.$toast.show({ massage: error });
      }
    },
    async editIndicator() {
      const {
        indicator: {
          id,
          name,
          category,
          frequency,
        },
      } = this;
      const tags = this.tags.join(',');
      this.isLoading = true;
      try {
        const editedIndicator = await this.updateIndicator(
          {
            indicator: {
              name,
              category,
              frequency,
              tags,
            },
            id,
          },
        );
        if (editedIndicator.error) {
          throw Error(editedIndicator.error);
        }
        this.$toast.show({ message: editedIndicator });
        this.isLoading = false;
        this.resetForm();
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    action(id) {
      const currentIndicator = this.indicators.find((indicator) => indicator.id === id);
      this.indicator = currentIndicator;
      this.editIndicatorModal = true;
    },
    resetForm() {
      this.indicator.name = '';
      this.indicator.category = '';
      this.indicator.frequency = '';
      this.tags = [];
      this.showModal = false;
      this.editIndicatorModal = false;
    },
    closeAddIndicators() {
      this.showModal = false;
      this.fetchIndicators();
    },
    closeEditIndicators() {
      this.editIndicatorModal = false;
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
