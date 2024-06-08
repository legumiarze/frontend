import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem as MuiMenuItem, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface DropdownMenuItemProps {
    label: string;
    items: string[];
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ label, items }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sx={{ position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Typography variant="button" sx={{ marginRight: '8px' }}>
                    {label}
                </Typography>
                {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMouseLeave}
                MenuListProps={{ onMouseLeave: handleMouseLeave }}
                sx={{ mt: 1 }}
            >
                {items.map((item, index) => (
                    <MuiMenuItem key={index}>{item}</MuiMenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default DropdownMenuItem;
