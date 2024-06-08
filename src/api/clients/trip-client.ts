import axiosClient from "./axiosConfig";


const fetchData = async (p: { swLat: number; neLat: number; neLon: number; swLon: number }) => {
    try {
        const response = await axiosClient.get('/stops', { params: p });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default fetchData;
