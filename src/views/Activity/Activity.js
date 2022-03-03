import { mapActions, mapGetters } from 'vuex';
import formatISO from 'date-fns/formatISO';
import { saveAs } from 'file-saver';
import formatters from '../../utils/formatters';

import {
  KDashboardLayout,
  KPagination,
  KInput,
  KButton,
  KModal,
  KCard,
} from '@/components';
import ActivityTableRow from './TableRow.vue';
import pdfTemplate from './pdfTemplate';
import { downloadDataset } from '../../api/upload';

export default {
  name: 'ActivityHome',
  components: {
    KCard,
    KModal,
    KButton,
    ActivityTableRow,
    KInput,
    KPagination,
    KDashboardLayout,
  },
  data: () => ({
    sortField: '',
    direction: 'asc',
    downloadData: [],
    type: null,
    page: 1,
    maxItemsOnPage: 20,
    isLoading: false,
    isDownLoading: false,
    search: '',
    paginationData: {
      page: 1,
      totalItems: 0,
      itemsOnPage: 20,
      totalPages: 0,
    },
    displayFields: ['name', 'activity', 'createdAt'],
    duration: '',
    optionsDisplay: {
      '': 'All',
      '24hours': 'Last 24 hours',
      '7days': 'Last 7 days',
      '30days': 'Last 30 days',
      '3months': 'Last 3 months',
      '6months': 'Last 6 months',
      '12months': 'Last year',
    },
    modalOpen: false,
    fileType: '',
    startDate: '',
    endDate: '',
    title: '',
    fileTypes: {
      csv: 'CSV',
      pdf: 'PDF',
    },
    svgPath:
    // eslint-disable-next-line vue/max-len
      'M18.896.44a2.91 2.91 0 0 1 2.91 2.909v1.94h-1.94v11.637a2.91 2.91 0 0 1-2.91 2.91H3.38a2.91 2.91 0 0 1-2.91-2.91v-1.94h15.518v1.94a.97.97 0 0 0 .856.963l.113.007a.97.97 0 0 0 .963-.857l.007-.113V2.379H5.32a.97.97 0 0 0-.963.856l-.007.114v9.698h-1.94V3.349A2.91 2.91 0 0 1 5.32.439h13.577Z',
  }),
  mounted() {
    this.setType();
    const {
      $route: { query },
    } = this;
    this.search = query.userName;
  },
  watch: {
    page(value) {
      if (value) {
        this.fetchActivities(value);
      }
    },
    search() {
      this.fetchActivities();
    },
    duration() {
      this.fetchActivities();
    },
    $route() {
      this.setType();
    },
  },
  computed: {
    ...mapGetters({
      adminActivities: 'activity/getActivities',
      userActivities: 'activity/getUserActivities',
    }),
    pageTitle() {
      const { type } = this;
      return type ? `${type[0].toUpperCase()}${type.slice(1)} Activity` : 'Activity';
    },
    activities() {
      return this.type === 'admin' ? this.adminActivities : this.userActivities;
    },
    sorted() {
      const {
        sortField, direction, activities,
      } = this;
      if (!sortField) {
        return activities;
      }
      const newActivityData = [...activities];
      newActivityData.sort(this[direction](sortField));
      return newActivityData;
    },
  },
  methods: {
    ...mapActions({
      getAdminActivities: 'activity/getActivities',
      exportActivities: 'activity/exportActivities',
    }),
    async fetchActivities(page = 1) {
      const { type, search, duration } = this;
      this.isLoading = true;
      try {
        const activitiesFetched = await this.getAdminActivities({
          page,
          type,
          search,
          duration,
        });
        if (!activitiesFetched.error) {
          this.paginationData.page = Number(activitiesFetched.currentPage);
          this.paginationData.totalItems = Number(activitiesFetched.total);
          this.paginationData.totalPages = activitiesFetched.totalPages;
        } else {
          throw Error(activitiesFetched.error);
        }
        this.isLoading = false;
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    async downloadActivities() {
      const {
        type,
        startDate,
        endDate,
        fileType,
        title,
      } = this;
      console.log(startDate);
      const startdate = formatISO(new Date(startDate));
      const enddate = formatISO(new Date(endDate));
      this.isDownLoading = true;
      try {
        const downloaded = await this.exportActivities({
          type,
          startdate,
          enddate,
          fileType: fileType === 'pdf' ? 'csv' : 'csv',
          title,
        });
        if (!downloaded.includes('error')) {
          if (fileType === 'pdf') {
            // eslint-disable-next-line no-useless-escape
            const result = downloaded.replaceAll('\"', '')
              .split('\n').map((row) => row.split(','));
            const tableHeaders = result.shift();
            const newResult = [];
            result.forEach((r, i) => {
              const dateIndex = r.length - 1;
              const formattedDate = formatters.formatDate(r[dateIndex]);
              newResult.push(result[i].splice(dateIndex, 1, formattedDate));
            });
            const options = { tableHeaders, tableBodyData: result, title };
            const final = pdfTemplate(options);
            const htmlBlob = new Blob([final], { type: 'text/plain' });
            const htmlFile = new File([htmlBlob], { type: 'text/plain' });
            const formData = new FormData();
            formData.append('file', htmlFile);
            const response = await downloadDataset({ data: formData, type: 'pdf' });
            const responseBlob = new Blob([response.data], { type: 'application/pdf' });
            const fileName = `${title}.pdf`;
            saveAs(responseBlob, fileName);
          } else {
            const blob = new Blob([downloaded], { type: 'text/plain;charset=UTF-8' });
            saveAs(blob, `${title}.csv`);
            this.$toast.show({ message: `Exported ${title}.csv` });
          }
        } else if (downloaded.includes('error')) {
          this.$toast.show({ message: 'No data for date range' });
        }
        this.reset();
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    reset() {
      this.isDownLoading = false;
      this.startDate = '';
      this.endDate = '';
      this.fileType = '';
      this.title = '';
      this.modalOpen = false;
    },
    setSortField(fieldname) {
      // console.log(this.sorted);
      if (fieldname === this.sortField) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc';
      }
      this.sortField = fieldname;
    },
    asc(sortField) {
      return (a, b) => a[sortField].toString().localeCompare(b[sortField].toString());
    },
    desc(sortField) {
      return (a, b) => b[sortField].toString().localeCompare(a[sortField].toString());
    },
    setType() {
      const { type } = this.$route.params;
      this.type = type === 'admin' ? 'admin' : 'user';
      if (!this.$route.query.userName) this.fetchActivities();
    },
    nextPage() {
      this.page += 1;
    },
    prevPage() {
      this.page -= 1;
    },
    firstPage() {
      this.page = 1;
    },
    lastPage() {
      this.page = this.paginationData.totalPages;
    },
  },
};
