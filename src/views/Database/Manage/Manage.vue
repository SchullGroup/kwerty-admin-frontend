<template>
  <k-dashboard-layout>
    <header :class="['header', { selected: selected}]">
      <h1>Database</h1>
      <transition name="header-fade" mode="out-in">
          <div class="header__controls" v-if='!selected'>
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
              <k-input
                type="select"
                label="Filter by Country"
                variant="dropdown"
                v-model="country"
                :optionsDisplay="countries"
              ></k-input>
            </div>
            <div class="button">
              <k-button variant="primary">Upload New Data</k-button>
            </div>
          </div>
        <div class="header__controls__selected" v-if="selected">
          <div class="selected-count">{{ selected }} selected</div>
          <div class="header__controls">
            <k-button variant="secondary" disabled>Publish All</k-button>
            <k-button variant="secondary">Unpublish All</k-button>
            <k-button variant="secondary" negative="negative">Delete</k-button>
          </div>
        </div>
      </transition>
    </header>
    <section class="content">
      <aside class="content__sidebar">
        <ul class="database__menu">
          <li :class="['database__menu__item', { active: activeTab === 'all' }]">All Data</li>
          <li class="database__menu__item">Published</li>
          <li class="database__menu__item">Drafts</li>
          <li class="database__menu__item">Deleted</li>
        </ul>
      </aside>
      <section class="database__data">
        <k-table
          :fields="tableFields"
          :fields-display="tableFieldsDisplay"
          :datalist="allTableData"
          v-model="selectedRows"
        ></k-table>
      </section>
    </section>
  </k-dashboard-layout>
</template>

<script>
import ManageData from './Manage';

export default ManageData;
</script>

<style lang="scss" src="./Manage.scss" scoped></style>
