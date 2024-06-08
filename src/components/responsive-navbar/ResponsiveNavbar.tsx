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
import { useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Image } from 'mui-image';

const ResponsiveNavbar: React.FC = (props) => {
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

    const menuItems: string[] = [
        'AKTUALNOŚCI',
        'ROZKŁAD JAZDY',
        'DLA PASAŻERA',
        'O SPÓŁCE',
        'KONTAKT',
        'REKLAMA',
        'INWESTYCJE'
    ];

    const drawer = (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {menuItems.map((text) => (
                    <ListItem button key={text} style={{ justifyContent: 'center' }}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            style={{ marginRight: theme.spacing(2) }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Image src={"/images/koleje-malopolskie-logo.png"} style={{ width: '200px' }} />
                    {!isMobile && (
                        // <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                            menuItems.map((item) => (
                                <Typography
                                    variant="button"
                                    style={{ margin: '0 10px' }}
                                    key={item}
                                >
                                    {item}
                                </Typography>
                            ))
                        // </div>
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
