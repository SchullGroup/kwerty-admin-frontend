import { KCard, KIcons, KButton } from '@/components';

export default {
  name: 'Admins',
  components: {
    KCard,
    KIcons,
    KButton,
  },
  props: {},
  data: () => ({
    editAdmin: false,
    button: {
      text: 'Edit Admin',
    },
    show: false,
    admins: [
      {
        name: 'Akomolafe Olamide',
        role: 'Admin',
      },
      {
        name: 'Sonny Kyel',
        role: 'Guest',
      },
      {
        name: 'Nnenna Ojiofor',
        role: 'Guest',
      },
      {
        name: 'Oluwaseun Morenike',
        role: 'Admin',
      },
    ],
  }),
  methods: {
    toggleButtonText() {
      this.editAdmin = !this.editAdmin;
      this.button.text = this.editAdmin ? 'Save Changes' : 'Edit Admin';
    },
  },
};
