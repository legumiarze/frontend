import RouteSelector from "../../components/route-selector/RouteSelector";
import React, {useEffect, useState} from "react";
import {fetchAllRoutes, fetchStopsByLocation} from "../../api/clients/tripClient";
import {Route, Stop} from "../../api/interfaces/sample";
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

    const fetchRoutes = async ()=> {
        setRoutes(await fetchAllRoutes());
    };

    useEffect(() => {
        fetchRoutes();
    }, []);


    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };


    return (
        <div>
            <Container>
                <CssBaseline/>
                <RouteSelector routes={routes} />
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

                    <MapWithImageOverlay/>
                </Content>
            </Container>
        </div>
    );
}

export default Map;
