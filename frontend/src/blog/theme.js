import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { blue } from '@mui/material/colors';


export const theme = createTheme({
    //we can store color in palatte
 palette:{
    primary:{
       
        main:  blue[500],
    },
    secondary:{
        main: blue[500],
    },
    //custom color
    otherColor:{
        main: orange[500],
    }
 },
 breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

//theme variables
//.palette
// .typography
// .spacing
// .breakpoints
// .zIndex
// .transitions
// .components
