import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const nftSchema = new mongoose.Schema({
    //Stores all the different serial number of the products
    productID:{
        type:String,
        required:true
    },
   serial_no:{
    type:String,
    required:true
   }
   //Stores the ipfs url where the nft is stored
//    tokenURI:{
//     type:String,
//     required:true
//    },
//    //Stores the serial number corresponding token ids of the corresponding nfts
//    tokenID:{
//     type:String,
//     required:true
//    }
});

autoIncrement.initialize(mongoose.connection);
nftSchema.plugin(autoIncrement.plugin, 'nft');

const nft = mongoose.model('nft', nftSchema);

export default nft;