<template>
  <div>
    <div class="wrapper">
      <p class="title"> <slot/></p>
      <div class="content">
        <p class="item" v-for="(t, i) in tags" :key="t + i">
          {{ t }}
          <span @click="removeTag(i)" :class="['close', { 'disabled' : disabled }]"
            ><img src="@/assets/deleteIcon.svg" alt=""
          /></span>
        </p>
        <input type="text" v-model="tag" :disabled='disabled' @keyup="handleKey" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inputtag',
  data() {
    return {
      msg: 'Tags',
      tag: '',
    };
  },
  model: {
    prop: 'tags',
  },
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    message: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },
  methods: {
    handleSubmit() {
      this.tags.push(this.tag);
      this.tag = '';
    },
    handleKey(e) {
      if (e.code === 'Enter') {
        this.handleSubmit();
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.2rem;
  margin-bottom: 1.6rem;
}
.wrapper {
  min-height: 10rem;
  max-width: 56rem;
  background: #ffffff;
  border: 1px solid $grey;
  box-sizing: border-box;
  border-radius: 0.8rem;
  padding: 1rem 3rem;
  font-size: 20px;
  box-sizing: border-box;
}
.content {
  display: flex;
  flex-flow: wrap;
  grid-gap: 2rem;
  margin-bottom: 1.6rem;
}

.item {
  position: relative;
  white-space: nowrap;
  height: 3.6rem;
  padding: 1rem;
  background: $grey-light;
  border-radius: 0.8rem;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: $black;

  img {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    @include on-event {
      .close {
        opacity: 1;
        transform: scale(1) translateY(-50%);
      }
    }
  }
}
.disabled{
  pointer-events: none;
}
.close {
  position: absolute;
  top: 50%;
  right: -1rem;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 50%;
  background: white;
  opacity: 0;
  transform: scale(0) translateY(-50%);
  transition: opacity 200ms ease, transform 200ms cubic-bezier(0.25, 0.75, 0.8, 1.25);
}
input {
  font-size: 20px;
  white-space: nowrap;
  width: 10rem;
  height: 3.6rem;
  padding: 1rem;
  background: $grey-light;
  border-radius: 0.8rem;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: $black;
  border: none;
}
</style>
