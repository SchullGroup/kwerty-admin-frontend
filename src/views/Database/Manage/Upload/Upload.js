import XLSX from 'xlsx';
import vue2Dropzone from 'vue2-dropzone';
import { mapActions } from 'vuex';
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
    async addFile(file) {
      try {
        this.filename = file.name;
        const data = await file.arrayBuffer();
        const res = XLSX.read(data);
        const sheetData = XLSX.utils.sheet_to_json(Object.values(res.Sheets)[0]);
        this.fileData = sheetData;
        this.fileFields = new Set();
        Object.keys(sheetData[0]).forEach((k) => {
          this.fileFields.add(k);
        });
      } catch (e) {
        this.$toast.show({ message: e });
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
        this.$toast.show({ message: e });
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
