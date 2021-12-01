<template>
  <div class='all'>
    <k-table
      :fields="tableFields"
      :fields-display="tableFieldsDisplay"
      :datalist="allTableData"
      v-model='selected'
    ></k-table>
  </div>
</template>

<script>
import { KTable } from '@/components';
import database from '@/utils/dummy-database';

export default {
  name: 'AllData',
  components: {
    KTable,
  },
  data: () => ({
    tableFields: ['indicator', 'country', 'startYear', 'endYear', 'lastModified'],
    tableFieldsDisplay: {
      indicator: 'Name of Indicator',
      country: 'Country',
      startYear: 'Start Year',
      endYear: 'End Year',
      lastModified: 'Last Modified',
    },
    allTableData: database.all,
    selected: [],
  }),
};
</script>

<style scoped>

</style>
