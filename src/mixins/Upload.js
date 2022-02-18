import uploadFile from '@/api/upload';

export default {
  data: () => ({
    imageUrl: '',
  }),
  methods: {
    async uploadFile(event) {
      this.isUploading = true;
      const form = new FormData();
      const file = event.target.files[0];
      form.append('file', file);
      const imageUploaded = await uploadFile(form);
      this.isUploading = false;
      if (imageUploaded.status === 200) {
        const {
          data: { data },
        } = imageUploaded;
        return Promise.resolve({ url: data.url, name: file.name });
      }
      const {
        response: { data },
      } = imageUploaded;
      return Promise.reject(data);
    },
  },
};
