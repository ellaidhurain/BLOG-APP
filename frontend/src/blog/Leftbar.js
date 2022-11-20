import React from "react";
import { Box } from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AddBlog from "./AddBlog";
import GroupIcon from '@mui/icons-material/Group';
import { Link } from "react-router-dom";

export const Leftbar = (props) => {

const  {mode,setMode} = props
  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      {" "}
      <Box position="fixed">
      <List  >
        <ListItemButton disablePadding component="a"  href="#home">
          <ListItemIcon>
          <HomeIcon/>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton disablePadding component="a"  href="#home">
          <ListItemIcon>
          <GroupIcon/>
          </ListItemIcon>
          <ListItemText primary="friends" />
        </ListItemButton>

        <ListItemButton disablePadding  LinkComponent={Link}  to="/myBlogs/:id">
          <ListItemIcon>
          <AccountCircleIcon  />
          </ListItemIcon >
          <ListItemText primary="profile" />
        </ListItemButton>

        <ListItemButton disablePadding component="a"   href="#home">
          <ListItemIcon>
          <SettingsIcon/>
          </ListItemIcon>
          <ListItemText primary="settings" />
        </ListItemButton>

        <ListItemButton disablePadding component="a"   href="#home">
          <ListItemIcon>
          <DarkModeIcon/>
          </ListItemIcon>
          <Switch onChange={()=>setMode(mode === "light" ? "dark" : "light")}/>
        </ListItemButton>
      </List>

     </Box>
     <AddBlog />
    </Box>
  );
};
