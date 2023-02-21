import { useState } from 'react';

import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash, WindowSharp } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import NFT_Digital_Warranty from '../../NFT_Digital_Warranty.json';
import {delTokenID} from '../../service/api';
import TextField from "@mui/material/TextField";
import axios from "axios"


const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px 20px',
    border: '1px solid #f0f0f0',
    width: '95%'
});

const StyledButton = styled(Button)`
    width: 46%;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;

const ActionItem = ({ product}) => {
    const navigate = useNavigate();
   
        console.log(product);
    const [emails, setEmail] = useState({email:""});
    
    var sale  = async () =>{

        if(!emails.email){
            return  window.alert("Enter the email id")
        }
        localStorage.setItem("email",emails.email);
        localStorage.setItem("productID",product.productID);
        localStorage.setItem("tokenID",product.id);
        localStorage.setItem("expiry",product.expiry);
        console.log(typeof(product.expiry))
        // const ethers = require("ethers");
        
    
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // const addr = await signer.getAddress();
  
        // //Pull the deployed contract instance
        // let contract = new ethers.Contract(NFT_Digital_Warranty.address, NFT_Digital_Warranty.abi, signer)
          
        // //create an NFT Token
        //   await contract.executeSale(product.id,product.expiry,{value:'0'}).then(
        //     async(da)=>{
        //         console.log(da)
        //         const tokenURI = await contract.tokenURI(product.id);
        //   let meta = await axios.get(tokenURI);
        //   //console.log(meta)
        //        await delTokenID({productID:product.productID,tokenID:product.id,email:emails.email,url:meta.data.image,nftname:meta.data.name,nftdisc:meta.data.description,serialno:meta.data.serialno,time:(new Date().toISOString().slice(0, 10))});
               
            // }
        // )
        

            
            window.location.replace('/spinningwheel');
        }
    

   

    return (
        <LeftContainer>
            <Image src={product.image} /><br />
            <StyledButton  style={{marginRight: 10, background: '#ff9f00'}} variant="contained"><Cart />Add to Cart</StyledButton>
            <StyledButton  style={{background: '#fb641b'}} variant="contained" onClick={sale}><Flash /> Buy Now</StyledButton>

            <TextField
              id="outlined-basic"
              label="Enter Email"
              variant="outlined"
              onChange={(e) =>
                setEmail({ ...emails, email: e.target.value })
              }
              value={emails.email}
              
              style={{ width: "280px", marginTop: "20px" }}
            />
        </LeftContainer>
    )
}

export default ActionItem;