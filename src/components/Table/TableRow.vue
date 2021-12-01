<template>
  <tr>
    <td
      v-for="(field, i) in fields"
      :key="data[field]"
      :class="{
        [field]: true,
        [data[field].toLowerCase()]: field === 'status',
        untitled: field === 'name' && data[field] === 'Untitled User',
      }"
    >
      <span class="checkbox" v-if="i === 0">
        <k-checkbox :name="data[field]" :value="data[field]" v-model="innerValue" />
      </span>
      <span class="flag" v-if="field === 'country'">
        <img :src="flags[data[field].toLowerCase()]" alt="" />
      </span>
      {{ data[field] }}
    </td>
  </tr>
</template>

<script>
import KCheckbox from '../Checkbox/Checkbox';
// remove later
import polandFlag from '@/assets/poland.svg';
import norwayFlag from '@/assets/norway.svg';
import italyFlag from '@/assets/italy.svg';

export default {
  name: 'TableRow',
  components: { KCheckbox },
  data: () => ({
    flags: {
      poland: polandFlag,
      norway: norwayFlag,
      italy: italyFlag,
    },
    innerValue: [],
    rowId: null,
  }),
  props: {
    data: {
      type: Object,
    },
    fields: {
      type: Array,
    },
    value: {
      type: Array,
    },
  },
  watch: {
    innerValue() {
      const { innerValue: iValue, value } = this;
      const index = value.indexOf(this.data.indicator);
      if (index === -1 && iValue.length === 1) {
        this.$emit('input', [...value, ...iValue]);
      } else {
        const newValue = [...value];
        newValue.splice(index, 1);
        this.$emit('input', newValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table__data {
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
    grid: 4.8rem / minmax(auto, 50rem) repeat(4, 1fr);
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

  .timestamp,
  .lastModified {
    width: 100%;
    text-align: right;
    justify-content: end;
  }

  .startYear,
  .endYear {
    text-align: center;
    justify-content: center;
  }

  &__body {
    .value {
      display: inline;
      color: $primary-purple;
    }
    .country, td:first-child {
      display: grid;
      grid: 1fr / repeat(2, max-content);
      column-gap: 0.8rem;
      align-items: center;
      .flag {
        display: flex;
        align-items: center;
      }
      .checkbox {
        margin-right: -0.8rem
      }
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
