import React, {useEffect, useRef, useState} from 'react';
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
            console.log(data);
            data.forEach((stop) => {
                const el = document.createElement('div');
                el.className = 'marker';

                // let icon = (stop.trips[0].route.routeType === 3) ? 'bus' : 'train';
                let icon = 'autobus';

                el.style.backgroundImage = `url(/images/${icon}_pin.png)`;
                el.style.width = '32px';
                el.style.height = '32px';
                el.style.backgroundSize = '100%';

                const marker = new mapboxgl.Marker(el);

                el.addEventListener('click', () => markerClick(stop));

                const popup = new mapboxgl.Popup().setHTML('<h3>' + stop.stopName + '</h3>')
                const markerDiv = marker.getElement()
                markerDiv.addEventListener('mouseenter', () => {
                    marker.setPopup(popup)
                    marker.togglePopup()
                })
                markerDiv.addEventListener('mouseleave', () => marker.togglePopup())

               marker
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
