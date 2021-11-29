import KCard from '@/components/Card/Card.vue';
import KButton from '@/components/Button/Button.vue';
import EditableListItem from './EditableListItem.vue';
import KModal from '../../../components/Modal/Modal.vue';
import RoleForm from './RoleForm.vue';

export default {
  name: 'RolesAndPermissions',
  components: {
    KModal,
    KButton,
    KCard,
    EditableListItem,
    RoleForm,
  },
  data: () => ({
    modalOpen: false,
    showControls: true,
    editing: false,
    role: {},
    roles: [
      {
        title: 'Super Admin',
        description:
          'This is just a test description to understand how this design would really look like in real life. I’m hoping it gets to three lines or else I’m going to keep typing until it is done.',
        noDelete: true,
        noEdit: true,
      },
      {
        title: 'Guest',
        description:
          'This is just a test description to understand how this design would really look like in real life. I’m hoping it gets to three lines or else I’m going to keep typing until it is done.',
        noDelete: true,
      },
      {
        title: 'Admin',
        description:
          'This is just a test description to understand how this design would really look like in real life. I’m hoping it gets to three lines or else I’m going to keep typing until it is done.',
      },
      {
        title: 'Data Analyst',
        description:
          'This is just a test description to understand how this design would really look like in real life. I’m hoping it gets to three lines or else I’m going to keep typing until it is done.',
      },
    ],
  }),
  methods: {
    editItem(val) {
      this.role = val;
      this.modalOpen = true;
    },
    deleteItem(role) {
      const index = this.roles.findIndex((r) => r.title === role.title);
      this.roles.splice(index, 1);
    },
  },
};
