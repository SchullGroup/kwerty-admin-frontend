import {
  KDashboardLayout,
  KInput,
  KTable,
  KButton,
  KPagination,
  KModal,
  KCard,
} from '@/components';
import BackIcon from './BackIcon.vue';
import SingleData from './SingleData.vue';
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
    BackIcon,
    SingleData,
  },
  data: () => ({
    activeTab: 'all',
    category: 'all',
    indicator: 'all',
    country: 'all',
    isEditing: false,
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
    isSingleView: false,
    singleViewData: database.single,
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
    changePage(pageId) {
      console.log(pageId);
      this.isSingleView = !this.isSingleView;
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
    const valid = ['all', 'published', 'unpublished', 'drafts'];
    if (!active || valid.indexOf(active) === -1) return;
    this.activeTab = active;
  },
};
