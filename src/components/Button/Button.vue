<template>
  <button
    :class="[
      'btn',
      {
       [`btn--${type}`]: type,
       [`btn--${size}`]: size,
       ['btn--negative']: negative,
       'btn--sec--negative': negative && (type === 'secondary' || type === 'tertiary'),
     }
    ]"
    @click="handleClick"
    :type="submit ? 'submit' : 'button'"
    :disabled="disabled || loading"
  >
    <slot />
    <span class="btn__loader" v-if="loading" />
  </button>
</template>

<script>
import KButton from './Button';

export default KButton;
</script>

<style lang="scss" src="./Button.scss" scoped></style>
