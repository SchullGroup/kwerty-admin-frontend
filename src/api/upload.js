import { instance } from '../config';

export default function (form) {
  return instance.post('./upload', form, {
    'Content-Type': 'multipart/form-data',
  });
}
