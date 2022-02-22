import DownloadMixin from '@/mixins/export';

describe('export mixin', () => {
  it('should download csv', () => {
    const mockThis = {
      startDate: '',
      endDate: '',
      fileType: '',
      title: '',
      // saveAs: jest.fn(),
      // formatISO: jest.fn(),
      exportCustomers: jest.fn(),
    };

    DownloadMixin.methods.downloadCsv.call(mockThis);
  });
});
