<template>
  <k-dashboard-layout>
    <header class="header">
      <h1>Database</h1>
      <div class="header__controls">
        <div class="search">
          <k-input label="Search by country, indicators or categories"></k-input>
        </div>
        <div class="filter">
          <k-input
            type="select"
            label="Filter by Category"
            variant="dropdown"
            v-model="category"
            :optionsDisplay="categories"
          ></k-input>
        </div>
        <div class="filter">
          <k-input
            type="select"
            label="Filter by Indicator"
            variant="dropdown"
            v-model="indicator"
            :optionsDisplay="indicators"
          ></k-input>
        </div>
        <div class="filter">
          <k-input type="select" label="Filter by Country" variant="dropdown"></k-input>
        </div>
      </div>
    </header>
  </k-dashboard-layout>
</template>

<script>
import ManageData from './Manage';

export default ManageData;
</script>

<style lang="scss" src="./Manage.scss" scoped></style>
