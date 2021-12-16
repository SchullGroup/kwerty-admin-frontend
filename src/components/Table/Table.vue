<template>
  <table class="table table__data">
    <caption class="hide-text">
      Activities Table
    </caption>
    <thead class="table__data__header">
      <tr>
        <th v-for="field in fields" :key="field" :class="field" :id="field">
          <span class="value">{{ fieldsDisplay ? fieldsDisplay[field] : field }}</span>
          <span class="caret"></span>
        </th>
      </tr>
    </thead>
    <tbody class="table__data__body">
      <table-row
        v-for="data in datalist"
        :key="Object.values(data).join('-')"
        :data="data"
        :fields="fields"
        @clickAction="$emit('clickAction', data.id)"
        v-model="selected"
      >
      </table-row>
    </tbody>
  </table>
</template>

<script>
import KTable from './Table';

export default KTable;
</script>

<style lang="scss" src="./Table.scss" scoped></style>
