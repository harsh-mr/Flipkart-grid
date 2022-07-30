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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        {data && (
          <div>
            <div>
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
                      background: "#f8f8f8",
                      display: "flex",
                    }}
                  >
                    <div
                      className="left-section"
                      style={{ width: "50%", borderRight: "1px solid black" }}
                    >
                      <img
                        src={meta.image}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </div>
                    <div className="right-section" style={{ width: "50%" }}>
                      <h2 style={{ margin: "0 auto", textAlign: "center" }}>
                        Certificate of Warranty
                      </h2>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "10px",
                        }}
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
                          Status :{" "}
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
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "10px",
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
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "10px",
                        }}
                      >
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
                        <p
                          style={{
                            color: "#8d8d8d",
                            fontSize: "14px",
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
                            {new Date(data.expiry.toNumber() * 1000)
                              .toISOString()
                              .slice(0, 10)}
                          </span>
                        </p>
                      </div>
                      <div>
                        <div style={{ margin: "10px" }}>{meta.description}</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      ></div>
                      <div style={{ margin: "auto 100px 0 80px" }}>
                        <Link to="/myorders">
                          <StyledButton
                            variant="contained"
                            style={{ textDecoration: "none" }}
                          >
                            Go Back
                          </StyledButton>
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
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
