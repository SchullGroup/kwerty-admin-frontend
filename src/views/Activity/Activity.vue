<template>
  <k-dashboard-layout>
    <header class="activity__header">
      <h1>{{ title }}</h1>
      <div class="activity__controls">
        <k-pagination
          :page="page"
          :maxItemsOnPage="20"
          :totalItems="totalItems"
          :totalPages="totalPages"
          variant="many"
          @goToNext="nextPage"
          @goToPrev="prevPage"
          @goToFirst="firstPage"
          @goToLast="lastPage"
        ></k-pagination>
        <k-input label="Search name or action"></k-input>
        <k-input
          type="select"
          variant="dropdown"
          label="Duration"
          v-model="duration"
          :optionsDisplay="optionsDisplay"
        ></k-input>
        <k-button variant="secondary" @click="modalOpen = true">Export</k-button>
      </div>
    </header>
    <table class="activity__data">
      <caption class="hide-text">
        Activities Table
      </caption>
      <thead class="activity__data__header">
        <tr>
          <th v-for="field in displayFields" :key="field" :class="field" :id="field">
            <span class="value">{{ field }}</span> <span class="caret"></span>
          </th>
        </tr>
      </thead>
      <tbody class="activity__data__body">
        <activity-table-row
          v-for="activity in allActivities"
          :key="activity.createdAt"
          :activity="activity"
          :fields="displayFields"
        >
        </activity-table-row>
      </tbody>
    </table>
    <k-modal @close="modalOpen = false" :open="modalOpen">
      <k-card variant="in-modal" heading="Export Activity">
        <form class="form__items">
          <k-input label="Title" name='title'></k-input>
          <k-input
            label="File Type"
            name='file-type'
            type="select"
            v-model="defaultFileType"
            :optionsDisplay="fileTypes"
          ></k-input>
          <div class='input-row'>
            <k-input
              label="Start Date"
              name='start-date'
              type="select"
              v-model="defaultStartDate"
            ></k-input>
            <k-input
              label="End Date"
              name='end-date'
              type="select"
              v-model="defaultEndDate"
            ></k-input>
          </div>
      <div class='modal-controls'>
        <k-button variant='link' @click='modalOpen = false'>Cancel</k-button>
        <k-button variant='secondary' @click='modalOpen = false'>Download File</k-button>
      </div>
        </form>
      </k-card>
    </k-modal>
  </k-dashboard-layout>
</template>

<script>
import ActivityHome from './Activity';

export default ActivityHome;
</script>

<style lang="scss" src="./Activity.scss" scoped></style>
