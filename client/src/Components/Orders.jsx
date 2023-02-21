import { useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Grid,
  styled,
  FormGroup,
  TextField,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import axios from "axios";
import NFT_Digital_Warranty from "../NFT_Digital_Warranty.json";
import { Link } from "react-router-dom";

const StyledTextField = withStyles({
  root: {
    "& fieldset": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
})(TextField);

const StyledButton1 = withStyles({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    textTransform: "lowercase",
  },
})(Button);

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
  font-size: 14px;
  font-weight: 400;
`;

const Heading = styled(Typography)`
  font-size: 20px;
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
  width: 150px;
  height: 51px;
`;

const Orders = () => {
  const [add, setaddress] = useState();
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

  const resale  = async(e) =>{
    const ethers = require("ethers");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      NFT_Digital_Warranty.address,
      NFT_Digital_Warranty.abi,
      signer
    );
      console.log(add);
      console.log(e);
      console.log(typeof(add));
  var exec  = await contract.TransferNFT(e,add,{value:"0"});
  // await exec.wait();

  console.log(exec);
  }






  useEffect(() => {
    getallwarranties();
  }, []);

  return (
    <>
      <Component container style={{ backgroundColor: "rgb(229 232 237)" }}>
        <LeftComponent item lg={12} md={12} sm={12} xs={12}>
          <Header
            style={{
              margin: "17px",
              boxShadow:
                "box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              borderRadius: " 10px 15px 15px 10px",
            }}
          >
            <Typography style={{ fontWeight: 700, fontSize: 18 }}>
              My Orders
            </Typography>
          </Header>

          {data ? (
            data.map((item, key) => {
              return (
                <SmallComponent
                  style={{
                    margin: "17px",
                    boxShadow:
                      "box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                    borderRadius: " 10px 15px 15px 10px",
                  }}
                >
                  <div style={{ width: "50%", display: "flex" }}>
                    <SmallLeftComponent>
                      <img
                        src={item.image}
                        style={{ height: 180, width: 180 }}
                      />
                    </SmallLeftComponent>
                    <Box style={{ margin: 20 }}>
                      <Heading>{item.name}</Heading>
                      <Typography
                        style={{ margin: "20px 0", overflowWrap: "break-word" }}
                      >
                        <Description
                          component="span"
                          style={{ overflowWrap: "break-word" }}
                        >
                          {item.description}
                        </Description>
                        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      </Typography>
                      <SerialNo component="span">
                        Serial No : {item.serialno}
                      </SerialNo>
                    </Box>
                  </div>
                  <div style={{ display: "", margin: "40px 60px" }}>
                    <div style={{ display: "flex" }}>
                      <StyledButton style={{ marginRight: "0px" }}>
                        <Link
                          to={`/getWarranties/${item.tokenId}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          View Warranty
                        </Link>
                      </StyledButton>

                      <StyledButton style={{ margin: "" }}>
                        <Link
                          to={`/repairlog/${item.tokenId}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                         View Repair Log
                        </Link>
                      </StyledButton>
                    </div>
                    <FormGroup
                      row
                      style={{ marginTop: "20px", marginLeft: "50px" }}
                    >
                      <StyledTextField
                        variant="outlined"
                        placeholder="Receiver metamask address"
                        onChange={(e)=>{setaddress(e.target.value)}}
                      />

                      <StyledButton1 variant="contained" onClick={()=>(resale(item.tokenId))} disableElevation>
                        Sell Warranty
                      </StyledButton1>
                    </FormGroup>
                  </div>
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
