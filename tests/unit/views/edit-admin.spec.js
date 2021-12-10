import { shallowMount } from '@vue/test-utils';
import EditAdmin from '@/views/Settings/Manage/EditAdmin.vue';
import { localVue, successStore as store } from '../../utils/local-vue';
import stringHelpers from '@/utils/string-helpers';

let wrapper;
describe(' Edits Admin Component', () => {
  let mockThis = {
    currentadmin: {
      firstName: 'Sam',
      lastName: 'lokonga',
      email: 'SL@gmail.com',
      roleId: 1,
    },
  };
  beforeEach(async () => {
    wrapper = shallowMount(EditAdmin, { localVue, store });
  });
  it('renders the edit user component', async () => {
    expect(wrapper.vm.$options.name).toMatch('KEditAdmin');
    expect(EditAdmin.created.call({ ...wrapper.vm, ...mockThis }));
    expect(
      EditAdmin.computed.rolesDisplay.call({
        roles: [
          {
            id: '1',
            name: 'super_admin',
          },
        ],
      }),
    ).toEqual({
      1: 'Super Admin',
    });
  });

  it('converts names to Title Case', () => {
    expect(stringHelpers.titleCase('the quick brown fox jumps over a lazy dog')).toMatch(
      'The Quick Brown Fox Jumps Over a Lazy Dog',
    );
  });

  it('should update admin', () => {
    mockThis = {
      admin: {
        id: 1, firstName: 'marsian', lastName: 'manhunter', email: 'a@gmail.com', roleId: 2,
      },
      user: { token: 'the' },
    };
    wrapper.vm.finish();
    wrapper.vm.finish();
  });
});
