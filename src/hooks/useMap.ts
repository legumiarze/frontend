import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import {fetchStopsByLocation} from "../api/clients/tripClient";
import {Stop} from "../api/interfaces/apiModels";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

const useMap = (setData: (data: Stop[]) => void) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [isStopFocused, setIsStopFocused] = useState(false);

    const getData = async () => {
        try {
            if (map.current) {
                const mapCoords = map.current.getBounds();
                const result = await fetchStopsByLocation({
                    neLat: mapCoords.getNorthEast().lat,
                    neLon: mapCoords.getNorthEast().lng,
                    swLat: mapCoords.getSouthWest().lat,
                    swLon: mapCoords.getSouthWest().lng
                });
                setData(result);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [19.9333, 50.0614],
            zoom: 8
        });

        map.current.on('load', () => {
            map.current!.on('moveend', () => {
                const zoomLevel = map.current!.getZoom();
                const zoomThreshold = 15;

                if (!isStopFocused && zoomLevel >= zoomThreshold) {
                    getData();
                }
            });
        });
    }, [isStopFocused]);

    return { mapContainer, map, isStopFocused, setIsStopFocused, getData };
};

export default useMap;
