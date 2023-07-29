import { ThemeOptions, createTheme } from "@mui/material";

const lightTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: "#f0f0f0"
        },
        secondary: {
            main: "#008669"
        },
        background: {
            default: "#fafafa"
        },
        text: {
            primary: "#1A1A1A",
            secondary: "#4E0909",
            disabled: "#9B9494"
        }
    }
    
})

export default lightTheme