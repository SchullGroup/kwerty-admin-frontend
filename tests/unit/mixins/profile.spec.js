import ProfileMixin from '@/mixins/Profile';

describe('Profile mixin', () => {
  it('should fetch admin profile', () => {
    const mockThis = {
      isLoading: false,
      user: { id: 1, token: 'thre32' },
      fetchProfile: jest
        .fn()
        .mockRejectedValueOnce({ error: '' })
        .mockResolvedValueOnce({ error: 'yes' }),
    };
    ProfileMixin.methods.getProfile.call(mockThis);
  });
});
