import RouteSelector from "../../components/route-selector/RouteSelector";
import React, {useEffect, useState} from "react";
import {fetchAllRoutes, fetchRouteInfo} from "../../api/clients/tripClient";
import {Route, Stop, Trip} from "../../api/interfaces/apiModels";
import {styled} from "@mui/material/styles";
import {Box, Button, CssBaseline, useMediaQuery} from "@mui/material";
import MapWithImageOverlay from "../../components/map-with-overlay/MapWithOverlay";
import theme from "../../themes/theme";

const Container = styled(Box)(({theme}) => ({
    display: 'flex',
    height: '92.5vh',
}));

const Content = styled(Box)(({theme}) => ({
    flexGrow: 1,
    padding: theme.spacing(2)
}));


const Map = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [stops, setStops] = useState<Stop[]>([]);
    const [routeInformation, setRouteInformation] = useState<Route | null>(null);
    const [hoveredRouteId, setHoveredRouteId] = useState<string | null>(null);
    const [addRoute, setAddRoute] = useState<Route | null>(null);

    const fetchRoutes = async () => {
        setRoutes(await fetchAllRoutes());
    };

    const addRouteAndRenderIt = (route : Route | null) => {
        setAddRoute(route);

        if(route) {
            setRoutes([...routes, route]);
        }
    }

    const retrieveRouteInformation = async () => {
        if(!hoveredRouteId) return;

        setRouteInformation(await fetchRouteInfo(hoveredRouteId));
    };

    const addStop = (stop: Stop) => {
        setStops(prevStops => [...prevStops, stop]);
    }

    useEffect(() => {
        fetchRoutes();
    }, []);

    useEffect(() => {
        if(!hoveredRouteId) {
            setRouteInformation(null);
            return;
        }

        retrieveRouteInformation();
    }, [hoveredRouteId]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };


    return (
        <div>
            <Container>
                <CssBaseline/>
                <RouteSelector
                    setAddRoute={addRouteAndRenderIt}
                    routes={routes}
                    setRoutes={setRoutes}
                    onStopAdd={addStop}
                    stops={stops}
                    onRouteHover={setHoveredRouteId}
                />

                <Content>
                    {isMobile ? (<Button
                        variant="contained"
                        color="primary"
                        onClick={toggleDrawer}
                        sx={{
                            position: 'fixed',
                            top: '50%',
                            left: drawerOpen ? `calc(58% + 16px)` : '16px',
                            transform: 'translateY(-50%)',
                            zIndex: 1300,
                        }}
                    >
                        {drawerOpen ? '<' : '>'}
                    </Button>) : <></>}

                    <MapWithImageOverlay
                        routeInformation={routeInformation}
                        stops={stops}
                        onStopAdd={addStop}
                        addRoute={addRoute}
                        hoveredRouteId={hoveredRouteId} />
                </Content>
            </Container>
        </div>
    );
}

export default Map;
