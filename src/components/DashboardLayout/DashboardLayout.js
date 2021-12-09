import { mapGetters } from 'vuex';
import { APP_NAME } from '@/config';
import { MENU_ITEMS } from '@/config/menu';
import stringHelpers from '../../utils/string-helpers';

export default {
  name: 'DashboardLayout',
  data: () => ({
    appName: APP_NAME,
    menuItems: MENU_ITEMS,
  }),
  computed: {
    ...mapGetters({
      profile: 'auth/getProfile',
    }),
  },
  methods: {
    ...stringHelpers,
  },
};
