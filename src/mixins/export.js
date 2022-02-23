import { mapActions } from 'vuex';
import formatISO from 'date-fns/formatISO';
import { saveAs } from 'file-saver';

export default {
  data: () => ({
    startDate: '',
    endDate: '',
    fileType: '',
    title: '',
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
      this.isLoading = true;
      try {
        const downloaded = await this.exportCustomers({
          startDate: startdate,
          endDate: enddate,
          fileType,
          title,
        });
        if (downloaded.error) {
          throw Error(downloaded.error);
        }
        const blob = new Blob([downloaded], { type: 'text/plain;charset=UTF-8' });
        saveAs(blob, `${title}.csv`);
        this.$toast.show({ message: `Exported ${title}.csv` });
        this.isLoading = false;
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
