<template>
  <div class='input__wrapper' tabindex='1'>
    <div
      :class="[
        'input',
        {
          'input--with-label': label,
          'input--error': error,
          'input--disabled': disabled,
          'input--select': type === 'select' || type === 'date',
          'input--with-icon': variant === 'password' || isSelect || isDate,
          'input--is-open': isSelect && isSelectOpen,
          'input--has-value': type === 'select' && innerValue,
          'as-dropdown': isSelect && variant === 'dropdown',
          'with-display': !!this.optionsDisplay,
          'input--textarea': variant === 'textarea',
        },
      ]"
      :tabindex='isSelect ? 0 : -1'
      @click='isSelect || isDate ? toggleSelectOpen() : null'
      @keyup='(e) => {filterInside ? record(e) : null}'
    >
      <textarea
        v-if="variant === 'textarea'"
        :id='name'
        :disabled='disabled'
        :name='name'
        :placeholder='label'
        :value='isSelect && selectedOption ? selectedOption : innerValue'
        rows='5'
        @change='updateInput'
        @keyup='reactive ? updateInput($event) : null'
      >

      </textarea>
      <input
        v-else
        :id='name'
        :disabled='disabled || isSelect || isDate'
        :name='name'
        :placeholder='label'
        :type='overrideType || type'
        :value='isSelect && selectedOption ? selectedOption : isDate ? formattedDate : innerValue'
        @change='updateInput'
        @keyup='reactive ? updateInput($event) : null'
      />
      <label :for='name'>{{ label }}</label>

      <!-- Input Icon   -->
      <span
        :class="{
          input__icon: true,
          'input__icon--is-open': isSelectOpen,
          'input__icon--click-through': isSelect || isDate,
        }"
        @click.stop='iconClicked'
      >
        <template v-if="variant === 'password'">
          <show-icon v-show='!passwordVisible'></show-icon>
          <hide-icon v-show='passwordVisible'></hide-icon>
        </template>
        <dropdown-icon v-if='isSelect || isDate'></dropdown-icon>
      </span>

      <!-- Select -->
      <template v-if='isSelect'>
        <div
          :class="['overlay', { 'is-hidden': !isSelectOpen }]"
          @click.stop='closeOptionsHandler'
        ></div>
        <div ref='list' :class="['options-list', { 'is-hidden': !isSelectOpen }]" tabindex='-1'>
          <template v-if='optionsDisplay'>
            <option
              v-for='[value, display] in Object.entries(filteredOptions)'
              :key='value'
              :value='value'
              class='option'
              tabindex='0'
              @keyup='enterOption'
            >
              {{ display }}
            </option>
          </template>
          <slot v-else></slot>
        </div>
      </template>

      <!-- Date -->
      <template v-if='isDate'>
        <div
          :class="['overlay', { 'is-hidden': !isSelectOpen }]"
          @click.stop='closeOptionsHandler'
        ></div>
        <div ref='date' :class="['date-container', { 'is-hidden': !isSelectOpen }]"
             @click.stop='() => {}'>
          <date-picker v-if='isSelectOpen' v-model='date' color='purple' />
        </div>
      </template>
    </div>
    <div v-if='error' class='error-message'>
      {{ this.error }}
    </div>
  </div>
</template>

<script>
import KInput from './Input';

export default KInput;
</script>

<style lang='scss' scoped src='./Input.scss'></style>
