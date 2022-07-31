import axios from "axios";
import NFT_Digital_Warranty from '../NFT_Digital_Warranty.json';
import { delTokenID } from "../service/api";

export default function Transaction() {
    const ethers = require("ethers");
        
    var sale  = async () =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        console.log(1)
        const a=localStorage.getItem("email");
        const b=localStorage.getItem("productID");
        const c=localStorage.getItem("tokenID");
        const d=localStorage.getItem("expiry");
        const e=localStorage.getItem("val");
        console.log(typeof(d))
        //Pull the deployed contract instance
        
            let contract = new ethers.Contract(NFT_Digital_Warranty.address, NFT_Digital_Warranty.abi, signer)
            console.log(typeof(NFT_Digital_Warranty.address))
            console.log(2)
            const f=(d+e)*3600;
            const g=toString(f);
          //create an NFT Token
             await contract.executeSale(c,f,{value:'0'}).then(
              async(da)=>{
                console.log(3)
                  console.log(da)
                  const tokenURI =  await contract.tokenURI(c);
             await axios.get(tokenURI).then(async(meta)=>{
                await  delTokenID({productID:b,tokenID:c,email:a,url:meta.data.image,nftname:meta.data.name,nftdisc:meta.data.description,serialno:meta.data.serialno,time:(new Date().toString().slice(0, 10))});
                 window.alert("Transaction is successful")
                 localStorage.clear()
                 window.location.replace('/myorders')
            })
            //console.log(meta)
               
              })
            }
            
       
        
    return(
        <div>
            <button onClick={sale}>confirm</button>
        </div>
    )
}