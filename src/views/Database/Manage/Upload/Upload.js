import vue2Dropzone from 'vue2-dropzone';
import {
  KDashboardLayout,
  KButton,
  KInput,
  KModal,
} from '@/components';

export default {
  name: 'Upload',
  components: {
    KDashboardLayout,
    KButton,
    vue2Dropzone,
    KInput,
    KModal,
  },
  data: () => ({
    openModal: true,
    isUploading: false,
    tabs: [
      { title: 'UPLOAD CSV', step: 'Step 01' },
      { title: 'REVIEW', step: 'Step 02' },
    ],
    activeTab: 'UPLOAD CSV',
    dropzoneOptions: {
      url: '/',
    },
    filename: '',
  }),
  methods: {
    goToTab(active) {
      this.$router.push({
        name: 'ManageData',
        query: {
          active,
        },
      });
    },
    addFile(file) {
      this.isUploading = true;
      this.filename = file.name;
    },
    // uploading() {},
  },
};
