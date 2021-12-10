<template>
  <k-dashboard-layout>
    <header :class="['indicators__header', [selected !== 0 ? 'selected__mode' : '']]">
      <h1>
        Indicators <span v-if="selected !== 0">{{ selected }}</span>
      </h1>
      <div v-if="selected === 0" :class="['indicators__header--content']">
        <k-input label="Search by name or category"></k-input>
        <k-input
          type="select"
          variant="dropdown"
          label="Filter by Category"
          v-model="categories"
          :optionsDisplay="optionsCategories"
        ></k-input>
        <k-input
          type="select"
          variant="dropdown"
          label="Filter by Frequency"
          v-model="frequency"
          :optionsDisplay="optionsFrequency"
        ></k-input>
        <k-button @click="showModal = true">Add new Indicator</k-button>
      </div>
      <k-button
        class="delete-btn"
        v-show="selected !== 0"
        variant="secondary"
        negative="negative"
        @click="showDeleteModal = true"
        >Delete</k-button
      >
    </header>
    <!-- DELETE MODAL -->
    <k-modal v-if="showDeleteModal" :open="showDeleteModal">
      <k-card
        heading="Are you sure you want to delete this indicator?"
        variant="in-modal"
        wrap-heading="true"
      >
        <p>
          If you delete this indicator, all data stored underneath this indicator will be <br />
          permanently deleted.
        </p>
        <p class="delete-text">
          Type <span> Delete {{ selected }} indicator</span> to confirm this action.
        </p>
        <k-input label="Your Input" v-model="deleteIndicator"></k-input>
        <div class="btn-wrapper">
          <k-button variant="link" @click="showDeleteModal = false">Cancel</k-button>
          <k-button @click="showDeleteModal = false" negative="negative">Delete</k-button>
        </div>
      </k-card>
    </k-modal>
    <div class="table__container">
      <k-table
        v-model="selectedRows"
        :fields="tableFields"
        :fields-display="tableFieldsDisplay"
        :datalist="tableData"
      >
      </k-table>
      <!-- ADD INDICATOR MODAL -->
      <k-modal v-if="showModal" :open="showModal">
        <k-card heading="Add New Indicator" variant="in-modal">
          <form class="form__items">
            <k-input label="Name of Indicator" v-model="roleTitle"></k-input>
            <k-input
              label="Category"
              type="select"
              variant="dropdown"
              v-model="modalCategories"
              :optionsDisplay="optionsCategories"
            ></k-input>
            <k-input
              label="Frequency"
              type="select"
              variant="dropdown"
              v-model="modalFrequency"
              :optionsDisplay="optionsFrequency"
            ></k-input>
            <div class="btn-wrapper">
              <k-button variant="link" @click="showModal = false">Cancel</k-button>
              <k-button @click="showModal = false">Save & Continue</k-button>
            </div>
          </form>
        </k-card>
      </k-modal>
      <k-pagination
        :forTable="true"
        :page="page"
        :maxItemsOnPage="20"
        :totalItems="totalItems"
        :totalPages="totalPages"
        variant="many"
        @goToNext="nextPage"
        @goToPrev="prevPage"
      ></k-pagination>
    </div>
  </k-dashboard-layout>
</template>

<script>
import KIndicators from './Indicators';

export default KIndicators;
</script>

<style lang="scss" src="./Indicators.scss" scoped></style>
