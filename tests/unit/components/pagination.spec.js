import { shallowMount } from '@vue/test-utils';
import IPagination from '@/components/Pagination/Pagination.vue';

describe('Pagination Component', () => {
  let wrapper = null;

  beforeAll(() => {
    wrapper = shallowMount(IPagination, {
      propsData: { currentPageStart: 1, currentPageEnd: 20, totalItems: 248 },
    });
  });

  it('should mount correctly', () => {
    expect(wrapper.vm.$options.name).toMatch('KPagination');
    expect(wrapper.attributes().class).toContain('pagination');
  });

  it('should change page on click', async () => {
    await wrapper.find('.pagination__button').trigger('click');
    await wrapper.find('.pagination__button:last-child').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()).toHaveProperty('goToPrev');
    expect(wrapper.emitted()).toHaveProperty('goToNext');
  });
});
