import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import NFT_Digital_Warranty from '../NFT_Digital_Warranty.json';

const DisplayWarranty = () => {

    const {tokenId}  = useParams();

    
    const [data, setdata] = useState();
    const [burnt, setburnt] = useState(false);

    var sale  = async () =>{
        const ethers = require("ethers");
        
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(NFT_Digital_Warranty.address, NFT_Digital_Warranty.abi, signer)

        //create an NFT Token
        let nft =  await contract.executeSale(tokenId,50,{value:'0'});

    }


    var verify = async () => {
        const ethers = require("ethers");
        
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(NFT_Digital_Warranty.address, NFT_Digital_Warranty.abi, signer)

        //create an NFT Token
        // let nft =  await contract.executeSale(tokenId,50,{value:'0'});
        let burn ;

     


        try{
             burn =  await contract.BurnNFT(tokenId,{value:'0'});
            console.log(burn);
            setburnt(true);
            
            
        }
        catch(err){
            console.log(err);
        }

        if(!burn){
            
            let nft =  await contract.getListedTokenForId(tokenId)
            setdata(nft);
            console.log(nft);

        }


    }



    var getWarranty = async () => {
        const ethers = require("ethers");
        
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(NFT_Digital_Warranty.address, NFT_Digital_Warranty.abi, signer)

        //create an NFT Token
        try{
            let nft =  await contract.getListedTokenForId(tokenId);
            if(nft.owner==="0x0000000000000000000000000000000000000000"){
                setburnt(true);
            }

        }
        catch(e){
            console.log(e);
        }
     



      

   
    }


    useEffect(()=>{
        getWarranty();
    },[])
    






  return (
    <div>

    {!data?<div>
        {burnt?<div>sorry expired</div>:<div>
        <button onClick={sale}>sale</button>
        <button onClick={verify}>hello</button>
        </div>}
        

    </div>:
    <div>data fetched
        <div>{data.owner}</div>
    </div>
    }


    </div>
  )
}

export default DisplayWarranty;