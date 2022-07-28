import Product from '../model/productSchema.js';
import NFT from '../model/nftSchema.js';

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
        //console.log('Hie')
        const products = await Product.findOne({ 'id': request.params.id });
        response.json(products);
    }catch (error) {
         response.json(error);
    }
}

export const postNFT = async (request, response) => {
    try {
        console.log(request.body)
        Product.findOne({productID:request.body.productID})
        .then(user=>{
            if(!user){
               return response.json({message:"Not Listed"})
            }
        })
          const nft=new NFT({
           serialno:request.body.serialno,
           productID:request.body.productID,
           tokenID:request.body.tokenID,
           tokenURI:request.body.tokenURI
          })
          nft.save()
          .then(user=>{
           // console.log(user._id)
            if(user){
                response.json({message:"Successfully NFT Uploaded"})
            }
            else{
                return response.json({error:"Try Again Later!"})
            }
        }).catch((err)=>{
            console.log(err);
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
               discription:request.body.discription
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