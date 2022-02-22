/* eslint-disable no-undef */
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
        getUserActivities: jest.fn().mockResolvedValueOnce([
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
        exportActivities: jest
          .fn()
          .mockResolvedValue({ error: '' })
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
      actions: {
        addIndicator: jest
          .fn()
          .mockResolvedValueOnce({ message: { error: '' } })
          .mockResolvedValueOnce({ message: 'indicator successfully added' })
          .mockRejectedValueOnce({ message: { error: 'error occurred' } }),
        updateIndicator: jest
          .fn()
          .mockResolvedValueOnce({ message: 'indicator successfully updated' })
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
      mutations: {
        SET_INDICATORS: jest.fn(),
      },
      namespaced: true,
    },
    database: {
      actions: {
        // eslint-disable-next-line no-undef
        fetchDatabase: jest
          .fn()
          .mockResolvedValueOnce({ message: 'database fetched successfully' })
          .mockRejectedValueOnce({ message: { error: 'error occured' } }),
        // eslint-disable-next-line no-undef
        fetchDataById: jest
          .fn()
          .mockRejectedValueOnce({ message: { error: 'error occured' } })
          .mockResolvedValueOnce({ message: { error: '' } })
          .mockResolvedValueOnce({ message: 'database fetched successfully' }),
        performDataAction: jest
          .fn()
          .mockRejectedValueOnce({ message: { error: 'error occured' } })
          .mockResolvedValueOnce({ message: { error: '' } })
          .mockResolvedValueOnce({ message: 'database action performed' }),
        updateData: jest
          .fn()
          .mockResolvedValueOnce({ message: { error: '' } })
          .mockResolvedValueOnce({ message: { error: 'error occured' } })
          .mockResolvedValueOnce({ message: 'dataset updated successfully' }),
      },
      getters: {
        getDatabase: jest.fn().mockResolvedValue([
          {
            name: 'database',
            indicators: 'some indicators',
          },
        ]),
      },
      mutations: {
        SET_DATABASE: jest.fn(),
      },
      namespaced: true,
    },
    customers: {
      actions: {
        getAllCustomers: jest
          .fn()
          .mockRejectedValueOnce({ message: { error: 'error occured' } })
          .mockResolvedValueOnce({ message: 'customers fetched successfully' })
          .mockResolvedValueOnce({ error: 'error occured' }),
        changeCustomerStatus: jest
          .fn()
          .mockRejectedValueOnce({ message: { error: 'error occured' } })
          .mockResolvedValueOnce({ message: 'customer status updated' })
          .mockResolvedValueOnce({ error: 'error occured' }),
        singleCustomerActivities: jest
          .fn()
          .mockResolvedValueOnce({ message: 'customer status updated' })
          .mockRejectedValueOnce({ message: { error: 'error occured' } }),
        exportCustomers: jest
          .fn()
          .mockRejectedValueOnce({ error: 'error occured' })
          .mockResolvedValueOnce({ message: 'customer status updated' })
          .mockResolvedValueOnce({ error: '' }),
      },
      getters: {
        getCustomers: jest.fn().mockRejectedValue([
          {
            name: 'sam john',
            email: 'some@gmail.com',
          },
        ]),
      },
      namespaced: true,
    },
    dashboard: {
      actions: {
        getRecentAdminActivities: jest
          .fn()
          .mockRejectedValueOnce({ message: 'error occured' })
          .mockResolvedValueOnce({ message: 'fectched succesfully' })
          .mockResolvedValueOnce({ error: '' }),
        getAnalytics: jest
          .fn()
          .mockResolvedValueOnce({ message: '' })
          .mockResolvedValueOnce({ message: 'fectched succesfully' })
          .mockResolvedValueOnce({ error: 'error occured' }),
        getActiveUsers: jest
          .fn()
          .mockResolvedValueOnce({ error: '' })
          .mockResolvedValueOnce({ message: 'fectched succesfully' }),
      },
      getters: {
        getRecentActivities: jest.fn().mockResolvedValueOnce([
          {
            activity: 'logged in',
            name: 'test name',
            createdAt: 'someDate',
            status: 'success',
          },
        ]),
      },
    },
  },
});

export { localVue, successStore };
