import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
const {ObjectId}=mongoose.Schema.Types;
const productSchema = new mongoose.Schema({
   //Stores the name of the specific product
   productID:{
    type:Number,
    required:true
   },
   product_name:{
    type:String,
    required:true
   },
   //Stores the price of the product
   price:{
    type:Number,
    required:true
   },
   //Stores the image of the product
   product_image:{
    type:String,
    required:true
   },
   //Stores a short discription of the product
   discription:{
    type:String,
    required:true
   },
   detailsof:{
    type:ObjectId,//used to maintain the relationship
    ref:'nft'
}
});

autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, 'product');

const products = mongoose.model('product', productSchema);

export default products;