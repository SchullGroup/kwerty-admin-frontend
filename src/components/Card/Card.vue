<template>
  <div :class="['card', ...variantClasses]">
    <h2 class="card__heading">
      {{ heading }}
    </h2>
    <section class="card__body">
      <slot></slot>
    </section>
  </div>
</template>

<script>
import KCard from './Card';

export default KCard;
</script>

<style src="./Card.scss" lang="scss" scoped></style>
