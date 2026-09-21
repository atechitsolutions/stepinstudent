import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
export const submitInquiry = async (data) =>  {
    const response = await axios.post(`${API_BASE_URL}/api/inquiries`, data);
    return response.data;
}
;
