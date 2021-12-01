import { KDashboardLayout, KInput } from '@/components';

export default {
  name: 'ManageData',
  components: { KInput, KDashboardLayout },
  data: () => ({
    category: 'all',
    indicator: 'all',
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
  }),
};
