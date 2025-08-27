import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#ffffff",
            contrastText: "000000"
        }
    }
})

export default theme;