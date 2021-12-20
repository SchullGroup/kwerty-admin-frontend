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
      <template v-if="loading">
          <tr v-for="i in 20" :key="i">
            <td
              v-for="field in fields"
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
          <table-row
            v-for="data in datalist"
            :key="data.id"
            :data="data"
            :fields="fields"
            @clickAction="$emit('clickAction', data.id)"
            v-model='selected'
          >
          </table-row>
        </template>
    </tbody>
  </table>
</template>

<script>
import KTable from './Table';

export default KTable;
</script>

<style lang="scss" src="./Table.scss" scoped></style>
