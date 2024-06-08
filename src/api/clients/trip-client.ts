import axiosClient from "./axiosConfig";


const fetchData = async () => {
    try {
        const response = await axiosClient.get('/stops');
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default fetchData;
