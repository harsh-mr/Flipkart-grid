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
          const nft=new NFT({
           serialno:request.body.serialno,
           productID:request.body.productID,
           tokenID:request.body.tokenID,
           tokenURI:request.body.tokenURI
          })
          nft.save()
          .then(user=>{
            console.log(user._id)
            if(user){
                res.json({message:"Successfully NFT Uploaded"})
            }
            else{
                return res.json({error:"Try Again Later!"})
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