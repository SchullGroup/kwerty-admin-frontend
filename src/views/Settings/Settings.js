import { KDashboardLayout } from '../../components';
import KProfile from './Profile.vue';
import KRoles from './Roles/Roles.vue';
import KManage from './Manage/Manage.vue';

export default {
  name: 'Settings',
  components: {
    KDashboardLayout,
    KProfile,
    KRoles,
    KManage,
  },
  data: () => ({
    activeTab: 'profile',
  }),
};
