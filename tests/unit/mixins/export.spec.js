import DownloadMixin from '@/mixins/export';

describe('export mixin', () => {
  it('should download csv', () => {
    const mockThis = {
      startDate: 'Tue Feb 22 2022 15:30:22 GMT+0000 (Greenwich Mean Time)',
      endDate: 'Tue Feb 22 2022 15:30:22 GMT+0000 (Greenwich Mean Time)',
      fileType: '',
      title: '',
      modalOpen: false,
      saveAs: jest.fn(),
      reset: jest.fn(),
      formatISO: jest.fn(),
      exportCustomers: jest
        .fn()
        .mockResolvedValueOnce(['error'])
        .mockResolvedValueOnce({ error: 'Customer not found' }),
    };

    DownloadMixin.methods.downloadCsv.call(mockThis);
    DownloadMixin.methods.reset.call(mockThis);
  });
});
