import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

interface DrawerMenuProps {
    drawerOpen: boolean;
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ drawerOpen, toggleDrawer }) => {
    return (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <div
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                </List>
            </div>
        </Drawer>
    );
};

export default DrawerMenu;
