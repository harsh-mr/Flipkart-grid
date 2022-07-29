// import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../pinata";
import NFT_Digital_Warranty from "../../NFT_Digital_Warranty.json";
import { useLocation } from "react-router";
import { postTokenID } from "../../service/api";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Box, Typography, Badge, Button, styled } from "@mui/material";

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 180px;
  height: 51px;
`;

export default function SellNFT() {
  const { productID } = useParams();
  const [connected, toggleConnect] = useState(false);
  //const [productID, setproductID] = useState(1);
  const [currAddress, updateAddress] = useState("0x");
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    serialno: "",
  });
  // const [data, updateData] = useState({ serialno:''});
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const location = useLocation();
  var file;

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

  useEffect(() => {
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here");
      getAddress();
      //   toggleConnect(val);
      //   updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    file = e.target.files[0];
    //check for file extension
  }

  //This function uploads the metadata to IPDS
  async function uploadMetadataToIPFS() {
    const { name, description, serialno } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !serialno || !fileURL) return;

    const nftJSON = {
      name,
      description,
      serialno,
      image: fileURL,
      productID,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);

      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    //await OnChangeFile(e);
    e.preventDefault();
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }

    //Upload data to IPFS
    try {
      console.log(fileURL);
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      updateMessage("Please wait.. uploading (upto 5 mins)");

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        NFT_Digital_Warranty.address,
        NFT_Digital_Warranty.abi,
        signer
      );

      //massage the params to be sent to the create NFT request
      // const serialno = ethers.utils.parseUnits(formParams.serialno, 'ether')
      // let listingPrice = await contract.getListPrice()
      // listingPrice = listingPrice.toString()

      //actually create the NFT

      const { serialno } = formParams;
      //const { productID} = formParams;
      let transaction = await contract.createToken(metadataURL, serialno, {
        value: "0",
      });
      await transaction.wait();
      //Pull the deployed contract instance
      //Get current token id
      //let productID=formParams.productID;
      let tokenID = await contract.getCurrentToken();
      tokenID = tokenID.toNumber();
      await postTokenID({ tokenID, productID });
      const tokenURI = await contract.tokenURI(tokenID);

      // console.log(serialno,tokenID,tokenURI,productID)
      // updateData({...data,tokenID});
      // updateData({...data,tokenURI});
      //await postNFTdetails({serialno,tokenID,tokenURI,productID});
      // console.log(productID);
      alert("Successfully listed your NFT!");
      updateMessage("");
      updateFormParams({ name: "", description: "", serialno: "" });
      window.location.replace("/addnft");
    } catch (e) {
      alert("Upload error" + e);
    }
  }

  // useEffect( async () =>{

  //     const ethers = require("ethers");

  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const addr = await signer.getAddress();

  //     //Pull the deployed contract instance
  //     let contract = new ethers.Contract(NFT_Digital_Warranty.address, NFT_Digital_Warranty.abi, signer)

  //     //create an NFT Token
  //     let transaction = await contract.getMyNFTs()

  //     console.log(transaction);

  // },[]);

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  //    console.log("Working", process.env);
  return (
    <div style={{ margin: "80px auto" }}>
      <div id="nftForm">
        <form>
          <h3 style={{ margin: "20px 20%" }}>
            Upload your NFT to the marketplace
          </h3>
          <div style={{ margin: "20px 30%" }}>
            <TextField
              id="outlined-basic"
              label="NFT Name"
              variant="outlined"
              onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }
              value={formParams.name}
              style={{ width: "400px" }}
            />
            {/* <label className="" htmlFor="name">
              NFT Name
            </label>
            <input
              className=""
              id="name"
              type="text"
              placeholder="Axie#4563"
              onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }
              value={formParams.name}
            ></input> */}
          </div>

          <div style={{ margin: "20px 30%" }}>
            <TextField
              id="outlined-basic"
              label="NFT Description"
              variant="outlined"
              value={formParams.description}
              onChange={(e) =>
                updateFormParams({ ...formParams, description: e.target.value })
              }
              style={{ width: "400px" }}
            />
            {/* <label className="" htmlFor="description">
              NFT Description
            </label>
            <textarea
              className=""
              cols="40"
              rows="5"
              id="description"
              type="text"
              placeholder="Enter description"
              value={formParams.description}
              onChange={(e) =>
                updateFormParams({ ...formParams, description: e.target.value })
              }
            ></textarea> */}
          </div>
          <div style={{ margin: "20px 30%" }}>
            <TextField
              id="outlined-basic"
              label="Serial Number"
              variant="outlined"
              value={formParams.serialno}
              onChange={(e) => {
                updateFormParams({ ...formParams, serialno: e.target.value });
              }}
              style={{ width: "400px" }}
            />
            {/* <label className="" htmlFor="SerialNo">
              Serial No{" "}
            </label>
            <input
              className=""
              type="text"
              placeholder="Enter Serial No"
              value={formParams.serialno}
              onChange={(e) => {
                updateFormParams({ ...formParams, serialno: e.target.value });
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
          <div className="">{message}</div>
          <StyledButton onClick={listNFT} style={{ margin: "20px 30%" }}>
            Upload Product
          </StyledButton>
        </form>
      </div>
      <StyledButton
        className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
        onClick={connectWebsite}
        style={{ margin: "20px 30%" }}
      >
        {connected ? "Connected" : "Connect Wallet"}
      </StyledButton>
      <div>{currAddress}</div>
    </div>
  );
}
