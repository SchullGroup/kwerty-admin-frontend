<template>
  <section class="content__body">
    <div class="single-data__form">
      <h3>General</h3>
      <div class="form__grid">
        <k-input
          label="Name of indicator"
          placeholder="Name of Indicator"
          :disabled="!isEditing || isEditable === false"
          v-model="data.indicatorName"
        />
        <k-input
          label="Name of Category"
          placeholder="Name of Category"
          :disabled="!isEditing || isEditable === false"
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
      <div class="form__grid">
        <k-input
          label="Data Frequency"
          placeholder="Data Frequency"
          :disabled="!isEditing || isEditable === false"
          v-model="data.frequency"
        />
      </div>
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
      <k-input-tag v-if="isEditing" :disabled="!isEditing" v-model="dataTags">
        <p>Type in related keywords</p>
      </k-input-tag>
      <div v-else class="tag-wrapper">
        <div class="content">
          <div class="tag-item" v-for="tag in dataTags" :key="tag">
            <span class="tag-input">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="['single-data__table']">
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
          <template v-for="(point, i) in data.data">
            <tr v-if="point && !isEditing" :key="i.period">
              <td>
                {{ point.period }}
              </td>
              <td>{{ point.value || '--' }}</td>
            </tr>
            <!-- table row editing mode -->
            <tr
              v-if="point && isEditing"
              :key="i.period"
              :class="[
                {
                  'table-row': isEditing,
                },
              ]"
            >
              <td class="period-td">
                <span
                  v-if="isEditing"
                  @click="removeItem(i, data.data)"
                  data-hover="Delete"
                  class="span"
                  ><img src="@/assets/deleteIcon.svg" alt="icon"
                /></span>
                <input type="text"
                @change="(e) => editData(i, {...point, period: e.target.value})"
                :value="point.period" />
              </td>
              <td class="value-td">
                <input
                  type="text"
                  @change="(e) => editData(i, {...point, value: e.target.value})"
                  :value="point.value || '--'"
                  style="text-align: right"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="btn-wrapper" v-if="isEditing">
        <button class="link" @click="addNewField">Add New</button>
      </div>
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
    isEditable: {
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
    dataTags: {
      type: Array,
    },
  },
  data: () => ({
    message: 'Type in related keywords',
    singleData: {},
    newData: {
      period: '',
      value: '',
    },
  }),
  mounted() {
    const { data } = this;
    this.singleData = { ...data };
  },
  computed: {},
  watch: {
    singleData: {
      deep: true,
      handler(val) {
        this.$emit('syncSingleData', val);
      },
    },
  },
  methods: {
    addNewField() {
      const { data } = this.data;
      const { newData } = this;
      data.push(newData);
    },
    removeItem(point, data) {
      data.splice(point, 1);
    },
    editData(val, point) {
      const { data } = this.data;
      data.splice(val, 1, point);
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

.link {
  border: none;
  font-size: 1.6rem;
  font-weight: 600;
  text-decoration: underline;
  padding: 1.6rem;
  border-radius: 0.4rem;
  background: transparent;
  margin: 0rem 0 0 4.6rem;
  &:hover {
    transform: scale(1.1);
  }
}

.single-data__table {
  max-height: 75vh;
  overflow: hidden;
  border: 1px solid #f2f2f2;
  margin-top: 4rem;
  &:hover {
    box-shadow: 0px 2px 30px rgba(191, 191, 191, 0.25);
  }
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
  thead {
    position: relative;
    z-index: 10;
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
    td {
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
      .span {
        margin-right: 3rem;
        cursor: pointer;
        position: relative;
        z-index: 0;
        &::before {
          content: attr(data-hover);
          visibility: hidden;
          opacity: 0;
          position: absolute;
          left: 1.5rem;
          top: -1rem;
          font-size: 0.8rem;
          color: $error;
          transition: opacity 1s ease-in-out;
        }
        &:hover::before {
          opacity: 0.5;
          visibility: visible;
        }
      }
    }
    .value-td {
      padding-right: 0;
    }
  }
  .table-row-header {
    display: grid;
    grid: 4.8rem / minmax(35%, 20rem) minmax(65%, 5rem);
    th {
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

.btn-wrapper {
  position: sticky;
  bottom: 0;
  background: $white;
  z-index: 10;
}

.tag-wrapper {
  min-height: 10rem;
  max-width: 56rem;
  background: #ffffff;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 0.8rem;
  // padding: 1rem 3rem;
  font-size: 20px;
  box-sizing: border-box;
  .content {
    display: flex;
    flex-flow: wrap;
    grid-gap: 2rem;
    margin-bottom: 1.6rem;
    .tag-input {
      font-size: 20px;
      white-space: nowrap;
      width: auto;
      height: 3.6rem;
      padding: 1rem;
      background: $grey-light;
      border-radius: 0.8rem;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 1.6rem;
      color: $black;
      border: none;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 1.2rem;
      margin-bottom: 1.6rem;
    }
  }
}
</style>
