import { KDashboardLayout } from '../../components';
import KProfile from './Profile.vue';

export default {
  name: 'Settings',
  components: {
    KDashboardLayout,
    KProfile,
  },
  data: () => ({
    activeTab: 'profile',
  }),
};
