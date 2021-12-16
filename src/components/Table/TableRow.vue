<template>
  <tr>
    <td
      v-for="(field, i) in fields"
      :key="data[field]"
      :class="{
        [field]: true,
        [data[field] && data[field].toString().toLowerCase()]: field === 'status',
        untitled: field === 'name' && data[field] === 'Untitled User',
        'text-capitalize': field === 'country'
      }"
    >
      <span class="checkbox" v-if="i === 0">
        <k-checkbox :name="data[field]" :value="data['id']" v-model="innerValue" />
      </span>
      <span class="flag" v-if="field === 'country'">
        <img :src="`/countries/${data[field].toLowerCase()}.svg`" alt="" />
      </span>
      <span @click="$emit('clickAction')">
        {{ data[field] | formatField(field) }}
      </span>
    </td>
  </tr>
</template>

<script>
import KCheckbox from '../Checkbox/Checkbox';
import { formatDate } from '@/utils/formatters';

export default {
  name: 'TableRow',
  components: { KCheckbox },
  data: () => ({
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
      this.checkAndAdd(this.value);
    },
    value(val) {
      if (!val.length) {
        this.innerValue = [];
      }
      this.checkAndAdd(val);
    },
  },
  methods: {
    checkAndAdd(value) {
      const { innerValue: iValue } = this;
      const index = value.indexOf(this.data.id);
      const found = index !== -1;
      const notFound = index === -1;
      // if inner value is not set
      // but it appears inside v-model value
      // remove it and update v-model value
      if (!iValue.length && found) {
        const newValue = [...this.value];
        newValue.splice(index, 1);
        this.$emit('input', newValue);
      }
      // if inner value is set
      // and not inside v-model value
      // append innerValue and update v-model
      if (iValue.length && notFound) {
        this.$emit('input', [...this.value, ...iValue]);
      }
    },
  },
  filters: {
    formatDate(value, field) {
      if (value) {
        switch (field) {
          case 'createdAt':
          case 'updatedAt':
            return formatDate(value);
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
    cursor: pointer;
  }

  .timestamp,
  .lastModified {
    width: 100%;
    text-align: right;
    justify-content: end;
  }

  .startYear,
  .endYear,
  .available {
    text-align: center;
    justify-content: center;
  }

  &__body {
    .value {
      display: inline;
      color: $primary-purple;
    }
    .country,
    td:first-child {
      display: grid;
      grid: 1fr / repeat(2, max-content);
      column-gap: 0.8rem;
      align-items: center;
      .flag {
        width: 3.2rem;
        height: 1.8rem;
        display: flex;
        align-items: center;
        img {
          width: 100%;
          height: auto;
        }
      }
      .checkbox {
        margin-right: -0.8rem;
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
