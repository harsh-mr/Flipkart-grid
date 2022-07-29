import { useEffect, useState } from "react";
import React from "react";
import { Box, Card, Typography, Button, Grid, styled } from "@mui/material";
import axios from 'axios';
import NFT_Digital_Warranty from '../NFT_Digital_Warranty.json';
import { Link } from 'react-router-dom';


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

const BottomWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
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
const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Cost = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const MRP = styled(Typography)`
    color: #878787;
`;

const Discount = styled(Typography)`
    color: #388E3C;
`;

const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
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
    let contract = new ethers.Contract(NFT_Digital_Warranty.address, NFT_Digital_Warranty.abi, signer)

    //create an NFT Token
    let nfts = await contract.getMyNFTs()
    let currenttoken = await contract.getCurrentToken();
    // const tokenURI = await contract.tokenURI(5);
    // console.log(tokenURI);
    console.log(currenttoken);
    console.log(nfts);



    var items = await Promise.all(nfts.map(async (i) => {
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
      }

      console.log(item);
      return item;
    }))


    setdata(items);
    console.log(items);
    console.log(data);


  }


  useEffect(() => {
    getallwarranties();
  }, [])





  return (
    <>
      <Component container>
        <LeftComponent item lg={12} md={12} sm={12} xs={12}>
          <Header>
            <Typography style={{ fontWeight: 600, fontSize: 18 }}>
              My Orders
            </Typography>
          </Header>

          {data ?
            (data.map((item, key) => {
              return (
                <div>




                  <BottomWrapper>
                    <Link to={`/getWarranties/${item.tokenId}`}>

                      <Box style={{ margin: 10 }}>
                        <div>{item.name}</div>
                        <div>{item.description}</div>
                        <div>{item.serialno}</div>
                        <SmallText>Seller:RetailNet
                          <span><img src={item.image} style={{ maxWidth: "30%", height: "auto" }} /></span>
                        </SmallText>


                      </Box>



                      <StyledButton variant="contained">View Warranty</StyledButton>
                    </Link>
                  </BottomWrapper>


                </div>


              )
            }
            )
            ) : <div>Loading</div>
          }








        </LeftComponent>
      </Component>
    </>
  );
};

export default Orders;
