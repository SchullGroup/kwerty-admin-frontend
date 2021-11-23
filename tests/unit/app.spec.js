import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Application Shell', () => {
  it('renders the application shell', () => {
    const wrapper = shallowMount(App, {
      localVue,
      router,
    });
    expect(wrapper.vm.$options.name).toMatch('App');
    expect(wrapper.attributes().id).toBe('app');
  });
});
