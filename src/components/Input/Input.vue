<template>
  <div class="input__wrapper"  tabindex='1'>
    <div
      :class="[
        'input',
        {
          'input--with-label': label,
          'input--error': error,
          'input--disabled': disabled,
          'input--select': type === 'select',
          'input--with-icon': variant === 'password' || isSelect,
          'input--is-open': isSelect && isSelectOpen,
          'input--has-value': type === 'select' && innerValue,
          'as-dropdown': isSelect && variant === 'dropdown',
          'with-display': !!this.optionsDisplay
        },
      ]"
      @click="isSelect ? toggleSelectOpen() : null"
      :tabindex='isSelect ? 0 : -1'
    >
      <input
        :name="name"
        :id="name"
        :type="overrideType || type"
        :value="isSelect && selectedOption ? selectedOption : innerValue"
        :placeholder="label"
        :disabled="disabled || type === 'select'"
        @change="updateInput"
        @keyup="reactive ? updateInput($event) : null"
      />
      <label :for="name">{{ label }}</label>

      <!-- Input Icon   -->
      <span
        :class="{
          input__icon: true,
          'input__icon--is-open': isSelectOpen,
          'input__icon--click-through': isSelect,
        }"
        @click.stop="iconClicked"
      >
        <template v-if="variant === 'password'">
          <show-icon v-show="!passwordVisible"></show-icon>
          <hide-icon v-show="passwordVisible"></hide-icon>
        </template>
        <dropdown-icon v-if="isSelect"></dropdown-icon>
      </span>

      <!-- Select -->
      <template v-if="isSelect">
        <div
          :class="['overlay', { 'is-hidden': !isSelectOpen }]"
          @click.stop="closeOptionsHandler"
        ></div>
        <div :class="['options-list', { 'is-hidden': !isSelectOpen }]" ref="list">
          <template v-if="optionsDisplay">
            <option
              v-for="[value, display] in Object.entries(optionsDisplay)"
              :key="value"
              :value="value"
              class="option"
            >
              {{ display }}
            </option>
          </template>
          <slot v-else></slot>
        </div>
      </template>
    </div>
    <div class="error-message" v-if="error">
      {{ this.error }}
    </div>
  </div>
</template>

<script>
import KInput from './Input';

export default KInput;
</script>

<style lang="scss" src="./Input.scss" scoped></style>
