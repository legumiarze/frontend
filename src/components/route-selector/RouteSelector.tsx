import React, {useEffect, useState} from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemText,
    CssBaseline, useMediaQuery, Button, TextField, Box, Paper, Drawer
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import ActivableButton from "../activable-button/ActivableButton";
import colores from "../../themes/colores";
import { RouteButton } from "../route-button/RouteButton";
import { Route, Stop } from "../../api/interfaces/apiModels";
import {MobileSidebar, ScrollableList, SearchBar, Sidebar} from "./components/Styled";

interface RouteSelectorProps {
    routes: Route[];
    onStopAdd: (stop: Stop) => void;
    stops: Stop[];
    onRouteHover: (routeId: string | null) => void;
    setAddRoute: (route: Route | null) => void;
    setRoutes: (routes: Route[]) => void;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({ routes, onStopAdd, stops, onRouteHover, setAddRoute, setRoutes }) => {
    const theme = useTheme();
    const [isBusState, setBusState] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleMouseEnter = (routeId: string) => {
        onRouteHover(routeId);
    };

    const handleMouseLeave = () => {
        onRouteHover(null);
    };

    const handleRouteClick = (route: Route) => {
        setAddRoute(route);
        setRoutes([...routes, route]);
    }

    const renderList = () => {
        let tmpRoutes = routes;

        if (stops.length > 0 && routes.length > 0) {
            let presentRouteIds = stops.flatMap(stop => stop.trips)
                .flatMap(trip => trip.route)
                .flatMap(route => route.routeId);

            tmpRoutes = routes.filter(route => presentRouteIds.some(routeId => routeId === route.routeId));
        } else {
            tmpRoutes = isBusState ? tmpRoutes.filter(route => route.routeType === 3) : tmpRoutes.filter(route => route.routeType === 2);
        }

        return <List>
            {tmpRoutes.map((route) =>
                <RouteButton
                    key={route.routeId}
                    onMouseEnter={() => handleMouseEnter(route.routeId)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleRouteClick(route)}
                >
                    {isBusState ?
                        <DirectionsBusIcon style={{ marginRight: theme.spacing(1), backgroundColor: route.routeColor, borderRadius: '25%' }} /> :
                        <TrainIcon style={{ marginRight: theme.spacing(1),  backgroundColor: route.routeColor, borderRadius: '25%' }} />}
                    <ListItemText
                        primary={
                            <Typography textAlign='left'>
                                {route.routeShortName + " " + route.routeLongName}
                            </Typography>
                        }
                    />
                </RouteButton>)
            }
        </List>
    };

    const sidebarContent = (
        <Sidebar>
            <SearchBar>
                <TextField
                    variant='standard'
                    placeholder="Wyszukaj połączenie"
                    fullWidth
                />
            </SearchBar>
            {stops.length <= 0 &&
                <Box display="flex"
                     justifyContent="space-between"
                     mb={2}
                     sx={{
                         '&:hover': { bgcolor: colores.shadowedActiveBg }
                     }}
                >
                    {isBusState ? (
                        <>
                            <ActivableButton
                                variant="outlined"
                                color="primary"
                                text="Autobusy"
                                bgcolor='white'
                                icon={<DirectionsBusIcon />}
                                hoverBgcolor='white'
                                hoverTextColor='primary'
                                click={() => setBusState(true)}
                            />
                            <ActivableButton
                                variant="contained"
                                color="primary"
                                text="Pociągi"
                                bgcolor={colores.primaryBgColor}
                                icon={<TrainIcon />}
                                hoverBgcolor='white'
                                hoverTextColor={colores.primaryBgColor}
                                click={() => setBusState(false)}
                            />
                        </>
                    ) : (<>
                        <ActivableButton
                            variant="contained"
                            color="primary"
                            text="Autobusy"
                            bgcolor={colores.primaryBgColor}
                            icon={<DirectionsBusIcon />}
                            hoverBgcolor='white'
                            hoverTextColor={colores.primaryBgColor}
                            click={() => setBusState(true)}
                        />
                        <ActivableButton
                            variant="outlined"
                            color="primary"
                            text="Pociągi"
                            bgcolor='white'
                            icon={<TrainIcon />}
                            hoverBgcolor='white'
                            hoverTextColor='primary'
                            click={() => setBusState(false)}
                        />
                    </>)
                    }
                </Box>}
            <ScrollableList>
                {renderList()}
            </ScrollableList>
        </Sidebar>
    );

    const mobileSidebarContent = (
        <MobileSidebar>
            <SearchBar>
                <TextField
                    placeholder="Wyszukaj połączenie"
                    fullWidth
                />
            </SearchBar>
            <Box display="flex"
                 justifyContent="space-between"
                 mb={2}
                 sx={{
                     '&:hover': { bgcolor: colores.shadowedActiveBg }
                 }}
            >
                {isBusState ? (
                    <>
                        <ActivableButton
                            variant="outlined"
                            color="primary"
                            text="Autobusy"
                            bgcolor='white'
                            icon={<DirectionsBusIcon />}
                            hoverBgcolor='white'
                            hoverTextColor='primary'
                            click={() => setBusState(true)}
                        />
                        <ActivableButton
                            variant="contained"
                            color="primary"
                            text="Pociągi"
                            bgcolor={colores.primaryBgColor}
                            icon={<TrainIcon />}
                            hoverBgcolor='white'
                            hoverTextColor={colores.primaryBgColor}
                            click={() => setBusState(false)}
                        />
                    </>
                ) : (<>
                    <ActivableButton
                        variant="contained"
                        color="primary"
                        text="Autobusy"
                        bgcolor={colores.primaryBgColor}
                        icon={<DirectionsBusIcon />}
                        hoverBgcolor='white'
                        hoverTextColor={colores.primaryBgColor}
                        click={() => setBusState(true)}
                    />
                    <ActivableButton
                        variant="outlined"
                        color="primary"
                        text="Pociągi"
                        bgcolor='white'
                        icon={<TrainIcon />}
                        hoverBgcolor='white'
                        hoverTextColor='primary'
                        click={() => setBusState(false)}
                    />
                </>)
                }
            </Box>
            <ScrollableList>
                <List>
                    {routes.map((route) =>
                        <RouteButton
                            key={route.routeId}
                            onMouseEnter={() => handleMouseEnter(route.routeId)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <DirectionsBusIcon style={{ marginRight: theme.spacing(1) }} />
                            <ListItemText
                                primary={
                                    <Typography textAlign='left'>
                                        {route.routeShortName + " " + route.routeLongName}
                                    </Typography>
                                }
                            />
                        </RouteButton>)
                    }
                </List>
            </ScrollableList>
        </MobileSidebar>
    );

    const renderSidebar = () => {
        if (!isMobile) return sidebarContent;

        return <Drawer
            variant="persistent"
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{
                width: isMobile ? '60%' : '40%',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: '60%',
                    boxSizing: 'border-box',
                },
            }}
        >
            {mobileSidebarContent}
        </Drawer>
    };

    return renderSidebar();
}

export default RouteSelector;
