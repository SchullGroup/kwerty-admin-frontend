<template>
  <k-dashboard-layout>
    <div class="container">
      <h2>Components</h2>
      <h2>primary button</h2>
      <div class="content">
        <k-button>Primary Button</k-button>
        <k-button>Primary button hover</k-button>
        <k-button :disabled="true">Primary button disabled</k-button>
        <k-button :negative="true">Primary button negative</k-button>
      </div>
      <h2>secondary button</h2>
      <div class="content">
        <k-button variant="secondary">Secondary button</k-button>
        <k-button variant="secondary">Secondary button hover</k-button>
        <k-button :disabled="true" variant="secondary">Secondary button disabled</k-button>
        <k-button :negative="true" variant="secondary">Secondary button negative</k-button>
      </div>
      <h2>Tertiary button</h2>
      <div class="content">
        <k-button variant="tertiary">Tertiary button</k-button>
        <k-button variant="tertiary">Tertiary button hover</k-button>
        <k-button :disabled="true" variant="tertiary">Tertiary button disabled</k-button>
        <k-button :negative="true" variant="tertiary">Tertiary button negative</k-button>
      </div>
      <h2>Link button</h2>
      <div class="content">
        <k-button variant="link">Link button</k-button>
        <k-button variant="link">Link button hover</k-button>
        <k-button :disabled="true" variant="link">Link button disabled</k-button>
      </div>
        <k-button size="full" variant="tertiary">Tertiary button</k-button>
      <section class="cards">
        <section>
          <h2>Card <span class="small">Default</span></h2>
          <k-card heading="Role">
            <h3>Super Admin</h3>
            <p>
              This is just a test description to understand how this
               design would really look like in
              real life. I’m hoping it gets to three lines or else I’m going to keep typing until it
              is done.
            </p>
          </k-card>
        </section>
        <section>
          <h2>Card <span class="small">Variant: 'rounded'</span></h2>
          <k-card :variants="['rounded']" heading="Role">
            <h3>Super Admin</h3>
            <p>
              This is just a test description to understand how this desi
              gn would really look like in
              real life. I’m hoping it gets to three lines or else I’m going to keep typing until it
              is done.
            </p>
          </k-card>
        </section>
        <section>
          <h2>Card <span class="small">Variant: 'mb-shorter'</span></h2>
          <k-card :variants="['mb-shorter']" heading="Role">
            <h3>Super Admin</h3>
            <p>
              This is just a test description to understand how this d
              esign would really look like in
              real life. I’m hoping it gets to three lines or else I’m going to keep typing until it
              is done.
            </p>
          </k-card>
        </section>
      </section>

      <div class="pagination">
        <h2>Pagination</h2>
        <k-pagination
          :currentPageStart="currentPageStart"
          :currentPageEnd="currentPageEnd"
          :totalItems="totalItems"
          @goToNext="nextPage"
          @goToPrev="prevPage"
        ></k-pagination>
      </div>
    </div>
  </k-dashboard-layout>
</template>

<script>
import KCard from '@/components/Card/Card.vue';
import KPagination from '@/components/Pagination/Pagination.vue';
import KButton from '@/components/Button/Button.vue';
import KDashboardLayout from '@/components/DashboardLayout/DashboardLayout.vue';

export default {
  name: 'Components',
  components: {
    KCard, KPagination, KButton, KDashboardLayout,
  },
  data: () => ({
    page: 1,
    totalItems: 243,
    itemsOnPage: 20,
  }),
  computed: {
    currentPageEnd() {
      const { totalItems, itemsOnPage } = this;
      const nextEnd = (this.page - 1) * itemsOnPage + itemsOnPage;
      return totalItems < nextEnd ? totalItems : nextEnd;
    },
    currentPageStart() {
      const { itemsOnPage } = this;
      return (this.page - 1) * itemsOnPage + 1;
    },
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

<style lang="scss" scoped>
.container {
  padding: 3.6rem;
  .content{
   display: grid;
   grid-template-columns:1fr 1fr 1fr 1fr ;
   grid-gap: 1rem;
   margin: 2rem 0;
  }
  width: 90%;
  max-width: 1200px;
  margin: auto;
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
