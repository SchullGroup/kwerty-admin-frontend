<template>
  <tr>
    <td
      v-for="field in fields"
      :key="activity[field]"
      :class="{
        [field]: true,
        [activity[field].toLowerCase()]: field === 'status',
        untitled: field === 'name' && activity[field] === 'Untitled User',
      }"
    >
      {{ activity[field] }}
      <span class="value" v-if="field === 'action'">&nbsp;{{ '\n' + activity['value'] }}</span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TableRow',
  props: {
    activity: {
      type: Object,
    },
    fields: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.activity__data {
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
    grid: 4.8rem / 30rem minmax(40rem, auto) 6.6rem 30rem;
    align-items: center;
  }

  td,
  th {
    width: 95%;
    display: -webkit-box;
    align-items: center;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .timestamp {
    width: 100%;
    text-align: right;
    justify-content: end;
  }

  &__body {
    .value {
      display: inline;
      color: $primary-purple;
    }

    .name {
      color: rgba($black, 0.85);

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
  }
}
</style>
