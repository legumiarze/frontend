import React, {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {mockRounds, Stop} from "../../api/interfaces/sample";

mapboxgl.accessToken =  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

interface MapWithImageOverlayProps {
    data: Stop[];
}

const MapWithImageOverlay: React.FC<MapWithImageOverlayProps> = ({data}) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [19.9333, 50.0614],
            zoom: 8
        });

        map.current.on('load', () => {
            // console.log(data)

            // mockRounds.forEach((round, index) => {
            //     const coordinates = round.stations.map(stop => [stop.lon, stop.lat]);
            //
            //     // Add a line layer for the route
            //     map.current!.addSource(`route-${index}`, {
            //         type: 'geojson',
            //         data: {
            //             type: 'Feature',
            //             properties: {},
            //             geometry: {
            //                 type: 'LineString',
            //                 coordinates: coordinates
            //             }
            //         }
            //     });
            //
            //     map.current!.addLayer({
            //         id: `route-${index}`,
            //         type: 'line',
            //         source: `route-${index}`,
            //         layout: {
            //             'line-join': 'round',
            //             'line-cap': 'round'
            //         },
            //         paint: {
            //             'line-color': round.meanOfTransport === 'bus' ? '#FF0000' : '#0000FF', // Red for bus, Blue for train
            //             'line-width': 4
            //         }
            //     });
            //
            //     // Add markers for each stop in the round
            //     round.stations.forEach(stop => {
            //         const el = document.createElement('div');
            //         el.className = 'marker';
            //
            //         // Set the icon based on the mean of transport
            //         if (round.meanOfTransport === 'bus') {
            //             el.style.backgroundImage = 'url(/images/tmp-icon.png)'; // Adjust the path to your bus icon
            //         } else {
            //             el.style.backgroundImage = 'url(/images/tmp-icon.png)'; // Adjust the path to your train icon
            //         }
            //
            //         el.style.width = '32px';
            //         el.style.height = '32px';
            //         el.style.backgroundSize = '100%';
            //
            //         new mapboxgl.Marker(el)
            //             .setLngLat([stop.lon, stop.lat])
            //             .setPopup(
            //                 new mapboxgl.Popup({ offset: 25 }).setHTML(
            //                     `<h3>${stop.name}</h3><p>Departures:</p><ul>${stop.departures.map(departure => `<li>${departure.time.toLocaleTimeString()}</li>`).join('')}</ul>`
            //                 )
            //             )
            //             .addTo(map.current!);
            //     });
            // });
        });
    }, []);

    useEffect(() => {
        console.log(data)

        data.forEach(stop => {
            const el = document.createElement('div');
            el.className = 'marker';

            el.style.backgroundImage = 'url(/images/tmp-icon.png)';

            el.style.width = '32px';
            el.style.height = '32px';
            el.style.backgroundSize = '100%';

            new mapboxgl.Marker(el)
                .setLngLat([stop.lon, stop.lat])
                .setPopup(
                    new mapboxgl.Popup({offset: 25}).setHTML('<h3>' + stop.name + '</h3>')
                )
                .addTo(map.current!);
        });
    }, [data]);


    return (
        <div style={{height: '90vh'}}>
            <div ref={mapContainer} style={{height: '100%'}}/>
        </div>
    );
};

export default MapWithImageOverlay;
