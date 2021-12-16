import {
  getAllRoles,
  getAllRolesDetails,
  addRole,
  editRole,
  deleteRole,
} from '@/api';

jest.mock('@/config', () => ({
  instance: {
    get: jest.fn().mockResolvedValue(true),
    post: jest.fn().mockResolvedValue('success'),
    put: jest.fn().mockResolvedValue('edited'),
    delete: jest.fn().mockResolvedValue('deleted'),
  },
}));

const role = {
  id: 10, name: 'data engineer',
};

describe('roles api', () => {
  it('fetches all roles', async () => {
    const roles = await getAllRoles();
    expect(roles).toBeTruthy();
  });

  it('fetches all roles details', async () => {
    const roles = await getAllRolesDetails({});
    expect(roles).toBeTruthy();
  });

  it('adds new role', async () => {
    const roles = await addRole({ role });
    expect(roles).toBeTruthy();
  });

  it('edits role', async () => {
    const roles = await editRole({ role });
    expect(roles).toBeTruthy();
  });

  it('deletes role', async () => {
    const roles = await deleteRole({ role });
    expect(roles).toBeTruthy();
  });
});
