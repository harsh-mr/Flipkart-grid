import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const productSchema = new mongoose.Schema({
    //Stores all the different serial number of the products
   serial_no:{
    type:Array,
    required:true
   },
   //Stores the name of the specific product
   product_name:{
    type:String,
    required:true
   },
   //Stores the price of the product
   price:{
    type:String,
    required:true
   },
   //Stores the image of the product
   product_image:{
    type:String,
    required:true
   },
   //Stores the ipfs url where the nft is stored
   nft:{
    type:String,
    required:true
   },
   //Stores the serial number corresponding token ids of the corresponding nfts
   tokenID:{
    type:Array,
    required:true
   },
   //Stores a short discription of the product
   discription:{
    type:String,
    required:true
   },
   
});

autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, 'product');

const products = mongoose.model('product', productSchema);

export default products;