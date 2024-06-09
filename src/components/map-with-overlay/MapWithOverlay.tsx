import React, {useCallback, useEffect, useState} from 'react';
import {Route, Stop, Trip} from "../../api/interfaces/apiModels";
import {fetchStopDetailsById} from "../../api/clients/tripClient";
import useMap from "../../hooks/useMap";
import useMarkers from "../../hooks/useMarkers";
// DO NOT REMOVE, MANDATORY DUE TO MAPBOX PROBLEMS
import 'mapbox-gl/dist/mapbox-gl.css';
import {Button} from "@mui/material";
import {ZoomIn, ZoomOut} from "@mui/icons-material";
import mapboxgl from "mapbox-gl";

interface MapWithImageOverlayProps {
    stops: Stop[];
    onStopAdd: (stop: Stop) => void;
    hoveredRouteId: string | null;
    routeInformation: Route | null;
    addRoute: Route | null;
}

const MapWithImageOverlay: React.FC<MapWithImageOverlayProps> = ({
                                                                     stops,
                                                                     onStopAdd,
                                                                     addRoute,
                                                                     hoveredRouteId,
                                                                     routeInformation
                                                                 }) => {
    const [myData, setData] = useState<Stop[]>([]);
    const {mapContainer, map, isStopFocused, setIsStopFocused, getData} = useMap(setData);

    const markerClick = useCallback(async (stop: Stop) => {
        const result = await fetchStopDetailsById(stop.stopId);
        setData([result]);
        setIsStopFocused(true);
        onStopAdd(result);
        drawLines([result]);
    }, [setIsStopFocused, setData, onStopAdd]);

    const markers = useMarkers(map.current, myData, markerClick, isStopFocused);

    useEffect(() => {
        if(!addRoute || !routeInformation) return;

        const coordinates = routeInformation.stops.map(stop => [stop.stopLon, stop.stopLat]);
        if (map.current!.getSource(`route-${routeInformation.trip.tripId}`))
            return;

        map.current!.addSource(`route-${routeInformation.trip.tripId}}`, {
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
            id: `route-${routeInformation.trip.tripId}}`,
            type: 'line',
            source: `route-${routeInformation.trip.tripId}}`,
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': `#${routeInformation.routeColor}`,
                'line-width': 4
            }
        });

    }, [addRoute]);


    const drawLines = useCallback((data: Stop[]) => {
        data.forEach((stop) => {
            stop.trips.forEach((trip) => {
                const coordinates = trip.stops.map(stop => [stop.stopLon, stop.stopLat]);
                if (map.current!.getSource(`route-${trip.tripId}`))
                    return;

                map.current!.addSource(`route-${trip.tripId}}`, {
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
                    id: `route-${trip.tripId}}`,
                    type: 'line',
                    source: `route-${trip.tripId}}`,
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
        });
    }, [map]);

    useEffect(() => {
        highlightRoute();
    }, [routeInformation]);

    const highlightRoute = () => {
        if (routeInformation) {
            console.log(routeInformation)
            let trip = routeInformation.trip;
            const coordinates = routeInformation.stops.map(stop => [stop.stopLon, stop.stopLat]);

            if (map.current!.getSource(`highlighted-route`)) {
                const source = map.current!.getSource(`highlighted-route`);
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
                map.current!.addSource(`highlighted-route`, {
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
                    id: `highlighted-route`,
                    type: 'line',
                    source: `highlighted-route`,
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': `#${routeInformation.routeColor}`,
                        'line-width': 6
                    }
                });
            }
        } else {
            if (map.current!.getSource(`highlighted-route`)) {
                map.current!.removeLayer(`highlighted-route`);
                map.current!.removeSource(`highlighted-route`);
            }
        }
    }

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
        <div style={{height: '90vh', position: 'relative'}}>
            <div ref={mapContainer} style={{height: '100%'}}/>
            <div style={{position: 'absolute', top: '10px', right: '10px', zIndex: 1}}>
                <Button
                    startIcon={<ZoomIn/>}
                    onClick={() => handleZoomIn()}
                    size={'large'}
                />

                <Button
                    startIcon={<ZoomOut/>}
                    onClick={() => handleZoomOut()}
                    size={'large'}
                />
            </div>
        </div>
    );
};

export default MapWithImageOverlay;
