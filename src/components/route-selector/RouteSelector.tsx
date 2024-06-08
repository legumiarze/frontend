import React, {useState} from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemText,
    CssBaseline, useMediaQuery, Button, TextField, Box, Paper
} from '@mui/material';
import {useTheme, styled} from '@mui/material/styles';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import MapWithImageOverlay from "../map-with-overlay/MapWithOverlay";
import ActivableButton from "../activable-button/ActivableButton";
import colores from "../../themes/colores";
import {RouteButton} from "../route-button/RouteButton";
import {Stop} from "../../api/interfaces/sample";


const drawerWidth = "40%";

const Container = styled(Box)(({theme}) => ({
    display: 'flex',
    height: '92.5vh',
}));

const Sidebar = styled(Box)(({theme}) => ({
    width: drawerWidth,
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

interface RouteSelectorProps {
    data: Stop[];
}

const RouteSelector: React.FC<RouteSelectorProps> = ({data}) => {
    const theme = useTheme();
    const [isBusState, setBusState] = useState(true);

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

    return (
        <Container>
            {sidebarContent}
            <Content>
                <MapWithImageOverlay data={data} />
            </Content>
        </Container>
    );
};

export default RouteSelector;
