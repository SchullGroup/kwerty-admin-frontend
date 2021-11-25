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
      <br />
      <br />
      <h2>Checkbox</h2>
      <div class="content">
        <k-checkbox v-model="label" value="new label" name="label1" label="new label" />
        <k-checkbox
          v-model="label"
          value="another label"
          name="label2"
          label="another label"
          fill="fill"
        />
        <k-checkbox v-model="label" value="selected" name="label3" label="new label" />
        <k-checkbox v-model="label" value="last label" name="label4" label="last label" />
      </div>
      <h2>Toggle button</h2>
      <div class="content">
        <k-toggle />
      </div>
      <h2>Radio</h2>
      <div class="content">
        <k-radio v-model="checked" name="country" label="Nigeria" value="Nigeria" id="nigeria" />
        <k-radio v-model="checked" name="country" label="Ghana" value="Ghana" id="ghana" />
        <span>{{ checked }}</span>
      </div>
      <section class="cards">
        <section>
          <h2>Card <span class="small">Default</span></h2>
          <k-card heading="Role">
            <h3>Super Admin</h3>
            <p>
              This is just a test description to understand how this design would really look like
              in real life. I’m hoping it gets to three lines or else I’m going to keep typing until
              it is done.
            </p>
          </k-card>
        </section>
        <section>
          <h2>Card <span class="small">Variant: 'rounded'</span></h2>
          <k-card :variants="['rounded']" heading="Role">
            <h3>Super Admin</h3>
            <p>
              This is just a test description to understand how this desi gn would really look like
              in real life. I’m hoping it gets to three lines or else I’m going to keep typing until
              it is done.
            </p>
          </k-card>
        </section>
        <section>
          <h2>Card <span class="small">Variant: 'mb-shorter'</span></h2>
          <k-card :variants="['mb-shorter']" heading="Role">
            <h3>Super Admin</h3>
            <p>
              This is just a test description to understand how this d esign would really look like
              in real life. I’m hoping it gets to three lines or else I’m going to keep typing until
              it is done.
            </p>
          </k-card>
        </section>
      </section>
      <div class="pagination">
        <h2>Pagination</h2>
        <k-pagination
          :page="page"
          :maxItemsOnPage="20"
          :totalItems="totalItems"
          @goToNext="nextPage"
          @goToPrev="prevPage"
        ></k-pagination>
      </div>
      <div class="inputs">
        <section>
          <h2>Text Input</h2>
          <k-input label="Name"></k-input>
        </section>
        <section>
          <h2>Text Input <span class="small">Filled</span></h2>
          <k-input label="Title" v-model="title"></k-input>
        </section>
        <section>
          <h2>Text Input <span class="small">Disabled</span></h2>
          <k-input label="Title" v-model="title" :disabled="true"></k-input>
        </section>
        <section>
          <h2>Email Input <span class="small">Error</span></h2>
          <k-input
            label="Title"
            type="email"
            v-model="badEmail"
            error="Your email address is not correct."
          ></k-input>
        </section>
        <section>
          <h2>Password Input </h2>
          <k-input label="Password" type="password" v-model="password" variant="password"></k-input>
        </section>
        <section>
          <h2>Select Input <span class="small">Custom</span></h2>
          <k-input label="Color" type="select" v-model="color2" variant="custom">
            <option value="crimson" class="option">Crimson</option>
            <option value="orange" class="option">Orange</option>
            <option value="indigo" class="option">Indigo</option>
          </k-input>
        </section>
      </div>
    </div>
</k-dashboard-layout>
</template>

<script>
import {
  KButton,
  KCheckbox,
  KCard,
  KPagination,
  KToggle,
  KRadio,
  KDashboardLayout,
  KInput,
} from '@/components';

export default {
  name: 'Components',
  components: {
    KButton,
    KCheckbox,
    KCard,
    KPagination,
    KToggle,
    KRadio,
    KDashboardLayout,
    KInput,
  },
  data: () => ({
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
  }),
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
  mounted() {
    this.$toast.show({
      message: 'Your password has been reset. Please check your email for your new password.',
    });
    this.$toast.show({
      message: 'Your password has been reset. Please check your email for your new password.',
    });
    this.$toast.show({
      message: 'Your password has been reset. Please check your email for your new password.',
    });
    this.$toast.show({
      message: 'Your password has been reset. Please check your email for your new password.',
    });
  },
};
</script>

<style lang="scss" scoped>
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
