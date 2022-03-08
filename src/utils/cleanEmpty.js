export default function cleanEmpty(data) {
  const clean = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      clean[key] = value;
    }
  });
  return clean;
}
