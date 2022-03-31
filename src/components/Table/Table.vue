<template>
  <table class="table table__data">
    <caption class="hide-text">
      Activities Table
    </caption>
    <thead class="table__data__header">
      <tr
        :class="[
          'table__header-row',
          {
            'table__header-customers': customers && customerOption,
            'table__header-customers-option': customers && !customerOption,
            'table__header-manageData': manageData
          },
        ]"
      >
        <th
          v-for="field in fields"
          :key="field"
          :class="field"
          :id="field"
          @click="setSortField(field)"
        >
          <span class="value">{{ fieldsDisplay ? fieldsDisplay[field] : field }}</span>
          <span class="caret"
          :class="[{asc: field === sortField && direction === 'asc' }]">
          </span>
        </th>
        <template v-if="customers">
          <th class="view-activity"></th>
          <th class="button"></th>
        </template>
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
          v-for="data in sorted"
          :key="data.createdAt || data.userLastSeen"
          :data="data"
          :fields="fields"
          @clickAction="$emit('clickAction', data.id)"
          @view="$emit('view', data.id, data.fullName)"
          @changeStatus="
            $emit('changeStatus', {
              status: data.status === 'enabled' ? 'disabled' : 'enabled',
              id: data.id,
            })
          "
          v-model="selected"
          :customers="customers"
          :customerOption="customerOption"
          :manageData="manageData"
          changeStatus
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
