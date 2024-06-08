import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Stop} from "../../api/interfaces/sample";
import {fetchStopDetailsById, fetchStopsByLocation} from "../../api/clients/tripClient";

mapboxgl.accessToken =  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

const MapWithImageOverlay: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [myData, setData] = useState<Stop[]>([]);
    const markers = useRef<mapboxgl.Marker[]>([]);
    const [isStopFocused, setIsStopFocused] = useState(false);

    const getData = async () => {
        try {
            let mapCoords = map.current!.getBounds();
            const result = await fetchStopsByLocation({
                neLat: mapCoords._ne.lat,
                neLon: mapCoords._ne.lng,
                swLat: mapCoords._sw.lat,
                swLon: mapCoords._sw.lng
            });
            setData(result);
            addMarkers();
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
            map.current!.on('moveend', () => handleZoom());
        });
    }, []);

    useEffect(() => {
        if(isStopFocused) return;
        addMarkers();
    }, [myData]);


    const handleZoom = () => {
        if(isStopFocused) return;
        const zoomLevel = map.current!.getZoom();
        const zoomThreshold = 10;


        if (zoomLevel >= zoomThreshold) {
            getData();
        } else {
            removeMarkers();
        }
    };

    const someFunction = async (stop: Stop) => {
        const result = await fetchStopDetailsById(stop.stopId);
        setData([result]);
        setIsStopFocused(true);
    }

    useEffect(() => {
        drawLines();
    }, [isStopFocused]);


    const drawLines = () => {
        if (myData.length !== 1) return;
        addMarkers()
        myData[0].trips.forEach((trip, index) => {
            const coordinates = trip.stops.map(stop => [stop.stopLon, stop.stopLat]);

            map.current!.addSource(`route-${index}`, {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: coordinates
                    }
                }
            });

            map.current!.addLayer({
                id: `route-${index}`,
                type: 'line',
                source: `route-${index}`,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#FF0000',
                    'line-width': 4
                }
            });

        });
    }

    const addMarkers = () => {
        removeMarkers();

        myData.forEach((stop) => {
            const el = document.createElement('div');
            el.className = 'marker';

            el.style.backgroundImage = 'url(/images/tmp-icon.png)';
            el.style.width = '32px';
            el.style.height = '32px';
            el.style.backgroundSize = '100%';
            el.addEventListener('click', () => someFunction(stop));

            const marker = new mapboxgl.Marker(el)
                .setLngLat([stop.stopLon, stop.stopLat])
                .setPopup(
                    new mapboxgl.Popup({offset: 25}).setHTML(
                        ``
                    )
                )
                .addTo(map.current!);

            markers.current.push(marker);
        });
    };

    const removeMarkers = () => {
        markers.current.forEach((marker) => marker.remove());
        markers.current = [];
    };

    return (
        <div style={{height: '90vh'}}>
            <div ref={mapContainer} style={{height: '100%'}}/>
        </div>
    );
};

export default MapWithImageOverlay;
