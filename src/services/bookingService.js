import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const addBookingToCalendar = async (bookingData) => {
    console.log('bookingService: Starting API call with data:', bookingData);

    try {
        console.log('bookingService: Sending POST request to:', `${API_URL}/calendar/book`);
        const response = await axios.post(`${API_URL}/calendar/book`, bookingData);
        console.log('bookingService: Received response:', response.data);
        return response.data;
    } catch (error) {
        console.error('bookingService: API call failed:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}; 