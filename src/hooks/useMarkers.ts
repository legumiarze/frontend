import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import {Stop} from "../api/interfaces/apiModels";
// DO NOT REMOVE, MANDATORY DUE TO MAPBOX PROBLEMS
import 'mapbox-gl/dist/mapbox-gl.css';

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

                let icon = (stop.locationType === "0") ? 'autobus' : 'train';

                el.style.backgroundImage = `url(/images/${icon}_pin.svg)`;
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


        if (map.getZoom() > 13) {
            removeMarkers();
            addMarkers(data);
        }


        return removeMarkers;
    }, [map, data, markerClick, isStopFocused]);

    return markers;
};


export default useMarkers;
