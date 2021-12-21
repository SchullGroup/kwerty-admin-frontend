<template>
  <k-dashboard-layout>
    <header class="activity__header">
      <h1>{{ title }}</h1>
      <div class="activity__controls">
        <k-pagination
          :page="paginationData.page"
          :maxItemsOnPage="20"
          :totalItems="paginationData.totalItems"
          :totalPages="paginationData.totalPages"
          variant="many"
          @goToNext="nextPage"
          @goToPrev="prevPage"
          @goToFirst="firstPage"
          @goToLast="lastPage"
        ></k-pagination>
        <k-input label="Search name or action" v-model="search" reactive></k-input>
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
        <template v-if="isLoading">
          <tr v-for="i in Array(20).keys()" :key="i">
            <td
              v-for="field in displayFields"
              :key="i + field"
              :class="field"
              :id="field"
              style="height: 20px"
            >
              <div class="suspense w-70"></div>
            </td>
          </tr>
        </template>
        <template v-else>
          <activity-table-row
            v-for="activity in activities"
            :key="activity.createdAt"
            :activity="activity"
            :fields="displayFields"
          >
          </activity-table-row>
          <!-- EMPTY STATE  -->
          <div v-if="activities.length === 0" class="no-activity text-center">
            <div class="icon">
              <svg width="22" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path :d="svgPath" fill="#666" />
              </svg>
            </div>
            <p>There are currently no {{ type }} activities</p>
          </div>
        </template>
      </tbody>
    </table>
    <!-- EXPORT MODAL -->
    <k-modal @close="modalOpen = false" :open="modalOpen">
      <k-card variant="in-modal" heading="Export Activity">
        <form class="form__items" @submit="downloadActivities">
          <k-input label="Title" name="title"></k-input>
          <k-input
            label="File Type"
            name="file-type"
            type="select"
            v-model="fileType"
            :optionsDisplay="fileTypes"
          ></k-input>
          <div class="input-row">
            <k-input
              label="Start Date"
              name="start-date"
              type="select"
              v-model="startDate"
            ></k-input>
            <k-input
              label="End Date"
              name="end-date"
              type="select"
              v-model="endDate"
            ></k-input>
          </div>
          <div class="modal-controls">
            <k-button variant="link" @click="modalOpen = false">Cancel</k-button>
            <k-button variant="secondary" @click="modalOpen = false">Download File</k-button>
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
