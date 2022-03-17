import vue2Dropzone from 'vue2-dropzone';
import { mapActions } from 'vuex';
import {
  KButton, KDashboardLayout, KInput, KModal,
} from '@/components';
import errorHandler from '@/utils/error-handler';
import parseCsv from '@/utils/parseCsv';

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
      acceptedFiles: ['text/csv'],
    },
    filename: '',
    fileData: [],
    fileFields: [],
    htmlFile: null,
    dataIsUploading: false,
  }),
  methods: {
    ...mapActions({
      uploadCSV: 'database/uploadCSV',
    }),
    goToTab(active) {
      this.$router.push({
        name: 'ManageData',
        query: {
          active,
        },
      });
    },
    loadEventListener(e) {
      const data = e.target.result;
      const table = parseCsv(data, ',', '\n');
      const [headers, ...body] = table;
      this.fileFields = headers;
      this.fileData = body;
    },
    async addFile(file) {
      try {
        if (!file.name.endsWith('.csv')) {
          this.fileData = [];
          return;
        }

        this.filename = file.name;
        const reader = new FileReader();
        reader.onload = this.loadEventListener;
        reader.readAsText(file);
      } catch (e) {
        this.$toast.show({ message: errorHandler(e) });
      } finally {
        this.htmlFile = file;
      }
    },
    async uploadDataToCloud() {
      this.dataIsUploading = true;
      this.isUploading = true;
      const formData = new FormData();
      formData.append('file', this.htmlFile);
      try {
        const isUploaded = await this.uploadCSV(formData);
        if (!isUploaded.error) {
          this.$toast.show({ message: 'Data uploaded successfully' });
          this.$router.push({ name: 'ManageData' });
        } else {
          throw Error(isUploaded.error);
        }
      } catch (e) {
        this.$toast.show({ message: errorHandler(e).error });
      } finally {
        this.dataIsUploading = false;
        this.isUploading = false;
      }
    },
    resetPage() {
      this.htmlFile = null;
      this.activeTab = 'UPLOAD CSV';
      this.filename = '';
      this.fileData = [];
      this.fileFields = [];
    },
  },
};
