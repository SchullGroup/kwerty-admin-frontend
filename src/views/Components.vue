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

  </div>
</template>

<script>
import KButton from '@/components/Button/Button.vue';

export default {
  name: 'component',
  components: {
    KButton,
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
}
</style>
