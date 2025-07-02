import apiClient from './axiosConfig';

export const getAllMessages = async () => {
  const res = await apiClient.get('/messages'); // baseURL + /messages
  return res.data; // { success, count, data }
};

export const postMessage = async (messageData) => {
  const res = await apiClient.post('/messages', messageData);
  return res.data; // { success, message }
};