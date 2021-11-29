<template>
  <k-dashboard-layout>
    <header class="activity__header">
      <h1>{{ title }}</h1>
      <div class="activity__controls">
        <k-pagination
          :page="page"
          :maxItemsOnPage="20"
          :totalItems="totalItems"
          variant="many"
        ></k-pagination>
        <k-input label="Search name or action"></k-input>
        <k-input
          type="select"
          variant="dropdown"
          label="Duration"
          v-model='duration'
          :optionsDisplay="optionsDisplay"
        ></k-input>
        <k-button variant='secondary'>Export</k-button>
      </div>
    </header>
    <table class="activity__data">
      <caption class="hide-text">
        Activities Table
      </caption>
      <thead class="activity__data__header">
        <tr>
          <th v-for="field in displayFields" :key="field" :class="field" :id="field">
            <span class='value'>{{ field }}</span> <span class='caret'></span>
          </th>
        </tr>
      </thead>
      <tbody class="activity__data__body">
        <activity-table-row
          v-for="activity in activities"
          :key="activity.action + activity.value"
          :activity="activity"
          :fields="displayFields"
        >
        </activity-table-row>
      </tbody>
    </table>
  </k-dashboard-layout>
</template>

<script>
import ActivityHome from './Activity';

export default ActivityHome;
</script>

<style lang="scss" src="./Activity.scss" scoped></style>
