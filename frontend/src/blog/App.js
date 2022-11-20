import React, { useState } from "react";
import { Navbar } from "./Navbar";
import Post from "./Post";
import { Leftbar } from "./Leftbar";
import {
  Box,
  Stack,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Rightbar from "./Rightbar";

export const App = (props) => {
 
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Leftbar setMode={setMode} mode={mode}/>
        <Post />
        <Rightbar />
      </Stack>
    </Box>
    </ThemeProvider>
  );
};

//Box -div
//Container -having default margin and padding
