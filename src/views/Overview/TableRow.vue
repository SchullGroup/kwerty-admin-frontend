<template>
  <tr>
    <td
      v-for="field in fields"
      :key="activity[field]"
      :class="{
        [field]: true,
        [activity[field]]: field === 'activity',
        [activity[field].toLowerCase()]: field === 'status',
        untitled: field === 'name' && activity[field] === 'Untitled User',
      }"
    >
      {{ activity[field] | formatDate(field) }}
    </td>
  </tr>
</template>

<script>
import formatters from '@/utils/formatters';

export default {
  name: 'OverviewTableRow',
  props: {
    activity: {
      type: Object,
    },
    fields: {
      type: Array,
    },
  },
  filters: {
    formatDate(value, field) {
      if (value) {
        switch (field) {
          case 'createdAt':
            return formatters.formatDate(value);
          default:
            return value;
        }
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
// BASE
tr,
thead,
td,
th {
  box-sizing: border-box;
}

tr,
thead {
  display: grid;
  grid: 4.8rem / 0rem minmax(40rem, auto) 6.6rem 30rem;
  align-items: center;
}

tr {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    width: calc(100% - 4.8rem);
    left: 50%;
    transform: translateX(-50%);
    background: $grey-light;
  }
}

td {
  color: $grey-darker;
  font-weight: 400;
  // width: calc(100% - 2.4rem);
  word-break: break-all;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  &.status {
    text-align: center;
  }
  &:first-child {
    margin-left: 2.4rem;
  }
  &:last-child {
    margin-right: 2.4rem;
  }
}

.timestamp {
  width: 100%;
  justify-content: end;
  padding: 0;
}

.activity{
  text-overflow: ellipsis;
  max-width: 18rem;
}

.name {
  &.untitled {
    font-style: italic;
  }
}

.status {
  &.success {
    color: $primary-purple;
  }

  &.failed {
    color: $error;
  }
}
</style>
