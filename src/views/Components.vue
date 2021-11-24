<template>
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
      <k-button type="secondary">Secondary button</k-button>
      <k-button type="secondary">Secondary button hover</k-button>
      <k-button :disabled="true" type="secondary">Secondary button disabled</k-button>
      <k-button :negative="true" type="secondary">Secondary button negative</k-button>
    </div>
    <h2>Tertiary button</h2>
    <div class="content">
      <k-button type="tertiary">Tertiary button</k-button>
      <k-button type="tertiary">Tertiary button hover</k-button>
      <k-button :disabled="true" type="tertiary">Tertiary button disabled</k-button>
      <k-button :negative="true" type="tertiary">Tertiary button negative</k-button>
    </div>
    <h2>Link button</h2>
    <div class="content">
      <k-button type="link">Link button</k-button>
      <k-button type="link">Link button hover</k-button>
      <k-button :disabled="true" type="link">Link button disabled</k-button>
    </div>
      <k-button size="full" type="tertiary">Tertiary button</k-button>
    <section class="cards">
      <section>
        <h2>Card <span class='small'>Default</span></h2>
        <i-card heading="Role">
          <h3>Super Admin</h3>
          <p>
            This is just a test description to understand how this design would really look like in
            real life. I’m hoping it gets to three lines or else I’m going to keep typing until it
            is done.
          </p>
        </i-card>
      </section>
      <section>
        <h2>Card <span class='small'>Variant: 'rounded'</span></h2>
        <i-card :variants="['rounded']" heading="Role">
          <h3>Super Admin</h3>
          <p>
            This is just a test description to understand how this design would really look like in
            real life. I’m hoping it gets to three lines or else I’m going to keep typing until it
            is done.
          </p>
        </i-card>
      </section>
      <section>
        <h2>
          Card <span class='small'>Variant: 'mb-shorter'</span>
        </h2>
        <i-card :variants="['mb-shorter']" heading="Role">
          <h3>Super Admin</h3>
          <p>
            This is just a test description to understand how this design would really look like in
            real life. I’m hoping it gets to three lines or else I’m going to keep typing until it
            is done.
          </p>
        </i-card>
      </section>
    </section>
  </div>
</template>

<script>
import KButton from '@/components/Button/Button.vue';
import ICard from '../components/Card/Card.vue';
export default {
  name: 'component',
  components: {
    KButton,
    ICard 
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
