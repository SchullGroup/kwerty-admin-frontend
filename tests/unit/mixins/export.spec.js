import DownloadMixin from '@/mixins/export';

jest.mock('@/api/upload', () => ({
  __esModules: true,
  downloadDataset: jest.fn(),
}));

jest.mock('@/utils/formatters', () => ({
  __esModules: true,
  formatDate: jest.fn(),
}));

describe('export mixin', () => {
  it('should download csv', () => {
    const mockThis = {
      formatISO: jest.fn(),
      startDate: 'Tue Feb 22 2022 15:30:22 GMT+0000 (Greenwich Mean Time)',
      endDate: 'Tue Feb 28 2022 15:30:22 GMT+0000 (Greenwich Mean Time)',
      fileType: 'pdf',
      title: 'file',
      modalOpen: false,
      saveAs: jest.fn(),
      reset: jest.fn(),
      exportCustomers: jest
        .fn()
        .mockResolvedValueOnce(
          // eslint-disable-next-line quotes
          "id", "email", "joined", "status", "actions", "fullName", "userLastSeen", "imageUrl",
        )
        .mockResolvedValueOnce({ error: 'Customer not found' }),
    };

    DownloadMixin.methods.downloadCsv.call(mockThis);
    DownloadMixin.methods.reset.call(mockThis);
  });
});
