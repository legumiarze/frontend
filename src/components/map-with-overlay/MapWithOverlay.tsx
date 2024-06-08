import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Stop} from "../../api/interfaces/apiModels";
import {fetchStopDetailsById, fetchStopsByLocation} from "../../api/clients/tripClient";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

interface MapWithImageOverlayProps {
    stops: Stop[];
    onStopAdd: (stop: Stop) => void;
}

const MapWithImageOverlay: React.FC<MapWithImageOverlayProps> = ({stops, onStopAdd}) => {
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
            updateMarkers();
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
        updateMarkers();
    }, [myData]);


    const handleZoom = () => {
        if (isStopFocused) return;

        const zoomLevel = map.current!.getZoom();
        const zoomThreshold = 10;


        if (zoomLevel >= zoomThreshold) {
            getData();
        } else {
            removeMarkers();
        }
    };

    const markerClick = async (stop: Stop) => {
        const result = await fetchStopDetailsById(stop.stopId);
        setData([result]);
        setIsStopFocused(true);
        onStopAdd(result);
        drawLine(result);
    }

    useEffect(() => {
        drawLines();
    }, [isStopFocused]);

    const drawLine = (stop: Stop) => {
        stop.trips.forEach((trip, index) => {
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
                    'line-color': `#${trip.route.routeColor}`,
                    'line-width': 4
                }
            });

        });
    }

    const drawLines = () => {
        if (myData.length !== 1) return;

        updateMarkers()
        drawLine(myData[0]);

    }

    const updateMarkers = () => {
        removeMarkers();
        addMarkers(myData);
    }

    const addMarkers = (data: Stop[]) => {
        if(isStopFocused) {
            let actualStopsInTrip: Stop[] = stops.flatMap(stop => stop.trips.flatMap(trip => trip.stops));
            data = data.filter(stop => actualStopsInTrip.some(actualStop => actualStop.stopId === stop.stopId))
        }

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
