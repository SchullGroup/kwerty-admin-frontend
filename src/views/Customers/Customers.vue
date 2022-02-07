<template>
  <k-dashboard-layout>
   <header class="customers__header">
    <h1>Customers</h1>
    <div class="customers__header--content">
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
       <k-input label="Search by name or email" v-model="search" reactive></k-input>
       <k-button variant="secondary" @click="modalOpen = true">Export</k-button>
    </div>
   </header>
   <div class="table__container">
    <k-table
        :fields="tableFields"
        :fields-display="tableFieldsDisplay"
        :datalist="customers"
        :loading="isLoading"
        :customers="true"
        :customerOption="true"
        @view="(email, name) => $router.push({ name: 'SingleCustomer', query: { email, name } })"
        @changeStatus="changeUserStatus"
      >
      </k-table>
   </div>
   <!-- EXPORT MODAL -->
    <k-modal @close='modalOpen = false' :open='modalOpen'>
      <k-card variant='in-modal' heading='Export User List'>
        <form class='form__items'>
          <k-input label='Title' name='title' v-model='title'></k-input>
          <k-input
            label='File Type'
            name='file-type'
            type='select'
            v-model='fileType'
            :optionsDisplay='fileTypes'
          ></k-input>
          <div class='input-row'>
            <k-input label='Start Date' name='start-date' type='date' v-model='startDate'></k-input>
            <k-input label='End Date' name='end-date' type='date' v-model='endDate'></k-input>
          </div>
          <div class='modal-controls'>
            <k-button variant='link' @click='modalOpen = false'>Cancel</k-button>
            <k-button variant='secondary' @click='downloadUsers'>Download File</k-button>
          </div>
        </form>
      </k-card>
    </k-modal>
  </k-dashboard-layout>
</template>

<script>
import Customers from './Customers';

export default Customers;
</script>

<style lang="scss" src="./Customers.scss" scoped></style>
