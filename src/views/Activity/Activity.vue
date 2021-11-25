<template>
  <k-dashboard-layout>
    <header class="activity__header">
      <h1>{{ title }}</h1>
      <div class="activity__controls">
        <k-pagination :page="page" :maxItemsOnPage="20" :totalItems="totalItems"></k-pagination>
        <k-input label="Search name, actions"></k-input>
      </div>
    </header>
    <table class="activity__data">
      <caption class="hide-text">Activities Table</caption>
      <thead class="activity__data__header">
        <th v-for="field in displayFields" :key="field" :class="field" :id="field">{{ field }}</th>
      </thead>
      <tbody class="activity__data__body">
        <table-row
          v-for="activity in activities"
          :key="activity.action + activity.value"
          :activity="activity"
          :fields="displayFields"
        >
        </table-row>
      </tbody>
    </table>
  </k-dashboard-layout>
</template>

<script>
import ActivityHome from './Activity';

export default ActivityHome;
</script>

<style lang="scss" src="./Activity.scss" scoped></style>
