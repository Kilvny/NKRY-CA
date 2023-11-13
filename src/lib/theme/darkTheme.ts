import { ThemeOptions, createTheme } from "@mui/material";

const darkTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#f0f0f0"
        },
        secondary: {
            main: "#000000",
        },
        background: {
            default: "#0A0A0AD3"
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#9E7900",
            disabled: "#9B9494"
        }
        
    }
})
export default darkTheme;
