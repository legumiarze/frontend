import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import useDrawer from "../../hooks/useDrawer";
import useIsMobile from "../../hooks/useIsMobile";
import NavbarItems from "./components/NavbarItems";
import DrawerMenu from "./components/DrawerMenu";

const ResponsiveNavbar: React.FC = () => {
    const { drawerOpen, toggleDrawer } = useDrawer();
    const isMobile = useIsMobile();

    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src="/images/koleje-malopolskie-logo.png" alt="Logo" style={{ width: '200px', marginLeft: "5%" }} />
                    {isMobile ? (
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ marginRight: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <NavbarItems />
                    )}
                </Toolbar>
            </AppBar>
            <DrawerMenu drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        </div>
    );
};

export default ResponsiveNavbar;
