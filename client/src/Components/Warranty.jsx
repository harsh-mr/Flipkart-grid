import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NFT_Digital_Warranty from "../NFT_Digital_Warranty.json";
import { Box, Typography, Button, Grid, styled } from "@mui/material";
import axios from "axios";

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
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

const Warranty = () => {
  const { tokenId } = useParams();

  const [data, setdata] = useState();
  const [image, setimage] = useState();
  const [burnt, setburnt] = useState(false);

  var sale = async () => {
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
    let nft = await contract.executeSale(tokenId, 20, { value: "0" });
  };

  var verify = async () => {
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
    // let nft =  await contract.executeSale(tokenId,50,{value:'0'});
    let burn;

    try {
      burn = await contract.BurnNFT(tokenId, { value: "0" });
      console.log(burn);
      setburnt(true);
    } catch (err) {
      console.log(err);
    }

    if (!burn) {
      let nft = await contract.getListedTokenForId(tokenId);
      const tokenURI = await contract.tokenURI(tokenId);
      let meta = await axios.get(tokenURI);
      setimage(meta.data.image);
      setdata(nft);
      console.log(meta);
      console.log(nft);
    }
  };

  var getWarranty = async () => {
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
    try {
      let nft = await contract.getListedTokenForId(tokenId);
      if (nft.owner === "0x0000000000000000000000000000000000000000") {
        setburnt(true);
      }
      console.log(nft);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWarranty();
  }, []);

  var seconds = Date.now() / 1000;

  return (
    <>
      <div>
        {!data ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            {burnt ? (
              <div>sorry expired</div>
            ) : (
              <div>
                <button style={{ fontSize: "40px" }} onClick={sale}>
                  sale
                </button>
                <button style={{ fontSize: "40px" }} onClick={verify}>
                  check validity
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            data fetched
            <div>
              <Component container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                  <Header>
                    <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                      Warranty and Services
                    </Typography>
                  </Header>
                </LeftComponent>
                <div
                  style={{
                    border: "3px solid black",
                    height: "60vh",
                    width: "65%",
                    margin: "30px auto",
                    padding: "20px",
                    background: "#f8f8f8",
                  }}
                >
                  <h2 style={{ margin: "0 auto", textAlign: "center" }}>
                    Certificate of Warranty
                  </h2>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p style={{ color: "#8d8d8d", fontSize: "14px" }}>
                      Serial Number:{" "}
                      <span
                        style={{
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {data.serialNo}
                      </span>
                    </p>
                    <p style={{ color: "#8d8d8d", fontSize: "14px" }}>
                      Warranty Status :{" "}
                      <span
                        style={{
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        In warranty
                      </span>
                    </p>
                    <p style={{ color: "#8d8d8d", fontSize: "14px" }}>
                      Type :{" "}
                      <span
                        style={{
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        On Site
                      </span>
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        color: "#8d8d8d",
                        fontSize: "14px",
                        margin: "0",
                      }}
                    >
                      Start Date:{" "}
                      <span
                        style={{
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        20/06/2022
                      </span>
                    </p>
                    <p
                      style={{
                        color: "#8d8d8d",
                        fontSize: "14px",
                        margin: "0",
                      }}
                    >
                      End Date :{" "}
                      <span
                        style={{
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      ></span>
                    </p>
                    <p
                      style={{
                        color: "#8d8d8d",
                        fontSize: "14px",
                        margin: "0",
                      }}
                    >
                      Days Remaining :
                      <span
                        style={{
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {(seconds - data.expiry.toNumber()) / 86400}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>{data.description}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <img
                      src={image}
                      style={{ height: "120px", width: "120px" }}
                    />
                    <p
                      style={{
                        color: "#8d8d8d",
                        fontSize: "14px",
                        margin: "0",
                      }}
                    >
                      Token ID :
                      <span
                        style={{
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {image}
                        {/* {data.tokenId} */}
                      </span>
                    </p>
                  </div>
                </div>
                <Link to="/myorders">
                  <StyledButton variant="contained">Go Back</StyledButton>
                </Link>
              </Component>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Warranty;
