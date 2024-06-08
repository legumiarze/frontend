import React from 'react';
import {Button} from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SvgIcon from "@mui/material/SvgIcon/SvgIcon";

interface ActivableButtonProps {
    variant: 'outlined' | 'contained';
    color: 'primary' | 'secondary' | 'default';
    text: string;
    bgcolor: string;
    hoverBgcolor: string;
    hoverTextColor: string;
    icon: any;
    click: () => void;
}

const ActivableButton: React.FC<ActivableButtonProps> = ({
                                                             variant,
                                                             color,
                                                             text,
                                                             bgcolor,
                                                             hoverBgcolor,
                                                             icon,
                                                             click,
                                                             hoverTextColor
                                                         }) => {
    return (
        <Button
            variant={variant}
            sx={{
                color: color,
                bgcolor: bgcolor,
                '&:hover': {
                    bgcolor: hoverBgcolor,
                    color: hoverTextColor,
                }
            }}
            startIcon={icon}
            fullWidth
            onClick={() => click()}
        >
            {text}
        </Button>
    );
};

export default ActivableButton;
