<template>
  <tr :class="[
  'table__row',
  {
    'table__row-customers': customers && customerOption,
    'table__row-customers-option': customers && !customerOption,
  }
  ]">
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
      <span class="checkbox" v-if="(i === 0) && !customers">
        <k-checkbox :name="data[field]" :value="data['id']" v-model="innerValue" />
      </span>
      <span class="image"
      v-if="(field === 'name' || field === 'fullName') && (customers === true)">
        <img class="image-item" :src="data.imageUrl" alt="pic">
      </span>
      <span class="flag" v-if="field === 'country'">
        <img :src="`/countries/${data[field].toLowerCase()}.svg`" alt="" />
      </span>
      <span @click="$emit('clickAction')">
        {{ data[field] | formatField(field) }}
      </span>
    </td>
    <td class="view-activity" v-if="(customers === true) && (customerOption === true)" >
      <button class="view-activity__btn" @click="$emit('view')">View Activity</button>
    </td>
    <td class="button" v-if="(customers === true) && (customerOption === true)" >
      <button :class="[[data.status === 'active' ? 'disable': 'enable']]">
        {{ data.status === 'active' ? 'Disable' : 'Enable' }}</button>
    </td>
  </tr>
</template>

<script>
import { KCheckbox } from '@/components';
import formatters from '@/utils/formatters';

export default {
  name: 'TableRow',
  components: { KCheckbox },
  data: () => ({
    innerValue: [],
    rowId: null,
    text: 'Disable',
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
    customers: {
      type: Boolean,
      default: false,
    },
    customerOption: {
      type: Boolean,
      default: false,
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
    // image(name) {
    //   if (name === 'Untitled User') return '?';

    //   let value = '';
    //   name.split(' ').forEach((n) => {
    //     value += n[0];
    //   });
    //   return value.toUpperCase();
    // },
  },
  filters: {
    formatField(value, field) {
      if (value) {
        switch (field) {
          case 'createdAt':
          case 'updatedAt':
          case 'lastModified':
          case 'userLastSeen':
            return formatters.formatDate(value);
          case 'joined':
            return formatters.formatDateJoined(value);
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
  .table__row{
    .updatedAt {
      display: flex;
      justify-content: flex-end;
    }
    .countriesAvailable {
      display: flex;
      padding: 0 5rem;
    }
  }
  .table__row,
  tr,
  thead {
    display: grid;
    grid: 4.8rem / minmax(auto, 40rem) repeat(4, 1fr);
    align-items: center;
    &-customers {
      display: grid;
      grid: 4.8rem / minmax(auto, 40rem) repeat(3, 1fr) max-content max-content;;
      align-items: center;
      .button {
        width: 7.8rem;
        justify-content: flex-end;
      }
      .view-activity {
        width: 14rem;
        justify-content: center;
      }
    }
  }
  .view-activity__btn {
    border: none;
    text-decoration: underline;
    background-color: transparent;
  }

  .table__row-customers-option{
    display: grid;
    grid: 4.8rem / minmax(auto, 40rem) repeat(2, 1fr) ;
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
  .link {
    text-decoration: underline;
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
.image {
  width: 3.4rem;
  height: 3.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($primary-purple, 0.1);
  color: $primary-purple;
  border-radius: 50%;
  margin-right: 1rem;
  &-item {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
%btn {
  width: 7.4rem;
  height: 3.2rem;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.disable {
  @extend %btn;
  background-color: $error-light;
  color: $error;
  border: none;
  border-radius: 0.4rem;
}
.enable {
  @extend %btn;
  background-color: white;
  color: $black;
  border: .1rem solid $grey;
  border-radius: 0.4rem;
}
</style>
