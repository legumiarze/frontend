import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

const MapWithImageOverlay: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [19.9333, 50.0614],
            zoom: 8 // Adjust zoom level for a view of the entire Małopolska region
        });

        map.current.on('load', () => {
            map.current!.addSource('overlay', {
                type: 'image',
                url: '/path/to/map.png',
                coordinates: [
                    [19.0, 50.5],  // Top-left corner coordinate of the image
                    [20.5, 50.5],  // Top-right corner coordinate of the image
                    [20.5, 49.0],  // Bottom-right corner coordinate of the image
                    [19.0, 49.0]   // Bottom-left corner coordinate of the image
                ]
            });

            map.current!.addLayer({
                id: 'overlay',
                source: 'overlay',
                type: 'raster',
                paint: {
                    'raster-opacity': 0.85
                }
            });
        });
    }, []);

    return (
        <div style={{ height: '100vh' }}>
            <div ref={mapContainer} style={{ height: '100%' }} />
        </div>
    );
};

export default MapWithImageOverlay;
