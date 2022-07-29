// import Navbar from "./Navbar";
import { useState,useEffect } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../pinata";
import NFT_Digital_Warranty from '../../NFT_Digital_Warranty.json';
import { useLocation } from "react-router";

export default function SellNFT () {
    const [connected, toggleConnect] = useState(false);
    const [currAddress, updateAddress] = useState('0x');
    const [formParams, updateFormParams] = useState({ name: '', description: '', serialno: ''});
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    const location = useLocation();
    const [file, setfile] = useState()
    



    async function connectWebsite() {

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if(chainId !== '0x5')
        {
          //alert('Incorrect network! Switch your metamask network to Rinkeby');
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x5' }],
         })
        }  
        await window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(() => {
            // updateButton();
            console.log("here");
            getAddress();
            window.location.replace(location.pathname)
          });
    }
    
    useEffect(() => {
        let val = window.ethereum.isConnected();
        if(val)
        {
          console.log("here");
          getAddress();
        //   toggleConnect(val);
        //   updateButton();
        }
    
        window.ethereum.on('accountsChanged', function(accounts){
          window.location.replace(location.pathname)
        })
      });
     
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









    //   var files;
    //This function uploads the NFT image to IPFS
    async function OnChangeFile(e) {
        setfile(e.target.files[0]);
    //    files = e.target.files[0];
        console.log(file);
        //check for file extension
       
    }

    //This function uploads the metadata to IPDS
    async function uploadMetadataToIPFS() {
        const {name, description, serialno} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !description || !serialno || !fileURL)
            return;

        const nftJSON = {
            name, description, serialno, image: fileURL
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    async function listNFT(e) {
        e.preventDefault();
        var response;
        try {
            //upload the file to IPFS
             response = await uploadFileToIPFS(file);
            if(response.success === true) {
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }



        //Upload data to IPFS
        try {
            console.log(fileURL);
            const metadataURL = await uploadMetadataToIPFS();
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            updateMessage("Please wait.. uploading (upto 5 mins)")

            //Pull the deployed contract instance
            let contract = new ethers.Contract(NFT_Digital_Warranty.address, NFT_Digital_Warranty.abi, signer)

            //massage the params to be sent to the create NFT request
            // const serialno = ethers.utils.parseUnits(formParams.serialno, 'ether')
            // let listingPrice = await contract.getListPrice()
            // listingPrice = listingPrice.toString()

            //actually create the NFT

            const { serialno} = formParams;
            let transaction = await contract.createToken(metadataURL, serialno, { value: '0' })
           const r  = await transaction.wait()
            console.log(transaction);
            console.log(r);
            alert("Successfully listed your NFT!");
            updateMessage("");
            updateFormParams({ name: '', description: '', serialno: ''});
            window.location.replace("/addnft")
        }
        catch(e) {
            alert( "Upload error"+e )
        }
    }


    async function getAddress() {
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        updateAddress(addr);
      }


    console.log("Working", process.env);
    return (
        <div className="">
        {/* <Navbar></Navbar> */}
        <div className="" id="nftForm">
            <form className="">
            <h3 className="">Upload your NFT to the marketplace</h3>
                <div className="">
                    <label className="" htmlFor="name">NFT Name</label>
                    <input className="" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-6">
                    <label className="" htmlFor="description">NFT Description</label>
                    <textarea className="" cols="40" rows="5" id="description" type="text" placeholder="Enter description" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
                </div>
                <div className="mb-6">
                    <label className="" htmlFor="SerialNo">Serial No </label>
                    <input className="" type="text" placeholder="Enter Serial No"  value={formParams.serialno} onChange={e => updateFormParams({...formParams, serialno: e.target.value})}></input>
                </div>
                <div>
                    <label className="" htmlFor="image">Upload Image</label>
                    <input type={"file"} onChange={OnChangeFile}></input>
                </div>
                <br></br>
                <div className="">{message}</div>
                <button onClick={listNFT} className="">
                    List NFT
                </button>
            </form>
        </div>

        <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite}>{connected? "Connected":"Connect Wallet"}</button>
        <div>{currAddress}</div>
        </div>
    )
}