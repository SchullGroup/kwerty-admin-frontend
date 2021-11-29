import { KDashboardLayout } from '../../components';
import KProfile from './Profile.vue';
import KManage from './Manage/Manage.vue';

export default {
  name: 'Settings',
  components: {
    KDashboardLayout,
    KProfile,
    KManage,
  },
  data: () => ({
    activeTab: 'profile',
  }),
};
