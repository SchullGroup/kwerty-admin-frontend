import XLSX from 'xlsx';
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
    fileData: [],
    fileFields: [],
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
    async addFile(file) {
      this.isUploading = true;
      this.filename = file.name;
      const data = await file.arrayBuffer();
      const res = XLSX.read(data);
      const sheetData = XLSX.utils.sheet_to_json(Object.values(res.Sheets)[0]);
      this.fileData = sheetData;
      this.fileFields = new Set();
      Object.keys(sheetData[0]).forEach((k) => {
        this.fileFields.add(k);
      });
      this.isUploading = false;
    },
  },
};
