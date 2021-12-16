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
          token: 'esdfghbvrertyth',
        }),
        getProfile: jest
          .fn()
          .mockResolvedValueOnce({
            id: 'the234quick',
            firstName: 'Akomolafe',
            lastName: 'Oluwaseun',
            role: 'Super Admin',
            email: 'sa@gmail.com',
          })
          .mockRejectedValueOnce('something went wrong'),
      },
      actions: {
        login: jest
          .fn()
          .mockResolvedValueOnce({ id: '' })
          .mockResolvedValueOnce({ id: 'yes' })
          .mockResolvedValueOnce({ id: '' }),
        forgotPassword: jest
          .fn()
          .mockResolvedValueOnce({ message: 'password reset successfully' })
          .mockRejectedValueOnce(new Error('error occurred')),
        getProfile: jest
          .fn()
          .mockResolvedValueOnce({ error: '' })
          .mockResolvedValueOnce({ error: 'yes' }),
        resetPassword: jest
          .fn()
          .mockResolvedValueOnce({ error: '' })
          .mockResolvedValueOnce({ error: 'yes' })
          .mockRejectedValueOnce(new Error('error occurred')),
      },
      mutations: {
        RESET: jest.fn(),
      },
      namespaced: true,
    },
    activity: {
      getters: {
        getActivities: jest.fn().mockResolvedValueOnce([
          {
            activity: 'logged in',
            name: 'test name',
            createdAt: 'someDate',
          },
        ]),
        getUserActivities: jest
          .fn()
          .mockResolvedValueOnce([
            {
              activity: 'logged in',
              name: 'test name',
              createdAt: 'someDate',
            },
          ]),
      },
      actions: {
        getActivities: jest
          .fn()
          .mockResolvedValueOnce({ error: '' })
          .mockResolvedValueOnce({ error: 'yes' }),
      },
      mutations: {
        SET_ACTIVITIES: jest.fn(),
        SET_USER_ACTIVITIES: jest.fn(),
      },
      namespaced: true,
    },
    roles: {
      getters: {
        getAll: jest.fn().mockResolvedValue([{ id: '1', name: 'super_admin' }]),
        getAllDetails: jest.fn().mockResolvedValue([
          {
            id: '1',
            name: 'super_admin',
            description: 'some description',
            permissions: {
              dataset: ['create'],
              role: [],
              admin: [],
              indicator: [],
              activity: [],
            },
          },
        ]),
      },
      actions: {
        fetchAll: jest.fn().mockResolvedValue([{ id: '1', name: 'super_admin' }]),
        fetchAlDetails: jest.fn().mockResolvedValue([{ id: '1', name: 'super_admin' }]),
        addRole: jest
          .fn()
          .mockResolvedValueOnce({ message: 'added successfully' })
          .mockRejectedValueOnce(new Error('error occurred')),
        editRole: jest
          .fn()
          .mockResolvedValueOnce({ message: 'updated successfully' })
          .mockRejectedValueOnce(new Error('error occurred')),
        deleteRole: jest
          .fn()
          .mockResolvedValueOnce({ message: 'deleted successfully' })
          .mockRejectedValueOnce(new Error('error occurred')),
      },
      namespaced: true,
    },
    admin: {
      getters: {
        getPagination: () => ({ currentPage: 1, total: 13, totalPages: 1 }),
        getAll: () => [
          {
            id: 1,
            firstName: 'Steve',
            lastName: 'Rogers',
            roleName: 'super_admin',
          },
        ],
      },
      actions: {
        fetchAll: jest
          .fn()
          .mockResolvedValueOnce({ message: 'fetched successfully' })
          .mockRejectedValueOnce(new Error('error occurred')),
        addAdmin: jest
          .fn()
          .mockResolvedValueOnce({ message: 'added successfully' })
          .mockRejectedValueOnce(new Error('error occurred')),
        editOtherAdmin: jest
          .fn()
          .mockResolvedValueOnce({ message: 'updated successfully' })
          .mockRejectedValueOnce(new Error('error occurred')),
        deleteOtherAdmin: jest
          .fn()
          .mockResolvedValueOnce({ message: 'deleted successfully' })
          .mockRejectedValueOnce(new Error('error occurred')),
      },
      namespaced: true,
    },
    indicators: {
      getters: {
        getIndicators: jest.fn().mockResolvedValue([
          {
            name: 'World Hunger',
            category: 'Health',
            frequency: 'yearly',
            lastModified: 'some-date',
          },
          {
            name: 'World Hunger',
            category: 'Health',
            frequency: 'yearly',
            lastModified: 'some-date',
          },
        ]),
      },
      actions: {
        addIndicator: jest
          .fn()
          .mockResolvedValueOnce({ message: 'indicator successfully added' })
          .mockResolvedValueOnce({ message: { error: 'error occurred' } })
          .mockRejectedValueOnce({ message: { error: 'error occurred' } }),
        getIndicators: jest
          .fn()
          .mockResolvedValueOnce({ message: 'indicator successfully fetched' })
          .mockResolvedValueOnce({ message: 'error occurred' }),
        deleteIndicator: jest
          .fn()
          .mockResolvedValueOnce({ message: 'indicator successfully deleted' })
          .mockRejectedValueOnce({ message: 'error occurred' }),
      },
      mutations: {
        SET_INDICATORS: jest.fn(),
      },
      namespaced: true,
    },
  },
});

export { localVue, successStore };
