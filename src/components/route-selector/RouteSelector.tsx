import React, {useEffect, useState} from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemText,
    CssBaseline, useMediaQuery, Button, TextField, Box, Paper, Drawer
} from '@mui/material';
import {useTheme, styled} from '@mui/material/styles';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import ActivableButton from "../activable-button/ActivableButton";
import colors from "../../themes/colors";
import {RouteButton} from "../route-button/RouteButton";
import {Route, Stop} from "../../api/interfaces/apiModels";
import {MobileSidebar, ScrollableList, Sidebar} from "./components/Styled";

interface RouteSelectorProps {
    routes: Route[];
    onStopAdd: (stop: Stop) => void;
    stops: Stop[];
    onRouteHover: (routeId: string | null) => void;
    setAddRoute: (route: Route | null) => void;
    setRoutes: (routes: Route[]) => void;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({
                                                         routes, onStopAdd, stops, onRouteHover, setAddRoute, setRoutes
                                                     }) => {
    const theme = useTheme();
    const [isBusState, setBusState] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRoutes, setFilteredRoutes] = useState<Route[]>(routes);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        filterRoutes();
    }, [searchTerm, isBusState, routes]);

    const filterRoutes = () => {
        let tmpRoutes = routes;

        if (stops.length > 0) {
            let presentRouteIds = stops.flatMap(stop => stop.trips)
                .flatMap(trip => trip.route)
                .flatMap(route => route.routeId);

            tmpRoutes = routes.filter(route => presentRouteIds.some(routeId => routeId === route.routeId));
        } else {
            tmpRoutes = isBusState ? tmpRoutes.filter(route => route.routeType === 3) : tmpRoutes.filter(route => route.routeType === 2);
        }

        tmpRoutes = tmpRoutes.filter(route =>
            route.routeShortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            route.routeLongName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // @ts-ignore
        setFilteredRoutes([...new Set(tmpRoutes)]);
    };

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
        route.isSelected = true;
        setAddRoute(route);
    };

    const renderList = () => {
        return <List>
            {filteredRoutes.map((route) =>
                <RouteButton
                    key={route.routeId}
                    sx={{backgroundColor: route.isSelected ? colors.selectedListItem : 'white'}}
                    onMouseEnter={() => handleMouseEnter(route.routeId)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleRouteClick(route)}
                >
                    {isBusState ?
                        <DirectionsBusIcon style={{
                            marginRight: theme.spacing(1),
                            backgroundColor: route.routeColor,
                            borderRadius: '25%'
                        }}/> :
                        <TrainIcon style={{
                            marginRight: theme.spacing(1),
                            backgroundColor: route.routeColor,
                            borderRadius: '25%'
                        }}/>}
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </SearchBar>
            {(stops.length <= 0) &&
                <Box display="flex"
                     justifyContent="space-between"
                     mb={2}
                     sx={{
                         '&:hover': {bgcolor: colors.shadowedActiveBg}
                     }}
                >
                    {isBusState ? (
                        <>
                            <ActivableButton
                                variant="outlined"
                                color="primary"
                                text="Autobusy"
                                bgcolor='white'
                                icon={<DirectionsBusIcon/>}
                                hoverBgcolor='white'
                                hoverTextColor='primary'
                                click={() => setBusState(true)}
                            />
                            <ActivableButton
                                variant="contained"
                                color="primary"
                                text="Pociągi"
                                bgcolor={colors.primaryBgColor}
                                icon={<TrainIcon/>}
                                hoverBgcolor='white'
                                hoverTextColor={colors.primaryBgColor}
                                click={() => setBusState(false)}
                            />
                        </>
                    ) : (<>
                        <ActivableButton
                            variant="contained"
                            color="primary"
                            text="Autobusy"
                            bgcolor={colors.primaryBgColor}
                            icon={<DirectionsBusIcon/>}
                            hoverBgcolor='white'
                            hoverTextColor={colors.primaryBgColor}
                            click={() => setBusState(true)}
                        />
                        <ActivableButton
                            variant="outlined"
                            color="primary"
                            text="Pociągi"
                            bgcolor='white'
                            icon={<TrainIcon/>}
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
                    variant='standard'
                    placeholder="Wyszukaj połączenie"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </SearchBar>
            {(stops.length <= 0) &&
                <Box display="flex"
                     justifyContent="space-between"
                     mb={2}
                     sx={{
                         '&:hover': {bgcolor: colors.shadowedActiveBg}
                     }}
                >
                    {isBusState ? (
                        <>
                            <ActivableButton
                                variant="outlined"
                                color="primary"
                                text="Autobusy"
                                bgcolor='white'
                                icon={<DirectionsBusIcon/>}
                                hoverBgcolor='white'
                                hoverTextColor='primary'
                                click={() => setBusState(true)}
                            />
                            <ActivableButton
                                variant="contained"
                                color="primary"
                                text="Pociągi"
                                bgcolor={colors.primaryBgColor}
                                icon={<TrainIcon/>}
                                hoverBgcolor='white'
                                hoverTextColor={colors.primaryBgColor}
                                click={() => setBusState(false)}
                            />
                        </>
                    ) : (<>
                        <ActivableButton
                            variant="contained"
                            color="primary"
                            text="Autobusy"
                            bgcolor={colors.primaryBgColor}
                            icon={<DirectionsBusIcon/>}
                            hoverBgcolor='white'
                            hoverTextColor={colors.primaryBgColor}
                            click={() => setBusState(true)}
                        />
                        <ActivableButton
                            variant="outlined"
                            color="primary"
                            text="Pociągi"
                            bgcolor='white'
                            icon={<TrainIcon/>}
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
        </MobileSidebar>
    );

    const renderSidebar = () => {
        if (!isMobile) return sidebarContent;

        return <Drawer
            variant="temporary"
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{
                width: '100%',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: '100%',
                    boxSizing: 'border-box',
                },
            }}
        >
            {mobileSidebarContent}
        </Drawer>
    };

    return <>
    {renderSidebar()};
        {isMobile ? (<Button
            variant="contained"
            color="primary"
            onClick={toggleDrawer}
            sx={{
                position: 'fixed',
                top: '50%',
                backgroundColor: colors.selectedListItem,
                color: 'white',
                left: drawerOpen ? `calc(80% + 16px)` : '16px',
                transform: 'translateY(-50%)',
                zIndex: 1300,
            }}
        >
            {drawerOpen ? '<' : '>'}
        </Button>) : <></>}
    </>
};

export default RouteSelector;

const SearchBar = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    backgroundColor: '#FFFFFF',
}));
