import React from "react";
import { Box, Typography, Button, Grid, styled } from "@mui/material";

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
  return (
    <>
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ color: "#8d8d8d", fontSize: "14px" }}>
              Serial Number:{" "}
              <span
                style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
              >
                YX00MZAD
              </span>
            </p>
            <p style={{ color: "#8d8d8d", fontSize: "14px" }}>
              Warranty Status :{" "}
              <span
                style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
              >
                In warranty
              </span>
            </p>
            <p style={{ color: "#8d8d8d", fontSize: "14px" }}>
              Type :{" "}
              <span
                style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
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
            <p style={{ color: "#8d8d8d", fontSize: "14px", margin: "0" }}>
              Start Date:{" "}
              <span
                style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
              >
                20/06/2022
              </span>
            </p>
            <p style={{ color: "#8d8d8d", fontSize: "14px", margin: "0" }}>
              End Date :{" "}
              <span
                style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
              >
                20/07/2024
              </span>
            </p>
            <p style={{ color: "#8d8d8d", fontSize: "14px", margin: "0" }}>
              Days Remaining :
              <span
                style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
              >
                436
              </span>
            </p>
          </div>
          <div>
            <p>
              This product has a one year limited warranty which includes a
              warranty upgrade. This product is entitled to parts, labor and
              on-site/in-home repair service. If an issue cannot be resolved by
              phone, Lenovo will schedule an appointment and dispatch a
              certified technician to you. Service is available Monday-Friday
              (except holidays). In some specific issues it might be required
              system to be shipped to Lenovo Service Center.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <img
              src="https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000"
              style={{ height: "120px", width: "120px" }}
            />
            <p style={{ color: "#8d8d8d", fontSize: "14px", margin: "0" }}>
              Token ID :
              <span
                style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
              >
                4498415161151
              </span>
            </p>
          </div>
        </div>
        <StyledButton variant="contained">Go Back</StyledButton>
      </Component>
    </>
  );
};

export default Warranty;
