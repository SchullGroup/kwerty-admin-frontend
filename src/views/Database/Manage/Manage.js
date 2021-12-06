import {
  KDashboardLayout,
  KInput,
  KTable,
  KButton,
  KPagination,
  KModal,
  KCard,
} from '@/components';
import database from '@/utils/dummy-database';

export default {
  name: 'ManageData',
  components: {
    KCard,
    KModal,
    KPagination,
    KButton,
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
    modalOpen: false,
    activeModal: 'unpublish',
    entered: '',
    actionDisplays: {
      unpublish: 'Unpublish',
      publish: 'Publish',
      delete: 'Delete',
      restore: 'Restore',
      'clear your bin': 'Permanently delete',
    },
  }),
  computed: {
    selected() {
      return this.selectedRows.length;
    },
    isSame() {
      return this.entered === this.requiredMessage;
    },
    requiredMessage() {
      const { activeModal, selected, actionDisplays } = this;
      const suffixS = selected !== 1 ? 's' : '';
      return `${actionDisplays[activeModal]} ${selected} data set${suffixS}`;
    },
  },
  methods: {
    resetSelectedRows() {
      this.selectedRows = [];
    },
    confirmAction(action) {
      this.modalOpen = true;
      this.activeModal = action;
    },
    closeModal() {
      this.entered = '';
      this.modalOpen = false;
    },
  },
  watch: {
    activeTab(val) {
      this.resetSelectedRows();
      this.allTableData = database[val];
    },
  },
  mounted() {
    const { active } = this.$route.query;
    let activeTab;
    switch (active) {
      case 'all':
        activeTab = 'all';
        break;
      case 'published':
        activeTab = 'published';
        break;
      case 'drafts':
        activeTab = 'drafts';
        break;
      case 'deleted':
        activeTab = 'deleted';
        break;
      default:
        return;
    }
    this.activeTab = activeTab;
  },
};
