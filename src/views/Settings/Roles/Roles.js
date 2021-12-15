import { mapActions, mapGetters } from 'vuex';
import KCard from '@/components/Card/Card.vue';
import KButton from '@/components/Button/Button.vue';
import EditableListItem from './EditableListItem.vue';
import KModal from '../../../components/Modal/Modal.vue';
import RoleForm from './RoleForm.vue';
import stringHelpers from '../../../utils/string-helpers';

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
  }),
  computed: {
    ...mapGetters({
      roles: 'roles/getAllDetails',
    }),
  },
  methods: {
    ...stringHelpers,
    ...mapActions({
      deleteRole: 'roles/deleteRole',
    }),
    addItem() {
      this.role = null;
      this.modalOpen = true;
    },
    editItem(val) {
      this.role = val;
      this.modalOpen = true;
    },
    async deleteItem(id) {
      try {
        await this.deleteRole({ id });
        this.$toast.show({ message: 'Role deleted successfully' });
      } catch (e) {
        this.$toast.show({ message: e });
      }
    },
  },
};
