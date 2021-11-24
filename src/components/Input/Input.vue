<template>
  <div
    :class="[
      'input',
      'input--with-label',
      {
        'input--error': error,
        'input--with-icon': variant === 'password' || isCustomSelect,
        'input--disabled': disabled,
        'input--select': type === 'select',
        'input--select--native': isNativeSelect,
        'input--has-value': type === 'select' && this.innerValue,
      },
    ]"
    @click="isCustomSelect ? toggleSelectOpen() : null"
  >
    <input
      v-if="!isNativeSelect"
      :name="name"
      :id="name"
      :type="overrideType || type"
      :value="innerValue"
      :placeholder="label"
      :disabled="disabled || type === 'select'"
      @change="updateInput"
    />
    <label :for="name">{{ label }}</label>

    <!-- Native Select   -->
    <select id="name" v-if="isNativeSelect" :value="innerValue" @change="updateInput">
      <option value="" selected hidden></option>
      <slot></slot>
    </select>

    <!-- Input Icon   -->
    <span
      :class="[
        'input__icon',
        { 'input__icon--is-open': isSelectOpen, 'input__icon--click-through': isCustomSelect },
      ]"
      @click="iconClicked"
    >
      <template v-if="variant === 'password'">
        <show-icon v-show="!passwordVisible"></show-icon>
        <hide-icon v-show="passwordVisible"></hide-icon>
      </template>
      <dropdown-icon v-if="isCustomSelect"></dropdown-icon>
    </span>

    <!-- Custom Select -->
    <template v-if="isCustomSelect">
      <div :class="['overlay', { 'is-hidden': !isSelectOpen }]" @click="closeOptionsHandler"></div>
      <div :class="['options-list', { 'is-hidden': !isSelectOpen }]" ref="list">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
import KInput from './Input';

export default KInput;
</script>

<style lang="scss" src="./Input.scss" scoped></style>
