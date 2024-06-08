import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1A237E',
        },
        secondary: {
            main: '#FFFFFF',
        },
        background: {
            default: '#E3F2FD',
        },
        text: {
            primary: '#000000',
            secondary: '#FFFFFF',
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h6: {
            fontWeight: 700,
        },
        button: {
            textTransform: 'none',
            fontWeight: 700,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    justifyContent: 'space-between',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    width: 240,
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    color: '#000000',
                    '&.Mui-selected': {
                        backgroundColor: '#FFFFFF',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 4,
                },
            },
        },
    },
});

export default theme;
