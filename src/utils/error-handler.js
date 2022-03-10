export default function errorHandler(e) {
  if ('error' in e) return e;
  const data = e.response ? e.response.data : e;
  const { message } = data;
  return {
    error: message,
  };
}
