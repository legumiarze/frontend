import {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import {Stop} from "../api/interfaces/apiModels";

const useMarkers = (map: mapboxgl.Map | null, data: Stop[], markerClick: (stop: Stop) => void, isStopFocused: boolean) => {
    const markers = useRef<mapboxgl.Marker[]>([]);

    useEffect(() => {
        if (!map) return;

        const removeMarkers = () => {
            markers.current.forEach((marker) => marker.remove());
            markers.current = [];
        };

        const addMarkers = (data: Stop[]) => {
            data.forEach((stop) => {
                const el = document.createElement('div');
                el.className = 'marker';

                el.style.backgroundImage = 'url(/images/tmp-icon.png)';
                el.style.width = '32px';
                el.style.height = '32px';
                el.style.backgroundSize = '100%';
                el.addEventListener('click', () => markerClick(stop));

                const marker = new mapboxgl.Marker(el)
                    .setLngLat([stop.stopLon, stop.stopLat])
                    .addTo(map);

                markers.current.push(marker);
            });
        };



        if (map.getZoom() > 12) {
            removeMarkers();
            addMarkers(data);
        }


        return removeMarkers;
    }, [map, data, markerClick, isStopFocused]);

    return markers;
};

export default useMarkers;
