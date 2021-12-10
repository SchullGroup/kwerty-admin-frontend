import {
  KDashboardLayout,
  KInput,
  KButton,
  KPagination,
  KTable,
  KModal,
  KCard,
} from '@/components';
import data from '@/utils/dummy-database';

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
  },
  data: () => ({
    addIndicator: false,
    showModal: false,
    showDeleteModal: false,
    selectedRows: [],
    page: 1,
    totalItems: 20,
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
    tableData: data.indicators,
  }),
  computed: {
    selected() {
      return this.selectedRows.length;
    },
  },
  methods: {
    prevPage() {},
    nextPage() {},
  },
};
