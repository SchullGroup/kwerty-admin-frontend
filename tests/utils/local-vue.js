import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Toast from '@/plugins/toast';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Toast);

const successStore = new Vuex.Store({
  modules: {
    auth: {
      getters: {
        getUser: () => ({
          firstName: 'Akomolafe',
          lastName: 'Oluwaseun',
          email: 'kwerty@gmail.com',
          role: 'Super Admin',
        }),
        getProfile: () => ({
          firstName: 'Akomolafe',
          lastName: 'Oluwaseun',
          role: 'Super Admin',
          email: 'sa@gmail.com',
        }),
      },
      actions: {
        login: jest
          .fn()
          .mockResolvedValueOnce({ error: '' })
          .mockResolvedValueOnce({ error: 'yes' })
          .mockResolvedValueOnce({ error: '' }),

        forgotPassword: jest.fn(() => 'Success'),
        getProfile: jest.fn(),
        resetPassword: jest.fn()
        .mockResolvedValueOnce({ error: '' })
        .mockResolvedValueOnce({ error: 'yes' }),
      },
      mutations: {
        RESET: jest.fn(),
      },
      namespaced: true,
    },
  },
});

export { localVue, successStore };
