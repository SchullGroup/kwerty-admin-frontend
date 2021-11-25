<template>
  <div id="toast-group">
    <transition-group
      name="list"
      tag="div"
      class="toast"
      v-if="notifications.length">
      <template v-for="{ message, id } in notifications">
        <div
          :class="[
            'toast__item',
            { 'toast__item--end': endList }
          ]"
          :key="id">
          <span class="toast__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_190_628)">
                <path :d="svgPath" fill="#900F7B"/>
              </g>
              <defs>
                <clipPath id="clip0_190_628">
                  <rect
                    width="15.5152"
                    height="15.5152"
                    fill="white"
                    transform="translate(0.339355 0.339355)"/>
                </clipPath>
              </defs>
            </svg>
          </span>
          <p class="toast__message">{{ message }}</p>
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script>
import KToast from './Toast';

export default KToast;
</script>
<style lang="scss" src="./Toast.scss" scoped></style>
