<template>
  <k-dashboard-layout>
    <header class="customer__header">
      <div class="customer__header--text">
        <p @click="$router.go(-1)">
          <img src="@/assets/back.svg" alt="" class="back-arrow" />
          Back
        </p>
        <h1>{{ name }}'s Activities</h1>
      </div>
      <div class="header--content">
        <k-pagination
          :page="pagination.page"
          :maxItemsOnPage="20"
          :totalItems="pagination.totalItems"
          :totalPages="pagination.totalPages"
          variant="many"
          @goToNext="nextPage"
          @goToPrev="prevPage"
          @goToFirst="firstPage"
          @goToLast="lastPage"
        ></k-pagination>
        <k-input
          type="select"
          variant="dropdown"
          label="Duration"
          v-model="duration"
          :optionsDisplay="optionsDurations"
        ></k-input>
        <k-button variant="secondary" @click="modalOpen = true">Export</k-button>
      </div>
    </header>
    <div class="table__content">
      <k-table
        :fields="tableFields"
        :fields-display="tableFieldsDisplay"
        :datalist="customerData"
        :loading="isLoading"
        :customers="true"
      >
      </k-table>
    </div>
    <!-- EXPORT MODAL -->
    <k-modal @close="modalOpen = false" :open="modalOpen">
      <k-card variant="in-modal" heading="Export User List">
        <form class="form__items">
          <k-input label="Title" name="title" v-model="title"></k-input>
          <k-input
            label="File Type"
            name="file-type"
            type="select"
            v-model="fileType"
            :optionsDisplay="fileTypes"
          ></k-input>
          <div class="input-row">
            <k-input label="Start Date" name="start-date" type="date" v-model="startDate"></k-input>
            <k-input label="End Date" name="end-date" type="date" v-model="endDate"></k-input>
          </div>
          <div class="modal-controls">
            <k-button variant="link" @click="reset">Cancel</k-button>
            <k-button variant="secondary" :loading="isDownloading" @click="downloadCsv"
              >Download File</k-button
            >
          </div>
        </form>
      </k-card>
    </k-modal>
  </k-dashboard-layout>
</template>

<script>
import { mapActions } from 'vuex';
import formatISO from 'date-fns/formatISO';
import { saveAs } from 'file-saver';
import pdfTemplate from '../Activity/pdfTemplate';
import { downloadDataset } from '../../api/upload';
import formatters from '../../utils/formatters';

import {
  KDashboardLayout,
  KInput,
  KButton,
  KPagination,
  KTable,
  KCard,
  KModal,
} from '@/components';

export default {
  name: 'singleuser',
  components: {
    KDashboardLayout,
    KButton,
    KInput,
    KPagination,
    KTable,
    KCard,
    KModal,
  },
  // mixins: [downloadCsv],
  data: () => ({
    startDate: '',
    endDate: '',
    fileType: '',
    title: '',
    isLoading: false,
    isDownloading: false,
    search: '',
    duration: '7 days',
    modalOpen: false,
    optionsDurations: {
      '': 'All Time',
      '24hours': 'Last 24 hours',
      '7days': 'Last 7 days',
      '30days': 'Last 30 days',
      '3months': 'Last 3 months',
      '6months': 'Last 6 months',
      '12months': 'Last year',
    },
    fileTypes: {
      csv: 'CSV',
      pdf: 'PDF',
    },
    name: '',
    customerData: [],
    page: 1,
    pagination: {
      page: 1,
      totalItems: 9,
      totalPages: 4,
    },
    tableFields: ['fullName', 'actions', 'userLastSeen'],
    tableFieldsDisplay: {
      fullName: 'Name',
      actions: 'Actions',
      userLastSeen: 'Timestamp',
    },
  }),
  watch: {
    duration() {
      const { id } = this.$route.query;
      this.getSingleUserActivities(id);
    },
  },
  mounted() {
    const { id } = this.$route.query;
    this.name = this.$route.query.name;
    this.getSingleUserActivities(id);
  },
  methods: {
    ...mapActions({
      singleCustomerActivities: 'customers/singleCustomerActivities',
      exportCustomers: 'customers/exportCustomers',
    }),
    async getSingleUserActivities(id) {
      const { duration, page } = this;
      try {
        const response = await this.singleCustomerActivities({ id, duration, page });
        if (!response.error) {
          this.pagination.page = Number(response.currentPage);
          this.pagination.totalItems = response.total;
          this.pagination.totalPages = response.totalPages;
          this.customerData = response.customer;
        }
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    async downloadCsv() {
      const {
        startDate, endDate, fileType, title,
      } = this;
      const { id } = this.$route.query;
      const startdate = formatISO(new Date(startDate));
      const enddate = formatISO(new Date(endDate));
      this.isDownloading = true;
      try {
        const downloaded = await this.exportCustomers({
          startDate: startdate,
          endDate: enddate,
          fileType: fileType === 'pdf' ? 'csv' : 'csv',
          title,
          id,
        });
        if (fileType === 'pdf') {
          // eslint-disable-next-line no-useless-escape
          const result = downloaded
            .replaceAll('"', '')
            .split('\n')
            .map((row) => row.split(','));
          const tableHeaders = result.shift();
          tableHeaders.shift();
          tableHeaders.pop();
          const newResult = [];
          result.map((item) => item.pop());
          result.map((item) => item.shift());
          result.forEach((r, i) => {
            const dateIndex = r.length - 1;
            const formattedDate = formatters.formatDate(r[dateIndex]);
            newResult.push(result[i].splice(dateIndex, 1, formattedDate));
          });
          result.forEach((r, i) => {
            const dateIndex = r.length - 5;
            const formattedDate = formatters.formatDate(r[dateIndex]);
            newResult.push(result[i].splice(dateIndex, 1, formattedDate));
          });
          console.log(result);
          const options = { tableHeaders, tableBodyData: result, title };
          const final = pdfTemplate(options);
          console.log(final);
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
        this.isDownloading = false;
        this.reset();
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    reset() {
      this.startDate = '';
      this.endDate = '';
      this.fileType = '';
      this.title = '';
      this.modalOpen = false;
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
</script>

<style lang="scss" scoped>
.customer__header {
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: space-between;
  &--text {
    display: grid;
    grid-row-gap: 0.8rem;
    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      cursor: pointer;
    }
    .back-arrow {
      margin-right: 1.1rem;
    }
  }
}
.header--content {
  display: grid;
  grid-template-columns: max-content 16.5rem max-content;
  grid-column-gap: 1.6rem;
}
</style>
