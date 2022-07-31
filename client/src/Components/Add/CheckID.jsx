import { useState,useEffect } from "react";
import {checkProductID} from "../../service/api";
import { useLocation } from "react-router";

export default function Check (){
    const location = useLocation();
    const[proid,setproid]=useState({proids:''});
    //const [formParams, updateFormParams] = useState({ product_name: '', discription: '', price: '',productID: '',expiry:''});
  async function checkid(){
    let val= await checkProductID(proid);
    if(val==null){
        window.location.replace("/addnft");
    }
    else{
        window.location.replace("/addproduct")
    }
  }
    return (
        <div className="">
        {/* <Navbar></Navbar> */}
        <div className="" id="nftForm">
            <form className="">
                <div className="mb-6">
                    <label className="" htmlFor="ProductID">Product ID</label>
                    <input className="" type="text" placeholder="Enter Product ID"  value={proid.proids} onChange={(e )=>{ setproid({...proid, proids: e.target.value})}}></input>
                </div>
                <br></br>
                <button onClick={checkid} className="">
                    Check 
                </button>
            </form>
        </div>
        </div>
    )
}