import React, { useState, useContext } from "react";

import { Box, Typography, Badge, Button, styled } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { LoginContext } from "../../context/ContextProvider";
import { useSelector } from "react-redux";

import Profile from "./Profile";
import LoginDialog from "../Login/LoginDialog";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Container = styled(Link)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  margin: "0 3% 0 auto",
  display: "flex",
  "& > *": {
    marginRight: "40px !important",
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: 12,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      color: "#2874f0",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginTop: 10,
    },
  },
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: "#2874f0",
  background: "#FFFFFF",
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 2,
  padding: "5px 30px",
  height: 36,
  boxShadow: "none",
  [theme.breakpoints.down("sm")]: {
    background: "#2874f0",
    color: "#FFFFFF",
  },
}));

const CustomButtons = () => {
  let add = "/checkProductID";
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(LoginContext);

  const cartDetails = useSelector((state) => state.cart);
  const { cartItems } = cartDetails;

  const openDialog = () => {
    setOpen(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const Open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <LoginButton variant="contained" onClick={() => openDialog()}>
          Login
        </LoginButton>
      )}
      {/* <LoginButton>
        <Link to={add} style={{ textDecoration: "none", fontSize: "14px" }}>
          Add Products
        </Link>
      </LoginButton> */}
      <LoginButton
        id="basic-button"
        aria-controls={Open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={Open ? "true" : undefined}
        onClick={handleClick}
      >
        For Seller
      </LoginButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to="/addnft/:productID"
            style={{ textDecoration: "none", color: "black" }}
          >
            Add NFT
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to="/addproduct"
            style={{ textDecoration: "none", color: "black" }}
          >
            Add Product
          </Link>
        </MenuItem>
      </Menu>
      {/* <Typography style={{ marginTop: 3 }}>More</Typography> */}

      <Container to="/cart">
        <Badge badgeContent={cartItems?.length} color="secondary">
          <ShoppingCart />
        </Badge>
        <Typography style={{ marginLeft: 10 }}>Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
    </Wrapper>
  );
};

export default CustomButtons;
