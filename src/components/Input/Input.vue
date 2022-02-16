<template>
  <div class='input__wrapper' tabindex='1'>
    <div
      :class="[
        'input',
        {
          'input--with-label': label || isCopy,
          'input--error': error,
          'input--disabled': disabled,
          'input--select': type === 'select' || type === 'date',
          'input--with-icon': variant === 'password' || isSelect || isDate || isCopy,
          'input--is-open': isSelect && isSelectOpen,
          'input--has-value': type === 'select' && innerValue,
          'as-dropdown': isSelect && variant === 'dropdown',
          'with-display': !!this.optionsDisplay,
          'input--textarea': variant === 'textarea',
          'input--search': type === 'search',
          'has--search': searchInside,
          'input--copy': isCopy
        },
      ]"
      :tabindex='isSelect ? 0 : -1'
      @click='(isSelect || isDate) && !disabled ? toggleSelectOpen() : null'
      @focus='isSelectOpen ? focusInsideSearch() : null'
      @keyup='(e) => {filterInside || searchInside ? record(e) : null}'
    >
      <svg v-if="type === 'search' " class='search-icon' fill='none' height='14' viewBox='0 0 14 14'
           width='14' xmlns='http://www.w3.org/2000/svg'>
        <path
          :d='searchInputPath'
          fill='#666666' />
      </svg>

      <textarea
        v-if="variant === 'textarea'"
        :id='name'
        :disabled='disabled'
        :name='name'
        :placeholder='label'
        :value='isSelect && selectedOption ? selectedOption : innerValue'
        rows='5'
        @change='updateInput'
        @keyup='updateInput($event)'
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
        @keyup='updateInput($event)'
        ref='input'
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
        <svg v-if='isCopy' fill='none' height='20' viewBox='0 0 18 20'
             width='18' xmlns='http://www.w3.org/2000/svg'>
        <path :d='copyIconPath' fill='black' />
        </svg>

      </span>

      <!-- Select -->
      <template v-if='isSelect'>
        <div
          :class="['overlay', { 'is-hidden': !isSelectOpen }]"
          @click.stop='closeOptionsHandler'
        ></div>
        <div ref='list' :class="['options-list', { 'is-hidden': !isSelectOpen }]" tabindex='-1'>
          <input v-if='searchInside' v-model='filter' ref='search'
                 :placeholder="'Search ' + this.searchInside" :tabindex='isSelectOpen ? 0 : -1'
                 class='search-options' type='text'
                 @click.stop @keyup.stop
                 />
          <template v-if='optionsDisplay'>
            <div ref='itemList' class='list'>
              <div
                v-for='[value, display] in Object.entries(filteredOptions)'
                :key='value'
                :tabindex='isSelectOpen ? 0 : -1'
                :data-value='value'
                class='option'
                @keyup='enterOption'
              >
                {{ display }}
              </div>
            </div>
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
    <transition name='grow'>
      <div v-if='error' class='error-message'>
        {{ this.error }}
      </div>
    </transition>
  </div>
</template>

<script>
import KInput from './Input';

export default KInput;
</script>

<style lang='scss' scoped src='./Input.scss'></style>
