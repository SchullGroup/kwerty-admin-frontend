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
      <span class="initials" v-if="field === 'name'">{{ initials(activity[field]) }}</span>
      {{ activity[field] | formatDate(field)}}
      <span class="value" v-if="field === 'action'">&nbsp;{{ '\n' + activity['value'] }}</span>
    </td>
  </tr>
</template>

<script>
import formatters from '@/utils/formatters';

export default {
  name: 'ActivityTableRow',
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
  methods: {
    initials(name) {
      if (name === 'Untitled User') return '?';
      let value = '';
      name.split(' ').forEach((n) => {
        value += n[0];
      });
      return value.toUpperCase();
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
      display: grid;
      grid: 1fr / 3.4rem max-content;
      column-gap: 1.6rem;
      &.untitled {
        font-style: italic;
      }
      .initials {
        width: 3.4rem;
        height: 3.4rem;
        display: grid;
        place-content: center;
        background: rgba($primary-purple, 0.1);
        color: $primary-purple;
        border-radius: 50%;
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
