<template>
  <div class="icons">
    <div class="svg">
      <svg
        @click="$emit('delete')"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4.66675 7.33325H11.3334V8.66659H4.66675V7.33325Z" fill="#E1331B" />
        <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#E1331B" />
      </svg>
    </div>
    <div>
      <svg
        @click="$emit('edit')"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.276 10.6666L11.0373 3.90531L10.0947
        2.96264L3.33333 9.72398V10.6666H4.276ZM4.82867
        12H2V9.17131L9.62333 1.54797C9.74835 1.42299 9.91789
        1.35278 10.0947 1.35278C10.2714 1.35278 10.441 1.42299
        10.566 1.54797L12.452 3.43397C12.577 3.55899 12.6472 3.72853
        12.6472 3.90531C12.6472 4.08208 12.577 4.25162 12.452 4.37664L4.82867
        12ZM2 13.3333H14V14.6666H2V13.3333Z"
          fill="#666666"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'icons',
};
</script>

<style lang="scss" src="./Icons.scss" scoped></style>
