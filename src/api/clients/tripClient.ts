import axiosClient from "./axiosConfig";
import { Route, Stop } from "../interfaces/apiModels";

const fetchData = async <T>(endpoint: string, params?: object): Promise<T> => {
    try {
        const response = await axiosClient.get(endpoint, { params });
        return response.data.data || response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};

const fetchStopsByLocation = (p: { swLat: number; neLat: number; neLon: number; swLon: number }) => {
    return fetchData<Stop[]>('/stops', p);
};

const fetchRouteInfo = (id: string) => {
    return fetchData<Route>(`/routes/${id}`);
};

const fetchStopDetailsById = (id: string) => {
    return fetchData<Stop>(`/stops/${id}`);
};

const fetchAllRoutes = () => {
    return fetchData<Route[]>('/routes');
};

export { fetchStopsByLocation, fetchStopDetailsById, fetchAllRoutes, fetchRouteInfo };
