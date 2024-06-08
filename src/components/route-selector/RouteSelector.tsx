import React, {useState} from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemText,
    CssBaseline, useMediaQuery, Button, TextField, Box, Paper, Drawer
} from '@mui/material';
import {useTheme, styled} from '@mui/material/styles';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import MapWithImageOverlay from "../map-with-overlay/MapWithOverlay";
import ActivableButton from "../activable-button/ActivableButton";
import colores from "../../themes/colores";
import {RouteButton} from "../route-button/RouteButton";
import {Stop} from "../../api/interfaces/sample";


const Container = styled(Box)(({theme}) => ({
    display: 'flex',
    height: '92.5vh',
}));

const Sidebar = styled(Box)(({theme}) => ({
    width: '40%',
    backgroundColor: '#1A237E',
    padding: theme.spacing(2),
    color: '#FFFFFF'
}));

const MobileSidebar = styled(Box)(({theme}) => ({
    width: '100%',
    height: "100vh",
    backgroundColor: '#1A237E',
    padding: theme.spacing(2),
    color: '#FFFFFF'
}));

const Content = styled(Box)(({theme}) => ({
    flexGrow: 1,
    padding: theme.spacing(2)
}));

const SearchBar = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    backgroundColor: '#FFFFFF',
}));

const RouteSelector: React.FC = (aa: any) => {
    const theme = useTheme();
    const [isBusState, setBusState] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const menuItems: string[] = [
        'A1 Kraków - Mogilany - Myślenice',
        'A2 Wieliczka - Myślenice',
        'A3 Bochnia - Limanowa',
        'A4 Bochnia - Szczurowa',
        'A5 Brzesko - Wietrzychowice',
        'A6 Wieliczka - Łapanów',
    ];

    const sidebarContent = (
        <Sidebar>
            <SearchBar>
                <TextField
                    variant="outlined"
                    placeholder="Wyszukaj połączenie"
                    fullWidth
                />
            </SearchBar>
            <Box display="flex"
                 justifyContent="space-between"
                 mb={2}
                 sx={{
                     '&:hover': {bgcolor: colores.shadowedActiveBg}
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
                            bgcolor={colores.primaryBgColor}
                            icon={<TrainIcon/>}
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
                        icon={<DirectionsBusIcon/>}
                        hoverBgcolor='white'
                        hoverTextColor={colores.primaryBgColor}
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
            </Box>
            <List>
                {isBusState ?
                    (
                        menuItems.map((text) => (
                            <RouteButton key={text}>
                                <DirectionsBusIcon style={{marginRight: theme.spacing(1)}}/>
                                <ListItemText primary={text}/>
                            </RouteButton>
                        ))) : (
                        menuItems.map((text) => (
                            <RouteButton key={text}>
                                <TrainIcon style={{marginRight: theme.spacing(1)}}/>
                                <ListItemText primary={text}/>
                            </RouteButton>
                        )))}
            </List>
        </Sidebar>
    );

    const mobileSidebarContent = (
        <MobileSidebar>
            <SearchBar>
                <TextField
                    variant="outlined"
                    placeholder="Wyszukaj połączenie"
                    fullWidth
                />
            </SearchBar>
            <Box display="flex"
                 justifyContent="space-between"
                 mb={2}
                 sx={{
                     '&:hover': {bgcolor: colores.shadowedActiveBg}
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
                            bgcolor={colores.primaryBgColor}
                            icon={<TrainIcon/>}
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
                        icon={<DirectionsBusIcon/>}
                        hoverBgcolor='white'
                        hoverTextColor={colores.primaryBgColor}
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
            </Box>
            <List>
                {isBusState ?
                    (
                        menuItems.map((text) => (
                            <RouteButton key={text}>
                                <DirectionsBusIcon style={{marginRight: theme.spacing(1)}}/>
                                <ListItemText primary={text}/>
                            </RouteButton>
                        ))) : (
                        menuItems.map((text) => (
                            <RouteButton key={text}>
                                <TrainIcon style={{marginRight: theme.spacing(1)}}/>
                                <ListItemText primary={text}/>
                            </RouteButton>
                        )))}
            </List>
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

    return (
        <Container>
            <CssBaseline/>
            {renderSidebar()}

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
    );
}

export default RouteSelector;
