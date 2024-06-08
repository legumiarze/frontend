import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DropdownMenuItem from "../dropdown-menu-item/DropdownMenuItem";

const ResponsiveNavbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setDrawerOpen(open);
        };

    const drawer = (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {/*{menuItems.map((text) => (*/}
                {/*    <ListItem button key={text} style={{justifyContent: 'center'}}>*/}
                {/*        <ListItemText primary={text}/>*/}
                {/*    </ListItem>*/}
                {/*))}*/}
            </List>
        </div>
    );

    return (
        <div>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <img src={"/images/koleje-malopolskie-logo.png"} style={{width: '200px', marginLeft: "5%"}}/>
                    {isMobile ? (
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            style={{marginRight: theme.spacing(2)}}
                        >
                            <MenuIcon/>
                        </IconButton>
                    ) : (
                        <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}>
                            <Typography
                                variant="button"
                                style={{margin: '0 20px'}}
                            >
                                AKTUALNOŚCI
                            </Typography>

                            <DropdownMenuItem label="ROZKŁAD JAZDY" items={['ROZKŁADY', 'MAPA']} />

                            <Typography
                                variant="button"
                                style={{margin: '0 20px'}}
                            >
                                DLA PASAŻERA
                            </Typography>
                            <Typography
                                variant="button"
                                style={{margin: '0 20px'}}
                            >
                                O SPÓŁCE
                            </Typography>
                            <Typography
                                variant="button"
                                style={{margin: '0 20px'}}
                            >
                                KONTAKT
                            </Typography>
                            <Typography
                                variant="button"
                                style={{margin: '0 20px'}}
                            >
                                REKLAMA
                            </Typography>
                            <Typography
                                variant="button"
                                style={{margin: '0 20px'}}
                            >
                                INWESTYCJE
                            </Typography>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawer}
            </Drawer>
        </div>
    );
};

export default ResponsiveNavbar;
