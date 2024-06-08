import React from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemText,
    CssBaseline, useMediaQuery, Button, TextField, Box, Paper
} from '@mui/material';
import {useTheme, styled} from '@mui/material/styles';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import MapWithImageOverlay from "../map-with-overlay/MapWithOverlay";

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

const RouteButton = styled(Button)(({theme}) => ({
    backgroundColor: '#FFFFFF',
    color: '#1A237E',
    margin: theme.spacing(1, 0),
    textTransform: 'none',
    justifyContent: 'flex-start',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
}));

const RouteSelector: React.FC = (props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Button variant="outlined" color="inherit" startIcon={<DirectionsBusIcon/>} fullWidth>
                    Autobusy
                </Button>
                <Button variant="contained" color="primary" startIcon={<TrainIcon/>} fullWidth>
                    Pociągi
                </Button>
            </Box>
            <List>
                {menuItems.map((text) => (
                    <RouteButton key={text}>
                        <DirectionsBusIcon style={{marginRight: theme.spacing(1)}}/>
                        <ListItemText primary={text}/>
                    </RouteButton>
                ))}
            </List>
        </Sidebar>
    );

    return (
        <Container>
            {sidebarContent}
            <Content>
                <MapWithImageOverlay />
            </Content>
        </Container>
    );
};

export default RouteSelector;
