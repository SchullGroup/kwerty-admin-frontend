import {
  KDashboardLayout,
  KInput,
  KButton,
  KPagination,
} from '@/components';

export default {
  name: 'Indicators',
  components: {
    KDashboardLayout,
    KInput,
    KButton,
    KPagination,
  },
  data: () => ({
    page: 1,
    totalItems: 20,
    itemsOnPage: 20,
    categories: 'All Categories',
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
  }),
  methods: {
    prevPage() {},
    nextPage() {},
  },
};
