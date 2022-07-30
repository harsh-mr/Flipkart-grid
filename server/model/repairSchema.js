import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const repairSchema = new mongoose.Schema({
   //Stores the tokenID of the product
   tokenID:{
    type:Number,
    required:true
   },
   // Stores the date when repairs were done in product
   repair_date:{
    type:Array,
    required:true
   },
   //Stores the reason of repair corresponding to when the repair was done
   repair_reason:{
    type:Array,
    required:true
}});

autoIncrement.initialize(mongoose.connection);
repairSchema.plugin(autoIncrement.plugin, 'repair');

const repairs = mongoose.model('repair', repairSchema);

export default repairs;