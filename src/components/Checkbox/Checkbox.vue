<template>
  <div class="wrapper">
    <input type="checkbox" :name="name" id="checkbox" class="checkbox__input" />
    <label :for="name" class="checkbox__label">{{ label }}</label>
  </div>
</template>

<script>
import KCheckbox from './Checkbox';

export default KCheckbox;
</script>

<style lang="scss" src="./Checkbox.scss" scoped></style>
