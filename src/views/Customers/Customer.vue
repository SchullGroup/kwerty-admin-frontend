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
  </k-dashboard-layout>
</template>

<script>
import { mapActions } from 'vuex';
// eslint-disable-next-line vue/max-len
import {
  KDashboardLayout,
  KInput, KButton,
  KPagination,
  KTable,
} from '@/components';

export default {
  name: 'singleuser',
  components: {
    KDashboardLayout,
    KButton,
    KInput,
    KPagination,
    KTable,
  },
  data: () => ({
    isLoading: false,
    search: '',
    duration: 'All Time',
    optionsDurations: {
      '': 'All Time',
      '24hours': 'Last 24 hours',
      '7days': 'Last 7 days',
      '30days': 'Last 30 days',
      '3months': 'Last 3 months',
      '6months': 'Last 6 months',
      '12months': 'Last year',
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
  mounted() {
    const { email } = this.$route.query;
    this.name = this.$route.query.name;
    this.getSingleUserActivities(email);
  },
  methods: {
    ...mapActions({
      singleCustomerActivities: 'customers/singleCustomerActivities',
    }),
    async getSingleUserActivities(email) {
      try {
        const response = await this.singleCustomerActivities(email);
        if (!response.error) {
          this.pagination.page = response.currentPage;
          this.pagination.totalItems = response.total;
          this.pagination.totalPages = response.totalPages;
          this.customerData = response.customer;
        }
      } catch (error) {
        this.$toast.show({ message: error });
      }
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
