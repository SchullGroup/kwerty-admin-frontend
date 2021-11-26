<template>
  <div class="auth">
    <div class="auth-logo">
      <img src="@/assets/logo.png" alt="logo" class="logo" />
    </div>
    <div class="auth-content">
      <div class="auth-content-item">
        <div class="icon" v-if="hasIcon === true">
          <svg
            width="47"
            height="47"
            viewBox="0 0 47 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.519 26.7043L25.2574 29.4427L41.6763
              13.0238L44.4186 15.7661L25.2574 34.9273L12.9151
              22.585L15.6574 19.8427L19.7786 23.9639L22.519
              26.7023V26.7043ZM22.5229 21.2197L32.1267 11.6138L34.8613
              14.3484L25.2574 23.9542L22.5229 21.2197ZM17.0402 32.1869L14.2998
              34.9273L1.95752 22.585L4.69982 19.8427L7.44019 22.583L7.43825 22.585L17.0402
              32.1869V32.1869Z"
              fill="#900F7B"
            />
          </svg>
        </div>
        <h1 class="title">{{ title }}</h1>
        <p class="description">
          <slot name="description"></slot>
        </p>
        <div class="auth-content-item-form">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
  },
  // data: () => ({
  //   hasIcon: false,
  // }),
};
</script>

<style lang="scss" src="./Auth.scss" scoped></style>
