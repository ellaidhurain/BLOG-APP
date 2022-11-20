import React, { useState } from "react";
import { AppBar, styled, alpha, Grid } from "@mui/material";
import { Box, TextField, Stack, ButtonGroup } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import CabinIcon from "@mui/icons-material/Cabin";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../login/Protect";
import InputAdornment from "@mui/material/InputAdornment";
import DirectionsIcon from "@mui/icons-material/Directions";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

const MyToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});


const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export const Navbar = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [open, setOpen] = useState(false);

  const logout = async () => {
    const res = await axios
      .post("http://localhost:5000/api/user/logout")
      .catch((err) => console.log(err))
      .then(() => {
        navigate("/login");
      });

    if (res.status == 200) {
      return res;
    }
    return new Error("Unable TO Logout. Please try again");
  };

  // const handleLogout = () => {
  //   logout().then(() => dispatch(authActions.logout()));
  // };

  return (
    <AppBar position="sticky">
      <MyToolbar>
        <CabinIcon sx={{ display: { xs: "block", sm: "none" } }} />
        <Typography
          px={2}
          variant="h5"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Bloggie
        </Typography>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
        
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search here..."
            inputProps={{ "aria-label": "search blogs..." }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          
        </Paper>
        <Icons size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error" type="button">
            <MailIcon />
          </Badge>
          <Badge badgeContent={17} color="error" type="button">
            <NotificationsIcon />
          </Badge>
          <Avatar
            alt="Remy Sharp"
            src="/static/use2.png"
            onClick={(e) => setOpen(true)}
          />
        </Icons>

        <UserBox>
          <Avatar
            alt="Remy Sharp"
            src="/static/use2.png"
            onClick={(e) => setOpen(true)}
          />
          <Typography>ellai</Typography>
        </UserBox>
      </MyToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={(e) => setOpen(false)}>
          {" "}
          <IconButton>
            <PersonIcon />
          </IconButton>
          Profile
        </MenuItem>
        <MenuItem onClick={logout}>
          <IconButton>
            <LogoutIcon />
          </IconButton>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
