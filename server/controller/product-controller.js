import Product from '../model/productSchema.js';
import Repairs from '../model/repairSchema.js';
import sgMail from '@sendgrid/mail'


const SENDGRID_API_KEY='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'

sgMail.setApiKey(SENDGRID_API_KEY)

export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});

        response.json(products);
    }catch (error) {
        response.json(error);
    }
}

export const getProductById = async (request, response) => {
    try {
        console.log('Hie')
        console.log(request.params.id )
        const products = await Product.findOne({ '_id': request.params.id });
        //console.log(products)
        response.json(products);
    }catch (error) {
         response.json(error);
    }
}
export const getRepairLog = async (request, response) => {
    try {
        console.log('Hie')
        console.log(request.params.id )
        const products = await Repairs.findOne({ tokenID: request.params.id });
        //console.log(products)
        response.json(products);
    }catch (error) {
         response.json(error);
    }
}

export const postNFT = async (request, response) => {
    try {
        console.log(request.body.productID)
        console.log(request.body.tokenID)
        Product.findOneAndUpdate({productID:request.body.productID},{
            $push:{tokenID:request.body.tokenID}
        },{
            new:true
        }).then(da=>{
            const repair=new Repairs({
                tokenID:request.body.tokenID,
                date:{},
                discription:{}
            })
            repair.save();
        })
        
        }
        //if(Product.findOne({'productID':request.}))
        
    catch (error) {
        response.json(error);
    }
}

export const delNFT = async (request, response) => {
    try {
        var date,reason;
        const{productID,tokenID,email,url,nftname,nftdisc,serialno,time}=request.body;;
        Product.findOneAndUpdate({productID:productID},{
            $pull:{tokenID:tokenID}
        },{
            new:true
        }).then(da=>{
            if(da){
                Repairs.findOne({tokenID:tokenID}).
                then(res=>{
                 

const msg = {
  to: email, // Change to your recipient
  from: 'harshme78@gmail.com', // Change to your verified sender
  subject: 'Thankyou for shopping with Flipkart',
  text:`Details of the Product you purchased :
         1.ProductID :${productID}
         2.Serial No: ${serialno}
         3.Date of purchase: ${time}
         
         Details of your nft :
         1. NFT Name: ${nftname}
         2. NFT discription :${nftdisc}
         3. NFT Image : ${url}`
         ,
}
sgMail
  .send(msg)})
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
                response.json({message:"success"})
            }
            else{
                response.json({error:"failed"})
            }
        })
        
        }
        //if(Product.findOne({'productID':request.}))
        
    catch (error) {
        response.json(error);
    }
}

export const postProduct = async (request, response) => {
    try {
        console.log(request.body)
        Product.findOne({productID:request.body.productID})
        .then(user=>{
            if(user){
               return response.json({message:"Already Listed"})
            }
        })
          const product=new Product({
            productID:request.body.productID,
               product_name:request.body.product_name,
               price:request.body.price,
               product_image:request.body.product_image,
               discription:request.body.discription,
               expiry:request.body.expiry
          })
          product.save()
          .then(user=>{
           // console.log(user._id)
            if(user){
                response.json({message:"Successfully Product Uploaded"})
            }
            else{
                return response.json({error:"Try Again Later!"})
            }
        }).catch((err)=>{
            console.log(err);
        })
        }
        
    catch (error) {
        response.json(error);
    }
}

export const repairTokenID = async (request, response) => {
    try {
       const {tokenID,date}=request.body;
       const data=date.toString().slice(0,15)
       Repairs.findOneAndUpdate({tokenID:tokenID},{
         $push:{repair_date:data},
    },{
        new:true
    })
        
    .then(da=>{
            if(da){
                response.json({message:"success"})
            }
            else{
                response.json({error:"failed"})
            }
        })}
    catch (error) {
        response.json(error);
    }
}
export const repairDiscription = async (request, response) => {
    try {
       const {tokenID,discription}=request.body;
       Repairs.findOneAndUpdate({tokenID:tokenID},{
         $push:{repair_reason:discription},
    },{
        new:true
    })
        
    .then(da=>{
            if(da){
                response.json({message:"success"})
            }
            else{
                response.json({error:"failed"})
            }
        })}
    catch (error) {
        response.json(error);
    }
}



