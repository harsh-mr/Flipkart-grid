import React ,{useEffect,useState} from 'react'
import axios from 'axios';
import NFT_Digital_Warranty from '../NFT_Digital_Warranty.json';
import { Link } from 'react-router-dom';
const GetWarranties = () => {
    
    var transaction;
    const [data, setdata] = useState([]);
    var getallwarranties = async () => {
        const ethers = require("ethers");
        
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(NFT_Digital_Warranty.address, NFT_Digital_Warranty.abi, signer)

        //create an NFT Token
        let nfts =  await contract.getMyNFTs()
        let currenttoken =  await contract.getCurrentToken();
        // const tokenURI = await contract.tokenURI(5);
        // console.log(tokenURI);
        console.log(currenttoken);
        console.log(nfts);



        var items = await Promise.all(nfts.map(async (i) => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            let meta = await axios.get(tokenURI);
            meta = meta.data;

            
            let item = {
                serialno:i.serialNo,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
            }
            
            console.log(item);
            return item;
        }))


        setdata(items);
        console.log(items);
        console.log(data);

   
    }


    useEffect(()=>{
        getallwarranties();
    },[])
    




  return (
    <div style={{backgroundColor: "coral"}}>
        {data?
        (data.map((item,key)=>{
            return(
               <Link to={`/getWarranties/${item.tokenId}`}>
               <div style={{margin:"30px",backgroundColor: "#32a4a8",display:"flex"}}>
                    <h1>{item.name}</h1>
                    <img style={{maxWidth: "30%", height: "auto"}} src={item.image} alt=""/>
                    <p>{item.description}</p>
                 <div>hello</div>
                </div>
               </Link>
            )
        }
        )   
        ):<div>Loading</div>
    }
        


    </div>

    // <div>
    //     <button><Link to={`sdghs/gettokenId`}>Loading</Link></button>
    // </div>
  )
}

export default GetWarranties;