<template>
  <k-dashboard-layout>
    <header :class="['indicators__header', [selected !== 0 ? 'selected__mode' : '']]">
      <h1>
        Indicators <span v-if="selected !== 0">{{ selected }}</span>
      </h1>
      <div v-if="selected === 0" :class="['indicators__header--content']">
        <k-input label="Search by name or category" v-model="search" reactive></k-input>
        <k-input
          type="select"
          variant="dropdown"
          label="Filter by Category"
          v-model="category"
          :optionsDisplay="categories"
          searchInside="categories"
          @search="(val) => debounce(fetchIndicatorsWith, 500)({ name: val })"
        ></k-input>
        <k-input
          type="select"
          variant="dropdown"
          label="Filter by Frequency"
          v-model="frequency"
          :optionsDisplay="optionsFrequency"
          :disabled="search || category !== '' ? true : false"
        ></k-input>
        <k-button @click="showModal = true;getYears()">Add new Indicator</k-button>
      </div>
      <k-button
        class="delete-btn"
        v-show="selected !== 0"
        variant="secondary"
        negative="negative"
        @click="showDeleteModal = true"
        >Delete
      </k-button>
    </header>
    <!-- DELETE MODAL -->
    <k-modal v-if="showDeleteModal" :open="showDeleteModal">
      <k-card
        heading="Are you sure you want to delete this indicator?"
        variant="in-modal"
        longer
        wrap-heading
      >
        <p>
          If you delete this indicator, all data stored underneath this indicator will be <br />
          permanently deleted.
        </p>
        <p class="delete-text">
          Type <span> {{ requiredMessage }}</span> to confirm this action.
        </p>
        <k-input label="Your Input" v-model="modelDeleteText" :reactive="true"></k-input>
        <div class="btn-wrapper">
          <k-button variant="link" @click="showDeleteModal = false">Cancel</k-button>
          <k-button
            :disabled="!isSame"
            @click="removeIndicator"
            negative="negative"
            :loading="isLoading"
            >Delete</k-button
          >
        </div>
      </k-card>
    </k-modal>
    <div class="table__container">
      <k-table
        v-model="selectedRows"
        :fields="tableFields"
        :fields-display="tableFieldsDisplay"
        :datalist="indicators"
        :loading="isLoading"
        @clickAction="action"
        @selectAll="(set) => set ? selectedRows = indicators.map((d) => d.id) : selectedRows = []"
        selectAll
        indicatorsTable
      >
      </k-table>
      <!-- EDIT INDICATOR MODAL -->
      <k-modal v-if="editIndicatorModal" :open="editIndicatorModal" @close='resetForm'>
        <k-card heading="Edit Indicator" variant="in-modal">
          <div class="form__items">
            <k-input label="Name of Indicator" v-model="indicator.name"></k-input>
            <k-input
              label="Category"
              type="select"
              variant="dropdown"
              v-model="indicator.category"
              :optionsDisplay="optionsCategories"
            ></k-input>
            <k-input
              label="Frequency"
              type="select"
              variant="dropdown"
              v-model="indicator.frequency"
              :optionsDisplay="optionsFrequency"
            ></k-input>
            <k-input-tag v-model="tags">
              <p>Tags</p>
            </k-input-tag>
            <div class="btn-wrapper">
              <k-button variant="link" @click="resetForm">Cancel</k-button>
              <k-button @click="editIndicator" :loading="isEditing" submit
                >Save & Continue
              </k-button>
            </div>
          </div>
        </k-card>
      </k-modal>
      <!-- EMPTY STATE  -->
      <div v-if="emptyState" class="no-activity text-center">
        <div class="icon">
          <svg width="22" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path :d="svgPath" fill="#666" />
          </svg>
        </div>
        <p>There are currently no indicators</p>
      </div>
      <!-- ADD INDICATOR MODAL -->
      <k-modal v-if="showModal" :open="showModal" @close='resetNewIndicatorForm'>
        <k-card heading="Add New Indicator" variant="in-modal">
          <div class="form__items">
            <k-input label="Name of Indicator" v-model="newIndicator.name"></k-input>
            <k-input
              label="Category"
              type="select"
              variant="dropdown"
              v-model="newIndicator.category"
              :optionsDisplay="optionsCategories"
            ></k-input>
            <k-input
              label="Frequency"
              type="select"
              variant="dropdown"
              v-model="newIndicator.frequency"
              :optionsDisplay="optionsFrequency"
            ></k-input>
            <k-input
              label="Country"
              type="select"
              v-model="newIndicator.country"
              :optionsDisplay="countries"
              searchInside="Countries"
            ></k-input>
            <k-input
              label="Start Date"
              name="start-date"
              type="select"
              v-model="newIndicator.startYear"
              :optionsDisplay="dateRange"
              searchInside="StartDate"
            ></k-input>
            <k-input
              label="End Date"
              name="end-date"
              type="select"
              :optionsDisplay="dateRange"
              v-model="newIndicator.endYear"
              searchInside="EndDate"
            ></k-input>
            <k-input-tag v-model="tags"></k-input-tag>
            <div class="btn-wrapper">
              <k-button variant="link" @click="resetNewIndicatorForm">Cancel</k-button>
              <k-button @click="createIndicator" :loading="isCreating" submit
                >Save & Continue
              </k-button>
            </div>
          </div>
        </k-card>
      </k-modal>
      <k-pagination
        :forTable="true"
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
    </div>
  </k-dashboard-layout>
</template>

<script>
import KIndicators from './Indicators';

export default KIndicators;
</script>

<style lang='scss' src='./Indicators.scss' scoped></style>
