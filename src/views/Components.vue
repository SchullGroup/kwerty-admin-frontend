<template>
  <div class='container'>
    <h1>Components</h1>
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
import ICard from '../components/Card/Card.vue';

export default {
  name: 'Components',
  components: { ICard },
};
</script>

<style lang="scss" scoped>
.container {
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
