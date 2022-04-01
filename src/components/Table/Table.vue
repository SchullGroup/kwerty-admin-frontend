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
          v-for="(field, i) in fields"
          :key="field"
          :class="field"
          :id="field"
        >
          <span class="value" style='display: flex; align-items: center; cursor: pointer;'>
            <span v-if='selectAll && i === 0 && sorted.length && !loading'>
              <k-checkbox
                v-model='all'
                name='yes'
                value='yes'
                :fill='value.length && value.length !== sorted.length ? "fill" : ""'
              ></k-checkbox>
            </span>
            <span
              @click="setSortField(field)" style='display:flex; align-items:center;cursor:pointer;'>
              {{ fieldsDisplay ? fieldsDisplay[field] : field }}
            </span>
          </span>
          <span class="caret" @click="setSortField(field)"
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
        <tr v-for="i in 20" :key="i" :class="{'table__row-manage-data': manageData}">
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
          :key="data.id || data.createdAt || data.userLastSeen"
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
          :showStatus='showStatus'
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
