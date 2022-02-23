import DownloadMixin from '@/mixins/export';

describe('export mixin', () => {
  it('should download csv', () => {
    const mockThis = {
      startDate: '',
      endDate: '',
      fileType: '',
      title: '',
      modalOpen: false,
      saveAs: jest.fn(),
      formatISO: jest.fn(),
      exportCustomers: jest
        .fn()
        .mockResolvedValueOnce({ message: 'customers exported' })
        .mockRejectedValueOnce({ error: 'error occured' }),
    };

    DownloadMixin.methods.downloadCsv.call(mockThis);
    DownloadMixin.methods.reset.call(mockThis);
  });
});
