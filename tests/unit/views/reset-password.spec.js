import { shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ResetPassword from '@/views/Auth/ResetPassword';
import { localVue, successStore as store } from '../../utils/local-vue';

localVue.use(VueRouter);
const router = new VueRouter();

describe('mount the reset password page', () => {
  it('renders the reset password page', () => {
    const wrapper = shallowMount(ResetPassword, {
      store,
      localVue,
      router,
    });
    expect(wrapper.vm.$options.name).toMatch('ResetPassword');
    expect(wrapper.vm.forgotPassword());
    expect(wrapper.vm.forgotPassword());
  });
});
