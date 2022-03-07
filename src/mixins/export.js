import { mapActions } from 'vuex';
import formatISO from 'date-fns/formatISO';
import { saveAs } from 'file-saver';
import pdfTemplate from '../views/Activity/pdfTemplate';
import { downloadDataset } from '../api/upload';
import formatters from '../utils/formatters';

export default {
  data: () => ({
    startDate: '',
    endDate: '',
    fileType: '',
    title: '',
    isDownloading: false,
  }),
  methods: {
    ...mapActions({
      exportCustomers: 'customers/exportCustomers',
    }),
    async downloadCsv() {
      const {
        startDate, endDate, fileType, title,
      } = this;
      const startdate = formatISO(new Date(startDate));
      const enddate = formatISO(new Date(endDate));
      this.isDownloading = true;
      try {
        const downloaded = await this.exportCustomers({
          startDate: startdate,
          endDate: enddate,
          fileType: fileType === 'pdf' ? 'csv' : 'csv',
          title,
        });
        if (!downloaded.error) {
          if (fileType === 'pdf') {
            // eslint-disable-next-line no-useless-escape
            const result = downloaded.replaceAll('\"', '')
              .split('\n').map((row) => row.split(','));
            const tableHeaders = result.shift();
            result.forEach((r, i) => {
              const dateIndex = r.length - 3;
              const formattedDate = formatters.formatDate(r[dateIndex]);
              result[i].splice(dateIndex, 1, formattedDate);
            });
            const options = { tableHeaders, tableBodyData: result, title };
            const final = pdfTemplate(options);
            const htmlBlob = new Blob([final], { type: 'text/plain' });
            const htmlFile = new File([htmlBlob], { type: 'text/plain' });
            const formData = new FormData();
            formData.append('file', htmlFile);
            const response = await downloadDataset({ data: formData, type: 'pdf' });
            const responseBlob = new Blob([response.data], { type: 'application/pdf' });
            const fileName = `${title}.pdf`;
            saveAs(responseBlob, fileName);
            this.isDownLoading = false;
          } else {
            const blob = new Blob([downloaded], { type: 'text/plain;charset=UTF-8' });
            saveAs(blob, `${title}.csv`);
            this.$toast.show({ message: `Exported ${title}.csv` });
            this.isDownloading = false;
          }
        } else if (downloaded.error === 'Customer not found') {
          this.$toast.show({ message: 'Customer not found within the specified date range' });
        }
        this.reset();
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
    reset() {
      this.startDate = '';
      this.endDate = '';
      this.fileType = '';
      this.title = '';
      this.modalOpen = false;
    },
  },
};
