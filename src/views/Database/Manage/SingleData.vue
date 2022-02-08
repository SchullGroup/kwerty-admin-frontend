<template>
  <section class="content__body">
    <div class="single-data__form">
      <h3>General</h3>
      <div class="form__grid">
        <k-input
          label="Name of indicator"
          placeholder="Name of Indicator"
          :disabled="!isEditing"
          v-model="data.indicatorName"
        />
        <k-input
          label="Name of Category"
          placeholder="Name of Category"
          :disabled="!isEditing"
          v-model="data.category"
        />
      </div>
      <div class="form__grid">
        <k-input
          label="Country"
          placeholder="Country"
          :disabled="!isEditing"
          v-model="data.country"
        />
        <k-input label="Metric" placeholder="Metric" :disabled="!isEditing" v-model="data.metric" />
      </div>
      <!-- <div class="form__grid">
        <k-input
          label="Data Frequency"
          placeholder="Data Frequency"
          :disabled="!isEditing"
          v-model="data.frequency" />
      </div> -->
      <h3>About The Data</h3>
      <div class="form__grid">
        <k-input label="Source" placeholder="Source" :disabled="!isEditing" v-model="data.source" />
        <k-input
          label="Link to source (optional)"
          placeholder="Link to source"
          type="url"
          :disabled="!isEditing"
          v-model="data.link"
        />
      </div>
      <k-input
        label="Notes (optional)"
        placeholder="Notes"
        variant="textarea"
        :disabled="!isEditing"
        v-model="data.notes"
      />
      <h3>Tags</h3>
      <k-input-tag v-model="tags">
        <p>Type in related keywords</p>
      </k-input-tag>
      <!-- <div class="tags">
        <p class="tag" v-for="tag in data.tags" :key="tag">
          {{ tag }}
        </p>
      </div> -->
    </div>
    <div class="single-data__table">
      <table class="data-table">
        <thead>
          <tr
            :class="[
              {
                'table-row-header': isEditing,
              },
            ]"
          >
            <th id="period">Period</th>
            <th id="value">Value</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="point in data.data">
            <tr v-if="point && !isEditing" :key="point.period">
              <td>
                {{ point.period }}
              </td>
              <td>{{ point.value || '--' }}</td>
            </tr>
            <!-- table row editing mode -->
            <tr
              v-if="point && isEditing"
              :key="point.period"
              :class="[
                {
                  'table-row': isEditing,
                },
              ]"
            >
              <td class="period-td">
                <span v-if="isEditing" @click="removeItem(point, data.data)"
                  ><img src="@/assets/deleteIcon.svg" alt="icon"
                /></span>
                <input type="text" :value="point.period" />
              </td>
              <td class="value-td">
                <input type="text" :value="point.value || '--'" style="text-align: right" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { KInput, KInputTag } from '@/components';

export default {
  name: 'SingleData',
  components: { KInput, KInputTag },
  props: {
    data: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    nameOfIndicator: {
      type: String,
      default: '',
    },
    updateSingleData: {
      type: Function,
    },
  },
  data: () => ({
    message: 'Type in related keywords',
    tags: [],
    singleData: {},
  }),
  mounted() {
    this.singleData = { ...this.data };
  },
  watch: {
    singleData: {
      deep: true,
      handler(val) {
        this.$emit('updateSingleData', val);
      },
    },
  },
  methods: {
    removeItem(point, data) {
      data.splice(point, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.content__body {
  display: grid;
  grid-template: 1fr / auto 36.5rem;
  grid-gap: 3.6rem;
}
.single-data__form {
  h3 {
    margin-top: 4rem;
    font-size: 1.4rem;
    line-height: 1.6rem;
    margin-bottom: 2.4rem;
  }
  .form__grid {
    margin-bottom: 2.4rem;
  }
}
.tags {
  display: flex;
  margin-bottom: 2.4rem;
  flex-wrap: wrap;
  .tag {
    line-height: 1.7rem;
    margin-right: 1.6rem;
    margin-bottom: 1.6rem;
    background: $grey-light;
    border-radius: 0.8rem;
    padding: 0.8rem;
  }
}
%small-text {
  font-size: 1.2rem;
  line-height: 1.4rem;
}
%small-semi-bold-text {
  @extend %small-text;
  font-weight: 600;
}
.single-data__table {
  max-height: 75vh;
  overflow: hidden;
  border: 1px solid #f2f2f2;
  margin-top: 4rem;
  table {
    height: 100%;
    display: grid;
    grid: 4.8rem auto / 1fr;
    overflow: auto;
  }

  tr,
  thead,
  td,
  th {
    box-sizing: border-box;
    width: 100%;
  }

  td,
  th {
    &:first-child {
      padding-left: 2.4rem;
    }

    &:last-child {
      padding-right: 2.4rem;
    }
  }

  tr {
    display: grid;
    grid: 4.8rem / minmax(38%, 20rem) minmax(30%, 16.4rem) minmax(25%, 1fr);
    align-items: center;
  }
  .table-row {
    display: grid;
    grid-template-columns: minmax(auto, 14rem) minmax(auto, 12rem);
    grid-gap: 1rem;
    justify-content: space-between;
    padding: 0 1.7rem;
    max-width: 36.5rem;
    width: 100%;
    // border: 1px solid magenta;
    td {
      // border: 1px solid green;
      width: 100%;
      input {
        border: 1px solid $grey;
        border-radius: 0.8rem;
        padding: 0.6rem 1.2rem;
        width: 100%;
      }
    }
    .period-td {
      display: flex;
      align-items: center;
      padding-left: 0;
      span {
        margin-right: 3rem;
        cursor: pointer;
      }
    }
    .value-td {
      padding-right: 0;
    }
  }
  .table-row-header {
    display: grid;
    grid: 4.8rem / minmax(35%, 20rem) minmax(65%, 5rem);
    // border: 1px solid magenta;
    th {
      // border: 1px solid red;
      display: flex;
      justify-content: flex-end;
    }
  }
  th {
    @extend %small-semi-bold-text;
    text-transform: capitalize;
    text-align: left;
  }

  tbody {
    height: 100%;
    max-width: 36.5rem;
    width: 100%;
  }

  thead {
    background-color: $grey-light;
    position: sticky;
    top: 0;
  }
}
</style>
