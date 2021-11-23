<template>
  <div :class="['card', ...variants]">
    <h2 class="card__heading">
      {{heading}}
    </h2>
    <section class='card__body'>
      <slot></slot>
    </section>
  </div>
</template>

<script>
import ICard from './Card';

export default ICard;
</script>

<style src="./Card.scss" lang='scss' scoped>
</style>
