import {
  getAllCustomers, changeCustomerStatus, singleCustomerActivities, exportCustomers,
} from '@/api/customers';

jest.mock('@/config', () => ({
  instance: {
    get: jest.fn().mockResolvedValue(true),
    patch: jest.fn().mockResolvedValueOnce(true),
  },
}));

describe('customer api', () => {
  it('fetches all indicators', async () => {
    const indicators = await getAllCustomers({ page: 1, search: 'searchword' });
    expect(indicators).toBe(true);
  });
  it('disables or anmables customer', async () => {
    const status = await changeCustomerStatus({ user: { id: '2343tyrfgh87trd' } });
    expect(status).toBe(true);
  });
  it('gets single customer activities', async () => {
    const indicator = await singleCustomerActivities({ nameOrEmail: 'salma' });
    expect(indicator).toBe(true);
  });
  it('exports customer data as csv', async () => {
    const indicator = await exportCustomers({
      title: 'something', fileType: 'csv', startDate: 'someDate', endDate: 'someDate',
    });
    expect(indicator).toBe(true);
  });
});
