import {
  KDashboardLayout, KInput, KTable, KButton,
} from '@/components';
import AllData from './All.vue';
import database from '@/utils/dummy-database';

export default {
  name: 'ManageData',
  components: {
    KButton,
    AllData,
    KInput,
    KDashboardLayout,
    KTable,
  },
  data: () => ({
    activeTab: 'all',
    category: 'all',
    indicator: 'all',
    country: 'all',
    categories: {
      all: 'All Categories',
      agriculture: 'Agriculture',
      economy: 'Economy',
      finance: 'Finance',
      health: 'Health',
      labour: 'Labour',
      monetary: 'Monetary',
      population: 'Population',
      tax: 'Tax',
      trade: 'Trade',
    },
    indicators: {
      all: 'All Indicators',
      'Central Budget': 'Central Budget',
      'Current Account': 'Current Account',
      'Primary Income': 'Primary Income',
      'Secondary Income': 'Secondary Income',
      'Capital Account': 'Capital Account',
      'Financial Account': 'Financial Account',
      'Current Account to GDP': 'Current Account to GDP',
      'Official Reserve Assets': 'Official Reserve Assets',
      'Public Finance Sector Revenue': 'Public Finance Sector Revenue',
    },
    countries: {
      all: 'All Countries',
      germany: 'Germany',
      france: 'France',
      italy: 'Italy',
      poland: 'Poland',
      spain: 'Spain',
      portugal: 'Portugal',
      netherlands: 'Netherlands',
      ireland: 'Ireland',
      belgium: 'Belgium',
    },
    tableFields: ['indicator', 'country', 'startYear', 'endYear', 'lastModified'],
    tableFieldsDisplay: {
      indicator: 'Name of Indicator',
      country: 'Country',
      startYear: 'Start Year',
      endYear: 'End Year',
      lastModified: 'Last Modified',
    },
    allTableData: database.all,
    selectedRows: [],
  }),
  computed: {
    selected() {
      return this.selectedRows.length;
    },
  },
};
