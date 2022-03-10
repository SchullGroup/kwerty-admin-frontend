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
import indicatorList from '@/mixins/IndicatorList';
import countries from '@/utils/countries';

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
  mixins: [indicatorList],
  data: () => ({
    isLoading: false,
    isCreating: false,
    showModal: false,
    showDeleteModal: false,
    editIndicatorModal: false,
    isEditing: false,
    empty: false,
    countries,
    dateRange: {},
    tags: [],
    newIndicator: {},
    indicator: {},
    search: '',
    selectedRows: [],
    itemsOnPage: 20,
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
      '': 'All Frequency',
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
      const { page } = this;
      this.debounce(this.fetchIndicators, 500)(page);
    },
    frequency() {
      const { page } = this;
      this.fetchIndicators(page);
    },
    category() {
      const { page } = this;
      this.fetchIndicators(page);
    },
  },
  mounted() {
    const { page } = this;
    this.fetchIndicators(page);
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
      const tags = this.tags.length !== 0 ? this.tags.join(',') : '';
      this.isCreating = true;
      try {
        const createdIndicator = tags !== ''
          ? await this.addIndicator({ indicator: { ...newIndicator, tags } })
          : await this.addIndicator({ indicator: { ...newIndicator } });
        if (!createdIndicator.error) {
          this.$toast.show({ message: createdIndicator });
        } else {
          throw Error(createdIndicator.error);
        }
        this.isCreating = false;
        this.resetNewIndicatorForm();
      } catch (error) {
        this.$toast.show({ message: error.message });
        this.isCreating = false;
      }
    },
    getYears() {
      const start = 1950;
      const current = new Date().getFullYear();
      const increment = 1;
      const range = [];
      for (let i = start; i <= current; i += increment) {
        range.push(i);
      }
      this.dateRange = range.reduce((accumulated, currentYear) => {
        const newAccum = { ...accumulated };
        newAccum[currentYear] = parseInt(currentYear, 10);
        return newAccum;
      }, {});
    },
    async fetchIndicators(page = 1) {
      const { search, frequency, category } = this;
      this.isLoading = true;
      try {
        const response = search && category
          ? await this.getIndicators({ name: search, category, page })
          : await this.getIndicators({
            search: search || category || frequency,
            page,
          });
        if (!response.error) {
          this.pagination.page = Number(response.currentPage);
          this.pagination.totalPages = response.totalPages;
          this.pagination.totalItems = Number(response.total);
        }
        this.isLoading = false;
      } catch (error) {
        this.$toast.show({ message: error.message });
      }
    },
    async removeIndicator() {
      const { selectedRows, page } = this;
      this.isLoading = true;
      try {
        const indicatorRemoved = await this.deleteIndicator({ ids: [...selectedRows] });
        if (indicatorRemoved.error) {
          throw Error(indicatorRemoved.error);
        }
        this.$toast.show({ message: indicatorRemoved });
        this.showDeleteModal = false;
        this.selectedRows = [];
        this.search = '';
        this.fetchIndicators(page);
      } catch (error) {
        this.$toast.show({ massage: error.message });
      }
    },
    async editIndicator() {
      const {
        indicator: {
          id, name, category, frequency,
        },
      } = this;
      const tags = this.tags.length !== 0 ? this.tags.join(',') : '';
      this.isEditing = true;
      try {
        const editedIndicator = await this.updateIndicator(
          tags !== ''
            ? {
              indicator: {
                name,
                category,
                frequency,
                tags,
              },
              id,
            }
            : {
              indicator: {
                name,
                category,
                frequency,
              },
              id,
            },
        );
        if (editedIndicator.error) {
          throw Error(editedIndicator.error);
        }
        this.$toast.show({ message: editedIndicator });
        this.isEditing = false;
        this.resetForm();
      } catch (error) {
        this.$toast.show({ message: error.message });
        this.isEditing = false;
      }
    },
    action(id) {
      const currentIndicator = this.indicators.find((indicator) => indicator.id === id);
      this.indicator = { ...currentIndicator };
      this.tags = this.indicator.tags ? this.indicator.tags.split(',') : [];
      this.editIndicatorModal = true;
    },
    resetNewIndicatorForm() {
      const { page } = this;
      this.newIndicator.name = '';
      this.newIndicator.category = '';
      this.newIndicator.frequency = '';
      this.newIndicator.country = '';
      this.newIndicator.startYear = '';
      this.newIndicator.endYear = '';
      this.tags = [];
      this.showModal = false;
      this.fetchIndicators(page);
    },
    resetForm() {
      const { page } = this;
      this.indicator.name = '';
      this.indicator.category = '';
      this.indicator.frequency = '';
      this.tags = [];
      this.showModal = false;
      this.editIndicatorModal = false;
      this.fetchIndicators(page);
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
