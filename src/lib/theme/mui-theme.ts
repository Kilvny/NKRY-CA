// mui-theme.js
import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme();

const themeVariables = {
  // Extract the theme variables you want to use in SCSS
  primaryColor: muiTheme.palette.primary.main,
  secondaryColor: muiTheme.palette.secondary.main,
  // Add more variables as needed
};

export default themeVariables;
