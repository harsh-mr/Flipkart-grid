import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NFT_Digital_Warranty from "../NFT_Digital_Warranty.json";
import {
  Box,
  Card,
  Typography,
  Button,
  Modal,
  Grid,
  styled,
} from "@mui/material";
import axios from "axios";
import { Filter } from "@mui/icons-material";

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
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

const StyledButton2 = styled(Button)`
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 150px;
  height: 51px;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Warranty = () => {
  const { tokenId } = useParams();

  const [data, setdata] = useState();
  const [meta, setmeta] = useState();
  const [burnt, setburnt] = useState(false);
  const cleanDate = (d) => {
    return new Date(+d.replace(/\/Date\((\d+)\)\//, "$1"));
  };

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
      setmeta(meta.data);
      setdata(nft);
      console.log(meta);
      console.log(meta.data);
      console.log(meta.tokenId);
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

  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(true);

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)",
          height: "93vh",
        }}
      >
        <div style={{ backdropFilter: "blur(30px)", paddingTop: "50px" }}>
          {data && (
            <div>
              <div>
                <div>
                  <Component container>
                    <div
                      style={{
                        height: "65vh",
                        width: "75%",
                        margin: "30px auto",
                        display: "flex",
                        background: "#f8fcff",
                        borderRadius: "15px",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      }}
                    >
                      <div className="left-section" style={{ width: "50%" }}>
                        <img
                          src={meta.image}
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "15px",
                          }}
                        />
                      </div>
                      <div
                        className="right-section"
                        style={{ width: "50%", padding: "15px" }}
                      >
                        <h1
                          style={{
                            margin: "10px auto",
                            textAlign: "center",
                            fontSize: "26px",
                          }}
                        >
                          Certificate of Warranty
                        </h1>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "0px",
                          }}
                        >
                          <p
                            style={{
                              color: "#8d8d8d",
                              fontSize: "18px",
                              margin: "5px",
                            }}
                          >
                            Token ID{" "}
                          </p>
                          <p
                            style={{
                              color: "black",
                              fontSize: "18px",
                              fontWeight: "bold",
                              margin: "5px",
                            }}
                          >
                            {tokenId}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "0px",
                          }}
                        >
                          <p
                            style={{
                              color: "#8d8d8d",
                              fontSize: "18px",
                              margin: "5px",
                            }}
                          >
                            Serial Number{" "}
                          </p>
                          <p
                            style={{
                              color: "black",
                              fontSize: "18px",
                              fontWeight: "bold",
                              margin: "5px",
                            }}
                          >
                            {data.serialNo}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "0px",
                          }}
                        >
                          <p
                            style={{
                              color: "#8d8d8d",
                              fontSize: "18px",
                              margin: "5px",
                            }}
                          >
                            Start Date{" "}
                          </p>
                          <p
                            style={{
                              color: "black",
                              fontSize: "18px",
                              fontWeight: "bold",
                              margin: "5px",
                            }}
                          >
                            {new Date(data.created.toNumber() * 1000)
                              .toISOString()
                              .slice(0, 10)}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "0px",
                          }}
                        >
                          <p
                            style={{
                              color: "#8d8d8d",
                              fontSize: "18px",
                              margin: "5px",
                            }}
                          >
                            End Date{" "}
                          </p>
                          <p
                            style={{
                              color: "black",
                              fontSize: "18px",
                              fontWeight: "bold",
                              margin: "5px",
                            }}
                          >
                            {new Date(data.expiry.toNumber() * 1000)
                              .toISOString()
                              .slice(0, 10)}
                          </p>
                        </div>

                        <div>
                          <div
                            style={{
                              margin: "10px",
                              overflowWrap: "break-word",
                            }}
                          >
                            {meta.description}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        ></div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "60px",
                          }}
                        >
                          <Link to="/myorders">
                            <StyledButton2
                              variant="contained"
                              style={{ textDecoration: "none", color: "white" }}
                            >
                              Go Back
                            </StyledButton2>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Component>
                </div>
              </div>
            </div>
          )}
          {!data && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {burnt ? (
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Sorry, Validity Expired.
                  </Typography>
                ) : (
                  <div>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Check the validity of your warranty.
                    </Typography>
                    <StyledButton
                      onClick={verify}
                      style={{ marginTop: "30px", marginLeft: "280px" }}
                    >
                      Check Validity
                    </StyledButton>
                  </div>
                )}
              </Box>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Warranty;

// style={{
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "100vh",
// }}

// style={{
//   background: "#f8fcff",
//   borderRadius: "4px",
//   boxShadow:
//     "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
// }}
