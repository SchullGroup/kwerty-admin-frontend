import { read, utils } from 'xlsx';
import vue2Dropzone from 'vue2-dropzone';
import { mapActions } from 'vuex';
import {
  KButton, KDashboardLayout, KInput, KModal,
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
    fileFields: [
      'Country',
      'Indicator',
      'Source',
      'Link',
      'Currency Code',
      'Unit',
      'Category',
      'Frequency',
      'Country Code',
      "Indicator's Definition",
      'Note',
    ],
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
        const res = read(data);
        const sheetData = utils.sheet_to_json(Object.values(res.Sheets)[0]);
        console.log(sheetData);
        this.fileData = sheetData;
        // this.fileFields = new Set();
        const remainingFields = [];
        sheetData.forEach((line) => {
          Object.keys(line).forEach((k) => {
            if (!this.fileFields.includes(k) && !remainingFields.includes(k)) {
              remainingFields.push(k);
            }
          });
        });
        // this.fileFields = Array.from(this.fileFields);
        remainingFields.sort((a, b) => String(a).localeCompare(String(b)));
        this.fileFields = this.fileFields.concat(remainingFields);
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
