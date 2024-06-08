import React from 'react';
import Typography from '@mui/material/Typography';
import DropdownMenuItem from "../../dropdown-menu-item/DropdownMenuItem";

const NavbarItems: React.FC = () => {
    const menuItems = [
        { label: 'AKTUALNOŚCI', items: [] },
        { label: 'ROZKŁAD JAZDY', items: ['ROZKŁADY', 'MAPA'] },
        { label: 'DLA PASAŻERA', items: [] },
        { label: 'O SPÓŁCE', items: [] },
        { label: 'KONTAKT', items: [] },
        { label: 'REKLAMA', items: [] },
        { label: 'INWESTYCJE', items: [] },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            {menuItems.map((item, index) => (
                item.items.length > 0 ? (
                    <DropdownMenuItem key={index} label={item.label} items={item.items} />
                ) : (
                    <Typography key={index} variant="button" sx={{ margin: '0 20px' }}>
                        {item.label}
                    </Typography>
                )
            ))}
        </div>
    );
};

export default NavbarItems;
