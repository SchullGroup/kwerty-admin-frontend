import { mapActions, mapGetters } from 'vuex';
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
import countries from '@/utils/countries';

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
    category: '',
    indicator: 'all',
    country: '',
    isEditing: false,
    categories: {
      '': 'All Categories',
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
    countries,
    tableFields: ['nameOfIndicator', 'country', 'startYear', 'endYear', 'lastModified'],
    tableFieldsDisplay: {
      nameOfIndicator: 'Name of Indicator',
      country: 'Country',
      startYear: 'Start Year',
      endYear: 'End Year',
      lastModified: 'Last Modified',
    },
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
    singleViewData: {},
    svgPath:
      'M18.896.44a2.91 2.91 0 0 1 2.91 2.909v1.94h-1.94v11.637a2.91 2.91 0 0 1-2.91 2.91H3.38a2.91 2.91 0 0 1-2.91-2.91v-1.94h15.518v1.94a.97.97 0 0 0 .856.963l.113.007a.97.97 0 0 0 .963-.857l.007-.113V2.379H5.32a.97.97 0 0 0-.963.856l-.007.114v9.698h-1.94V3.349A2.91 2.91 0 0 1 5.32.439h13.577Z', // eslint-disable-line
    isFetching: true,
    paginationData: {
      currentPage: 1,
      totalPages: 1,
      total: 0,
    },
    search: '',
    currentNameOfIndicator: '',
  }),
  computed: {
    ...mapGetters({
      allData: 'database/getDatabase',
    }),
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
    currentPage: {
      get() {
        return this.paginationData.currentPage;
      },
      set(value) {
        this.paginationData.currentPage = value;
      },
    },
  },
  methods: {
    ...mapActions({
      fetchDatabase: 'database/fetchDatabase',
      fetchDataById: 'database/fetchDataById',
    }),
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
      if (typeof pageId === 'string') {
        this.fetchSingleData({ pageId });
        // remove later when BE is fixed;
        const currentData = this.allData.find((data) => data.id === pageId);
        this.currentNameOfIndicator = currentData.nameOfIndicator;
      } else {
        this.currentNameOfIndicator = '';
      }
      this.isSingleView = !this.isSingleView;
    },
    async getData(params) {
      let reqParams = { ...params }; // eslint-disable-line
      const {
        activeTab, search, country, category,
      } = this;
      reqParams[activeTab] = activeTab === 'all' ? '' : 'yes';
      reqParams.search = search;
      this.isFetching = true;
      try {
        const paginationData = await this.fetchDatabase({ ...reqParams, country, category });
        if (!paginationData.error) {
          this.paginationData = paginationData;
          this.paginationData.currentPage = Number(paginationData.currentPage);
        } else {
          throw Error(paginationData.error);
        }
      } catch (error) {
        this.$toast.show({ message: error });
      } finally {
        this.isFetching = false;
      }
    },
    async fetchSingleData({ pageId }) {
      this.isFetching = true;
      try {
        const singleData = await this.fetchDataById(pageId);
        if (!singleData.error) {
          this.singleViewData = singleData;
        } else {
          throw Error(singleData.error);
        }
      } catch (error) {
        this.$toast.show({ message: error });
      } finally {
        this.isFetching = false;
      }
    },
  },
  watch: {
    activeTab() {
      this.resetSelectedRows();
      this.getData();
    },
    currentPage(val) {
      this.getData({ page: val });
    },
    search() {
      this.getData();
    },
    country() {
      this.getData();
    },
    category() {
      this.getData();
    },
  },
  mounted() {
    const { active } = this.$route.query;
    const valid = ['all', 'published', 'unpublished', 'draft'];
    if (!active || valid.indexOf(active) === -1) {
      this.activeTab = 'all';
    } else {
      this.activeTab = active;
    }
    this.getData({});
  },
};
