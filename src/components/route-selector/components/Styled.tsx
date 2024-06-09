import {styled} from "@mui/material/styles";
import {Box, Paper} from "@mui/material";

const Sidebar = styled(Box)(({ theme }) => ({
    width: '40%',
    height: "93vh",
    backgroundColor: '#1A237E',
    padding: theme.spacing(2),
    color: '#FFFFFF'
}));

const MobileSidebar = styled(Box)(({ theme }) => ({
    width: '100%',
    height: "100vh",
    backgroundColor: '#1A237E',
    padding: theme.spacing(2),
    color: '#FFFFFF'
}));

const SearchBar = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    backgroundColor: '#FFFFFF',
}));

const ScrollableList = styled(Box)(({ theme }) => ({
    overflowY: 'auto',
    maxHeight: '65vh',
    paddingRight: "15px"
}));


export {Sidebar, MobileSidebar, SearchBar, ScrollableList};
