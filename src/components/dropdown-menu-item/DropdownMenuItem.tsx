import React, {useState} from 'react';
import {Box, Typography, Menu, MenuItem, IconButton} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface DropdownMenuItemProps {
    label: string;
    items: string[];
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({label, items}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sx={{position: 'relative'}}>
            <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                <Typography variant="button" sx={{marginRight: 1}}>
                    {label}
                </Typography>
                <IconButton size="small" sx={{p: 0}}>
                    {open ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMouseLeave}
                MenuListProps={{onMouseLeave: handleMouseLeave}}
                sx={{mt: 1}}
            >
                {items.map((item, index) => (
                    <MenuItem key={index}>{item}</MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default DropdownMenuItem;
