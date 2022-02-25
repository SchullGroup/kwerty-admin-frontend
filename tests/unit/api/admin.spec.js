import {
  getAllAdmin,
  addAdmin,
  editOtherAdmin,
  deleteOtherAdmin,
  getOtherAdmin,
  exportAdmins,
} from '@/api';

jest.mock('@/config', () => ({
  instance: {
    get: jest.fn().mockResolvedValue(true),
    post: jest.fn().mockResolvedValue('success'),
    put: jest.fn().mockResolvedValue('edited'),
    delete: jest.fn().mockResolvedValue('deleted'),
  },
}));

const admin = {
  id: 'quick132',
  firstName: 'steve',
  lastName: 'rogers',
};
const token = 't1h2e3q4u5i6c7k8b9r1o2w3n4f5o6x';

describe('admin api', () => {
  it('fetches admins', async () => {
    const admins = await getAllAdmin((token));
    expect(admins).toBeTruthy();
  });
  it('fetches single admin', async () => {
    const singleAdmin = await getOtherAdmin((token));
    expect(singleAdmin).toBeTruthy();
  });
  it('adds admin', async () => {
    const message = await addAdmin({ token, admin });
    expect(message).toMatch('success');
  });
  it('edits other admin', async () => {
    const message = await editOtherAdmin({ token, admin });
    expect(message).toMatch('edited');
  });
  it('delete other admin', async () => {
    const message = await deleteOtherAdmin({ token, id: 'something' });
    expect(message).toMatch('deleted');
  });
  it('exports admins', async () => {
    const admins = await exportAdmins();
    expect(admins).toBe(true);
  });
});
