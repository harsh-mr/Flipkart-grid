import { useState } from 'react';

import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import NFT_Digital_Warranty from '../../NFT_Digital_Warranty.json';
import {delTokenID} from '../../service/api';

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
    const [quantity, setQuantity] = useState(1);
    
    var sale  = async () =>{
        const ethers = require("ethers");
        
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
  
        //Pull the deployed contract instance
        let contract = new ethers.Contract(NFT_Digital_Warranty.address, NFT_Digital_Warranty.abi, signer)
  
        //create an NFT Token
          await contract.executeSale(product.id,product.expiry,{value:'0'}).then(
            async(da)=>{
               await delTokenID({productID:product.productID,tokenID:product.id});
               
            }
        )
        }
    

   

    return (
        <LeftContainer>
            <Image src={product.image} /><br />
            <StyledButton  style={{marginRight: 10, background: '#ff9f00'}} variant="contained"><Cart />Add to Cart</StyledButton>
            <StyledButton  style={{background: '#fb641b'}} variant="contained" onClick={sale}><Flash /> Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;