import React, {useCallback, useEffect, useState} from 'react';
import {Stop} from "../../api/interfaces/apiModels";
import {fetchStopDetailsById} from "../../api/clients/tripClient";
import useMap from "../../hooks/useMap";
import useMarkers from "../../hooks/useMarkers";
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapWithImageOverlayProps {
    stops: Stop[];
    onStopAdd: (stop: Stop) => void;
}

const MapWithImageOverlay: React.FC<MapWithImageOverlayProps> = ({ stops, onStopAdd }) => {
    const [myData, setData] = useState<Stop[]>([]);
    const { mapContainer, map, isStopFocused, setIsStopFocused, getData } = useMap(setData);

    const markerClick = useCallback(async (stop: Stop) => {
        const result = await fetchStopDetailsById(stop.stopId);
        setData([result]);
        setIsStopFocused(true);
        onStopAdd(result);
        drawLines([result]);
    }, [setIsStopFocused, setData, onStopAdd]);

    const markers = useMarkers(map.current, myData, markerClick, isStopFocused);

    const drawLines = useCallback((data: Stop[]) => {
        data.forEach((stop) => {
            stop.trips.forEach((trip, index) => {
                const coordinates = trip.stops.map(stop => [stop.stopLon, stop.stopLat]);

            if(map.current!.getSource(`route-${trip.tripId}`))
                return;

                if (map.current!.getSource(`route-${trip.tripId}`)) {
                    const source = map.current!.getSource(`route-${trip.tripId}`);
                    if ((source as mapboxgl.GeoJSONSource).setData) {
                        (source as mapboxgl.GeoJSONSource).setData({
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: coordinates
                            }
                        });
                    }
                } else {
                    map.current!.addSource(`route-${trip.tripId}`, {
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
                        id: `route-${trip.tripId}`,
                        type: 'line',
                        source: `route-${trip.tripId}`,
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': `#${trip.route.routeColor}`,
                            'line-width': 4
                        }
                    });
                }
            });
        });
    }, [map]);

    const handleZoomIn = () => {
        if (map.current) {
            map.current.zoomIn();
        }
    };

    const handleZoomOut = () => {
        if (map.current) {
            map.current.zoomOut();
        }
    };

    const toggleMarkers = () => {
        markers.current.forEach(marker => {
            marker.getElement().style.visibility = marker.getElement().style.visibility === 'visible' ? 'hidden' : 'visible';
        });
    };

    useEffect(() => {
        if (map.current) {
            map.current.on('moveend', getData);
        }

        return () => {
            if (map.current) {
                map.current.off('moveend', getData);
            }
        };
    }, [getData]);

    return (
        <div style={{ height: '90vh', position: 'relative' }}>
            <div ref={mapContainer} style={{ height: '100%' }} />
            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
            </div>
        </div>
    );
};

export default MapWithImageOverlay;
