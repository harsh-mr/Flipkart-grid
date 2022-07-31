import React, { useState, useContext, useEffect } from "react";

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
  height: 40,
  boxShadow: "none",
  margin: "0",
  [theme.breakpoints.down("sm")]: {
    background: "#2874f0",
    color: "#FFFFFF",
  },
}));

const CustomButtons = () => {
  const [user, setuser] = useState();
  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    setuser(addr);
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x5") {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        // updateButton();
        console.log("here");
        getAddress();
        // window.location.replace(location.pathname)
      });
  }

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

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <Wrapper>
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
      <LoginButton variant="contained" onClick={() => connectWebsite()}>
        {user ? user : "Connect"}
      </LoginButton>

      <Container to="/cart">
        <Badge badgeContent={cartItems?.length} color="secondary">
          <ShoppingCart />
        </Badge>
        <Link
          to="/myorders"
          style={{ marginLeft: 10, textDecoration: "none", color: "white" }}
        >
          My Orders
        </Link>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
    </Wrapper>
  );
};

export default CustomButtons;
