import { mapActions, mapGetters } from 'vuex';
import indicatorList from '@/mixins/IndicatorList';
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
import { updateData } from '@/api/database';
import countries from '@/utils/countries';
import errorHandler from '@/utils/error-handler';

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
  mixins: [indicatorList],
  data: () => ({
    activeTab: 'all',
    category: '',
    indicator: '',
    country: '',
    isEditing: false,
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
    isActing: false,
    dataTags: [],
    recorded: false,
  }),
  async mounted() {
    const { active } = this.$route.query;
    const valid = ['all', 'published', 'unpublished', 'draft'];
    if (!active || valid.indexOf(active) === -1) {
      this.activeTab = 'all';
    } else {
      this.activeTab = active;
    }
    this.getData({});
    // this.getIndicatorsList();
  },
  watch: {
    activeTab() {
      this.isSingleView = false;
      this.resetSelectedRows();
      this.getData();
    },
    currentPage(val) {
      this.getData({ page: val });
    },
    search() {
      this.debounce(this.getData, 500)();
    },
    country() {
      this.getData();
    },
    category() {
      this.getData();
    },
    indicator() {
      this.getData();
    },
    isSingleView(val) {
      if (!val) this.singleViewData = {};
    },
  },
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
      performDataAction: 'database/performDataAction',
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
        const data = this.allData.find((d) => d.id === pageId);
        if (data) {
          const { isPublished, isDeleted } = data;
          this.singleViewData = { isPublished, isDeleted } || {};
          this.selectedRows = [];
        }
        this.fetchSingleData({ pageId });
      } else {
        this.currentNameOfIndicator = '';
      }
      this.isEditing = false;
      this.isSingleView = !this.isSingleView;
    },
    async getData(params) {
      let reqParams = { ...params }; // eslint-disable-line
      const {
        activeTab, search, country, category, indicator,
      } = this;
      reqParams[activeTab] = activeTab === 'all' ? '' : 'yes';
      reqParams.search = search;
      this.isFetching = true;
      try {
        const paginationData = await this.fetchDatabase({
          ...reqParams,
          country,
          category,
          indicator,
        });
        if (!paginationData.error) {
          this.paginationData = paginationData;
          this.paginationData.currentPage = Number(paginationData.currentPage);
        } else {
          throw Error(paginationData.error);
        }
      } catch (error) {
        this.$toast.show({ message: errorHandler(error).error });
      } finally {
        this.isFetching = false;
      }
    },
    async updateSingleData() {
      const { singleViewData, dataTags } = this;
      const {
        id, data, metric, country, notes, source, link,
      } = singleViewData;
      const tags = dataTags ? dataTags.join(',') : '';
      try {
        const response = await updateData({
          id,
          payload: {
            ...{
              data,
              metric,
              country,
              notes,
              source,
              link,
            },
            tags,
          },
        });
        if (!response.error) {
          this.$toast.show({ message: response.data.message });
        } else {
          throw Error(response.error);
        }
        this.isEditing = false;
        this.fetchSingleData({ pageId: id });
        this.getData({});
      } catch (error) {
        this.$toast.show({ message: errorHandler(error).error });
      }
    },
    async fetchSingleData({ pageId }) {
      this.isFetching = true;
      try {
        const singleData = await this.fetchDataById(pageId);
        if (!singleData.error) {
          this.singleViewData = singleData;
          this.dataTags = singleData.tags ? singleData.tags.split(',') : [];
        } else {
          throw Error(singleData.error);
        }
      } catch (error) {
        this.$toast.show({ message: errorHandler(error).error });
      } finally {
        this.isFetching = false;
      }
    },
    async actOnData(action) {
      this.isActing = true;
      try {
        const actionDone = await this.performDataAction({ action, ids: this.selectedRows });
        if (!actionDone.error) {
          this.$toast.show({ message: actionDone });
          this.closeModal();
          this.getData();
          this.resetSelectedRows();
        } else {
          throw Error(actionDone.error);
        }
      } catch (error) {
        this.$toast.show({ message: errorHandler(error).error });
      } finally {
        this.isActing = false;
      }
    },
  },
};
