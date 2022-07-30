import { useEffect, useState } from "react";
import React from "react";
import { Box, Card, Typography, Button, Grid, styled } from "@mui/material";
import axios from "axios";
import NFT_Digital_Warranty from "../NFT_Digital_Warranty.json";
import { Link } from "react-router-dom";

const SmallComponent = styled(Card)`
  border-top: 1px solid #f0f0f0;
  border-radius: 0px;
  display: flex;
`;

const SmallLeftComponent = styled(Box)`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const Description = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const SerialNo = styled(Typography)`
  color: #878787;
`;

const Component = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    padding: "15px 0",
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down("sm")]: {
    marginBottom: 15,
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

const Orders = () => {
  var transaction;
  const [data, setdata] = useState([]);
  var getallwarranties = async () => {
    const ethers = require("ethers");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      NFT_Digital_Warranty.address,
      NFT_Digital_Warranty.abi,
      signer
    );

    //create an NFT Token
    let nfts = await contract.getMyNFTs();
    let currenttoken = await contract.getCurrentToken();
    // const tokenURI = await contract.tokenURI(5);
    // console.log(tokenURI);
    console.log(currenttoken);
    console.log(nfts);

    var items = await Promise.all(
      nfts.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let item = {
          serialno: i.serialNo,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };

        console.log(item);
        return item;
      })
    );

    setdata(items);
    console.log(items);
    console.log(data);
  };

  useEffect(() => {
    getallwarranties();
  }, []);

  return (
    <>
      <Component container>
        <LeftComponent item lg={12} md={12} sm={12} xs={12}>
          <Header>
            <Typography style={{ fontWeight: 600, fontSize: 18 }}>
              My Orders
            </Typography>
          </Header>

          {data ? (
            data.map((item, key) => {
              return (
                <SmallComponent>
                  <SmallLeftComponent>
                    <img src={item.image} style={{ height: 180, width: 180 }} />
                  </SmallLeftComponent>
                  <Box style={{ margin: 20 }}>
                    <Typography>{item.name}</Typography>
                    {/* <SmallText>
                      Seller:RetailNet
                      <span>
                        <img
                          src={fassured}
                          style={{ width: 50, marginLeft: 10 }}
                        />
                      </span>
                    </SmallText> */}
                    <Typography style={{ margin: "20px 0" }}>
                      <Description component="span">
                        {item.description}
                      </Description>
                      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                    </Typography>
                    <SerialNo component="span">{item.serialno}</SerialNo>
                  </Box>
                  <StyledButton style={{ margin: "70px 0px 0px 600px" }}>
                    <Link
                      to={`/getWarranties/${item.tokenId}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      View Warranty
                    </Link>
                  </StyledButton>
                </SmallComponent>
              );
            })
          ) : (
            <div>Loading</div>
          )}
        </LeftComponent>
      </Component>
    </>
  );
};

export default Orders;
