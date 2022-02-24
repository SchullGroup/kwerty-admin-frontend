import { instance } from '../config';

export default function (form) {
  return instance.post('./upload', form, {
    'Content-Type': 'multipart/form-data',
  });
}

export function downloadDataset({ data, type }) {
  return instance.post(`/export/dataset?file_type=${type}`, data, {
    'Content-Type': 'multipart/form-data',
    responseType: 'blob',
  });
}
