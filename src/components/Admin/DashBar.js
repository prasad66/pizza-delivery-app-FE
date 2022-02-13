/* eslint-disable no-unused-vars */
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";
import { IconButton, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

export function DashBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [opened, setopened] = useState(false);
  const handleDrawerOpen = () => {
    setopened(true);
  };
  const handleDrawerClose = () => {
    setopened(false);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [Name] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const Open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  // console.log(user);
  if (!user) {
    history.push("/admin/login");
  }
  return (
    <AppBar
      color="inherit"
      sx={{ backgroundColor: "#f5f5f5" }}
      position="static"
    >
      <Toolbar variant="dense">
        <img src={logo} alt="logo" className="logo" />
        <Typography
          sx={{ fontFamily: "Pacifico", fontSize: { xs: "18px", sm: "26px" } }}
        >
          PVT Pizza
        </Typography>
        <Button
          sx={{ ml: "auto", display: { xs: "none", sm: "block" } }}
          onClick={() => history.push("/admin/menu")}
          variant="text"
        >
          Home
        </Button>
        <Button
          sx={{ display: { xs: "none", sm: "block" } }}
          onClick={handleClickOpen}
          variant="text"
        >
          Contact us
        </Button>

        <IconButton
          sx={{ ml: { xs: "auto", sm: 0 } }}
          className="avatar"
          onClick={handleClick}
          aria-controls={Open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={Open ? "true" : undefined}
        >
          <Avatar
            alt={Name ? Name : localStorage.getItem("Username")}
            src={user.logo}
          />
        </IconButton>
        {/* Popup Menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Open}
          onClose={handleClose1}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
          <MenuItem>
            <Typography>
              {Name ? Name : localStorage.getItem("Username")}
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => history.push("/orderhistory")}>
            Order History
          </MenuItem>
          <MenuItem onClick={() => history.push("/settings")}>
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.clear();
              window.location.reload(false);
              window.location.href = "/";
            }}
          >
            Log Out
          </MenuItem>
        </Menu>
        <IconButton
          sx={{ display: { xs: "block", sm: "none" } }}
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          sx={{
            width: "200px",
            height: "100%",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "200px",
              height: "100%",
              boxSizing: "border-box",
              backgroundColor: "#fff",
              color: "black",
              fontSize: "1em",
              fontFamily: "Pacifico",
            },
          }}
          anchor="right"
          open={opened}
        >
          <IconButton
            color="inherit"
            aria-label="close"
            component="span"
            onClick={handleDrawerClose}
            sx={{ ml: "auto" }}
          >
            <CloseIcon />
          </IconButton>
          <Button onClick={() => history.push("/menu")} variant="text">
            Home
          </Button>
          <Button onClick={handleClickOpen} variant="text">
            Contact us
          </Button>
          <Button onClick={() => history.push("/cart")} variant="text">
            cart
          </Button>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
