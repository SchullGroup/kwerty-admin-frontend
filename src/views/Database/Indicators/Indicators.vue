<template>
  <k-dashboard-layout>
    <div class="indicators">
      <header class="indicators__header">
        <h1>Indicators</h1>
        <div class="indicators__header--content">
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
          <k-button>Add new Indicator</k-button>
        </div>
      </header>
      <div class="table__container">
        <k-pagination
          :forTable="true"
          :page="page"
          :maxItemsOnPage="20"
          :totalItems="totalItems"
          variant="many"
          @goToNext="nextPage"
          @goToPrev="prevPage"
        ></k-pagination>
      </div>
    </div>
  </k-dashboard-layout>
</template>

<script>
import KIndicators from './Indicators';

export default KIndicators;
</script>

<style lang="scss" src="./Indicators.scss" scoped></style>
