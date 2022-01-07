<template>
  <k-dashboard-layout>
   <header class="customer__header">
    <div class="customer__header--text">
     <p @click="$router.go(-1)">
      <img src="@/assets/back.svg" alt="" class="back-arrow">
      Back
     </p>
     <h1>{{customer.fullName}} Activities</h1>
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
       <k-input type="select" variant="dropdown"
       label="Duration" v-model="duration" :optionsDisplay="optionsDurations"></k-input>
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
// eslint-disable-next-line vue/max-len
import {
  KDashboardLayout,
  KInput,
  KButton,
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
    customer: {
      fullName: 'Jason Frieds',
    },
    customerData: [
      {
        id: 'aesdfghj3wef7tfc',
        name: 'Lena Dunham',
        actions: 'Logged in',
        timestamp: '4:32 PM, 22-02-2021',
      },
      {
        name: 'jason Frieds',
        actions: 'Logged in',
        timestamp: '4:32 PM, 22-02-2021',
      },
    ],
    pagination: {
      page: 1,
      totalItems: 9,
      totalPages: 4,
    },
    tableFields: ['name', 'actions', 'timestamp'],
    tableFieldsDisplay: {
      name: 'Name',
      actions: 'Actions',
      timestamp: 'Timestamp',
    },
  }),
  methods: {
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
 &--text{
   display: grid;
   grid-row-gap: .8rem;
   p{
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    cursor: pointer;
   }
   .back-arrow{
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
