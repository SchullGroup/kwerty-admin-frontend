<template>
  <k-dashboard-layout>
    <div class='container'>
      <h2>Components</h2>
      <h2>primary button</h2>
      <section class='table'>
        <h2>Table</h2>
        <div class='selected'>selected: {{ selected.length }}</div>
        <div>{{ selected }}</div>
        <k-table
          v-model='selected'
          :datalist='allTableData'
          :fields='tableFields'
          :fields-display='tableFieldsDisplay'
        ></k-table>
      </section>
      <div class="content">
        <k-button>Primary Button</k-button>
        <k-button>Primary button hover</k-button>
        <k-button :disabled='true'>Primary button disabled</k-button>
        <k-button :negative='true'>Primary button negative</k-button>
      </div>
      <h2>secondary button</h2>
      <div class='content'>
        <k-button variant='secondary'>Secondary button</k-button>
        <k-button variant='secondary'>Secondary button hover</k-button>
        <k-button :disabled='true' variant='secondary'>Secondary button disabled</k-button>
        <k-button :negative='true' variant='secondary'>Secondary button negative</k-button>
      </div>
      <h2>Tertiary button</h2>
      <div class='content'>
        <k-button variant='tertiary'>Tertiary button</k-button>
        <k-button variant='tertiary'>Tertiary button hover</k-button>
        <k-button :disabled='true' variant='tertiary'>Tertiary button disabled</k-button>
        <k-button :negative='true' variant='tertiary'>Tertiary button negative</k-button>
      </div>
      <h2>Link button</h2>
      <div class='content'>
        <k-button variant='link'>Link button</k-button>
        <k-button variant='link'>Link button hover</k-button>
        <k-button :disabled='true' variant='link'>Link button disabled</k-button>
      </div>
      <k-button size='full' variant='tertiary'>Tertiary button</k-button>
      <section class='cards'>
        <h2>Card <span class='small'>Default</span></h2>
        <k-card heading='Role'>
          <h3>Super Admin</h3>
          <p>
            This is just a test description to understand how this design would really look like in
            real life. I???m hoping it gets to three lines or else I???m going to keep typing until it
            is done.
          </p>
        </k-card>
      </section>
      <div class='pagination'>
        <section>
          <h2>Pagination</h2>
          <k-pagination
            :maxItemsOnPage='20'
            :page='page'
            :totalItems='totalItems'
            @goToNext='nextPage'
            @goToPrev='prevPage'
          ></k-pagination>
        </section>
        <section>
          <h2>Pagination <span class='small'>variant: many</span></h2>
          <k-pagination
            :maxItemsOnPage='20'
            :page='page'
            :totalItems='totalItems'
            variant='many'
            @goToNext='nextPage'
            @goToPrev='prevPage'
          ></k-pagination>
        </section>
      </div>
      <div class='inputs'>
        <section>
          <h2>Text Input</h2>
          <k-input label='Name'></k-input>
        </section>
        <section>
          <h2>Text Input <span class='small'>Filled</span></h2>
          <k-input v-model='title' label='Title'></k-input>
        </section>
        <section>
          <h2>Text Input <span class='small'>Disabled</span></h2>
          <k-input v-model='title' :disabled='true' label='Title'></k-input>
        </section>
        <section>
          <h2>Email Input <span class='small'>Error</span></h2>
          <k-input
            v-model='badEmail'
            error='Your email address is not correct.'
            label='Title'
            type='email'
          ></k-input>
        </section>
        <section>
          <h2>Password Input</h2>
          <k-input v-model='password' label='Password' type='password' variant='password'></k-input>
        </section>
        <section>
          <h2>Date Input</h2>
          <div class='small'>{{ date }}</div>
          <k-input v-model='date' label='Date' type='date'></k-input>
        </section>
        <section>
          <h2>Select Input <span class='small'>Custom</span></h2>
          <k-input v-model='color2' label='Color' type='select' variant='custom'>
            <option class='option' value='crimson'>Crimson</option>
            <option class='option' value='orange'>Orange</option>
            <option class='option' value='indigo'>Indigo</option>
            <option class='option' value='crimson'>Crimson</option>
            <option class='option' value='orange'>Orange</option>
            <option class='option' value='indigo'>Indigo</option>
            <option class='option' value='crimson'>Crimson</option>
            <option class='option' value='orange'>Orange</option>
            <option class='option' value='indigo'>Indigo</option>
            <option class='option' value='crimson'>Crimson</option>
            <option class='option' value='orange'>Orange</option>
            <option class='option' value='indigo'>Indigo</option>
          </k-input>
        </section>
      </div>
      <section>
        <k-icons></k-icons>
      </section>
      <div class='modal'>
        <h2>Modal</h2>
        <k-button @click='modalOpen = true'>Open Modal</k-button>
        <!-- <k-modal :open='modalOpen'>
          <k-card heading='Add Role' variant='in-modal'>
            <k-input v-model='roleTitle' label='Title'></k-input>
            <br />
            <k-input v-model='roleDescription' label='Description'></k-input>
            <br />
            <div class='buttons' style='display: flex; justify-content: end'>
              <k-button variant='link' @click='modalOpen = false'>Close</k-button>
            </div>
          </k-card>
        </k-modal> -->
      </div>
      <k-pagination
        :forTable='true'
        :maxItemsOnPage='20'
        :page='page'
        :totalItems='totalItems'
        :totalPages='7'
        variant='many'
        @goToNext='nextPage'
        @goToPrev='prevPage'
      ></k-pagination>
      <section>
        <k-input-tag v-model='tags'></k-input-tag>
      </section>
    </div>
  </k-dashboard-layout>
</template>

<script>
import {
  KButton,
  KCard,
  KDashboardLayout,
  KIcons,
  KInput,
  KInputTag,
  // KModal,
  KPagination,
  KTable,
} from '@/components';
import database from '@/utils/dummy-database';

export default {
  name: 'Components',
  components: {
    // KModal,
    KButton,
    // KCheckbox,
    KCard,
    KPagination,
    // KToggle,
    // KRadio,
    KDashboardLayout,
    KInput,
    KIcons,
    KTable,
    KInputTag,
  },
  data: () => ({
    date: null,
    tags: [],
    page: 1,
    totalItems: 243,
    itemsOnPage: 20,
    label: [],
    checked: '',
    title: 'Filler text',
    badEmail: 'thisisnotacorrectemail',
    password: 'some complex password!212@334',
    color: '',
    color2: '',
    modalOpen: true,
    roleTitle: 'Data Consultant',
    roleDescription:
      'This is just a test description to understand how this design would really look',
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
  created() {
    window.vm = this;
  },
  methods: {
    nextPage() {
      const { itemsOnPage } = this;
      if (this.page * itemsOnPage < this.totalItems) {
        this.page += 1;
      }
    },
    prevPage() {
      this.page = this.page !== 1 ? this.page - 1 : this.page;
    },
  },
};
</script>

<style lang='scss' scoped>
.container {
  padding: 3.6rem;

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
    margin: 2rem 0;
  }

  width: 90%;
  max-width: 1200px;
  margin: auto;
}

.inputs {
  max-width: 56.8rem;
}

.cards {
  background: $grey-light;
  padding: 6.4rem;
}

h2 {
  margin-bottom: 1.6rem;
}

.small {
  font-size: 1.6rem;
  font-weight: 400;
  color: #aaaaaa;
}

p {
  font-size: 1.2rem;
}

h3 {
  margin-bottom: 1.6rem;
  font-size: 1.4rem;
  line-height: 2rem;
}

section {
  margin: 5rem auto;
}
</style>
