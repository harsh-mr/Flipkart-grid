import { useState, useEffect } from "react";
import NFT_Digital_Warranty from "../../NFT_Digital_Warranty.json";
import { useLocation } from "react-router";
import { postProductDetails } from "../../service/api";
import TextField from "@mui/material/TextField";
import { Box, Typography, Badge, Button, styled } from "@mui/material";

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

export default function AddPro() {
  const [formParams, updateFormParams] = useState({
    product_name: "",
    discription: "",
    price: "",
    productID: "",
    expiry: "",
  });
  const [product_image, setproduct_image] = useState("");
  var file;
  const location = useLocation();
  useEffect(() => {
    if (product_image) {
      // console.log(formParams)
      const { product_name, discription, price, productID, expiry } =
        formParams;
      postProductDetails({
        product_name,
        discription,
        price,
        productID,
        product_image,
        expiry,
      }).then(window.location.replace(`/addnft/${productID}`));
    }
  }, [product_image]);

  async function listProduct(e) {
    e.preventDefault();
    const data = new FormData(); //Bsically used to bind all the data in one package to transfer , basically an alternative of json form
    data.append("file", file);
    data.append("upload_preset", "speakingpixels");
    data.append("cloud_name", "speakingpixels");

    fetch("https://api.cloudinary.com/v1_1/speakingpixels/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((shre) => {
        setproduct_image(shre.url);
      })
      .catch((err) => console.log(err));
  }

  async function OnChangeFile(e) {
    file = e.target.files[0];
    console.log(file);
    //check for file extension
  }
  return (
    <div style={{ margin: "80px auto" }}>
      <div className="" id="nftForm">
        <form className="">
          <h3 style={{ margin: "20px 20%" }}>
            Upload your Product to the marketplace
          </h3>
          <div style={{ margin: "20px 30%" }}>
            <TextField
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              onChange={(e) =>
                updateFormParams({
                  ...formParams,
                  product_name: e.target.value,
                })
              }
              value={formParams.name}
              style={{ width: "400px" }}
            />
            {/* <label className="" htmlFor="name">
              Product Name
            </label>
            <input
              className=""
              id="name"
              type="text"
              placeholder="Enter product name"
              onChange={(e) =>
                updateFormParams({
                  ...formParams,
                  product_name: e.target.value,
                })
              }
              value={formParams.name}
            ></input> */}
          </div>

          <div style={{ margin: "20px 30%" }}>
            <TextField
              id="outlined-basic"
              label="Product Description"
              variant="outlined"
              onChange={(e) =>
                updateFormParams({ ...formParams, discription: e.target.value })
              }
              value={formParams.discription}
              style={{ width: "400px" }}
            />
            {/* <label className="" htmlFor="description">
              Product Description
            </label>
            <textarea
              className=""
              cols="40"
              rows="5"
              id="description"
              type="text"
              placeholder="Enter description"
              value={formParams.discription}
              onChange={(e) =>
                updateFormParams({ ...formParams, discription: e.target.value })
              }
            ></textarea> */}
          </div>
          <div style={{ margin: "20px 30%" }}>
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={formParams.price}
              onChange={(e) => {
                updateFormParams({ ...formParams, price: e.target.value });
              }}
              style={{ width: "400px" }}
            />
            {/* <label className="" htmlFor="Price">
              Price{" "}
            </label>
            <input
              className=""
              type="number"
              placeholder="Enter price"
              value={formParams.price}
              onChange={(e) => {
                updateFormParams({ ...formParams, price: e.target.value });
              }}
            ></input> */}
          </div>
          <div style={{ margin: "20px 30%" }}>
            <TextField
              id="outlined-basic"
              label="Warranty Life"
              variant="outlined"
              value={formParams.expiry}
              onChange={(e) => {
                updateFormParams({ ...formParams, expiry: e.target.value });
              }}
              style={{ width: "400px" }}
            />
            {/* <label className="" htmlFor="Expiry">
              Life of Warranty{" "}
            </label>
            <input
              className=""
              type="number"
              placeholder="in days"
              value={formParams.expiry}
              onChange={(e) => {
                updateFormParams({ ...formParams, expiry: e.target.value });
              }}
            ></input> */}
          </div>
          <div style={{ margin: "20px 30%" }}>
            <TextField
              id="outlined-basic"
              label="Product ID"
              variant="outlined"
              value={formParams.productID}
              onChange={(e) => {
                updateFormParams({ ...formParams, productID: e.target.value });
              }}
              style={{ width: "400px" }}
            />
            {/* <label className="" htmlFor="ProductID">
              Product ID
            </label>
            <input
              className=""
              type="text"
              placeholder="Enter Product ID"
              value={formParams.productID}
              onChange={(e) => {
                updateFormParams({ ...formParams, productID: e.target.value });
              }}
            ></input> */}
          </div>
          <div style={{ margin: "20px 30%" }}>
            <Button
              variant="contained"
              component="label"
              onChange={OnChangeFile}
            >
              Upload Image
              <input hidden type="file" />
            </Button>
            {/* <label className="" htmlFor="image">
              Upload Image
            </label>
            <input type={"file"} onChange={OnChangeFile}></input> */}
          </div>
          <div>
            <StyledButton onClick={listProduct} style={{ margin: "20px 30%" }}>
              Upload Product
            </StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
}
