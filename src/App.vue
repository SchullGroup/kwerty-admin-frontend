<template>
  <div id="app">
    <router-view/>
    <k-toast />
  </div>
</template>

<script>
import { KToast } from '@/components';

export default {
  name: 'App',
  components: {
    KToast,
  },
};
</script>

<style lang="scss" src="@/styles/main.scss"></style>
