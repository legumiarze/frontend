import axiosClient from "./axiosConfig";
import {Stop} from "../interfaces/sample";


const fetchStopsByLocation = async (p: { swLat: number; neLat: number; neLon: number; swLon: number }) => {
    try {
        const response = await axiosClient.get('/stops', { params: p });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const fetchStopDetailsById = async (id: number): Promise<Stop> => {
    try {
        const response = await axiosClient.get(`/stops/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export { fetchStopsByLocation, fetchStopDetailsById };
