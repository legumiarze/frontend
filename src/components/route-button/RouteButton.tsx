import { Button, styled, css } from '@mui/material';

export const RouteButton = styled(Button)(({ theme }) => ({
    fontSize: '22px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    padding: '1em 2em',
    marginBottom: '2vh',
    width: '100%',
    textAlign: 'center',
    color: 'primary',
    background: 'linear-gradient(to left, white 50%, #cbcbcb 50%) right',
    backgroundSize: '200%',
    transition: 'background-position 0.5s ease-out',
    '&:hover': {
        backgroundPosition: 'left',
    },
}));
