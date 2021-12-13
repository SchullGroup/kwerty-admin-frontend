import { mount } from '@vue/test-utils';
import IPagination from '@/components/Pagination/Pagination.vue';

describe('Pagination Component', () => {
  let wrapper = null;

  beforeAll(() => {
    wrapper = mount(IPagination, {
      propsData: {
        page: 2, maxItemsOnPage: 20, totalItems: 248, totalPages: 3, variant: 'many',
      },
    });
  });

  it('should mount correctly', () => {
    expect(wrapper.vm.$options.name).toMatch('KPagination');
    expect(wrapper.attributes().class).toContain('pagination');
  });

  it('should change page on click', async () => {
    await wrapper.find('.pagination__button:nth-of-type(1)').trigger('click');
    await wrapper.find('.pagination__button:nth-of-type(2)').trigger('click');
    await wrapper.find('.pagination__button:nth-of-type(3)').trigger('click');
    await wrapper.find('.pagination__button:nth-of-type(4)').trigger('click');
    await wrapper.vm.$nextTick();

    // expect(wrapper.emitted().goToPrev.length).toBe(1);
    expect(wrapper.emitted()).toHaveProperty('goToNext');
    expect(wrapper.emitted()).toHaveProperty('goToFirst');
    expect(wrapper.emitted()).toHaveProperty('goToLast');
  });

  it('should use total items as end on last page', async () => {
    await wrapper.setProps({ page: 13 });
    expect(wrapper.text()).toContain('241-248 out of 248');
  });
});
