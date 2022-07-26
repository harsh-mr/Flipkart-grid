import mongoose from 'mongoose';

const Connection = async (username, password) => {

    const URL = 'mongodb://user:codeforinterview@ac-4e2p1ih-shard-00-00.mj9omqs.mongodb.net:27017,ac-4e2p1ih-shard-00-01.mj9omqs.mongodb.net:27017,ac-4e2p1ih-shard-00-02.mj9omqs.mongodb.net:27017/FLIPKART_GRID?ssl=true&replicaSet=atlas-58tss8-shard-0&authSource=admin&retryWrites=true&w=majority';
    // const URL = `mongodb://${username}:${password}@ecommerceweb-shard-00-00.fdvft.mongodb.net:27017,ecommerceweb-shard-00-01.fdvft.mongodb.net:27017,ecommerceweb-shard-00-02.fdvft.mongodb.net:27017/ECOMMERCE?ssl=true&replicaSet=atlas-8a6bhp-shard-0&authSource=admin&retryWrites=true&w=majority`;
    // const URL = `mongodb://${username}:${password}@ecommerce-shard-00-00.fdvft.mongodb.net:27017,ecommerce-shard-00-01.fdvft.mongodb.net:27017,ecommerce-shard-00-02.fdvft.mongodb.net:27017/ECOMMERCE?ssl=true&replicaSet=atlas-ilaj5d-shard-0&authSource=admin&retryWrites=true&w=majority`;
    // const URL = `mongodb://${username}:${password}@ac-helhq7e-shard-00-00.xjcmuct.mongodb.net:27017,ac-helhq7e-shard-00-01.xjcmuct.mongodb.net:27017,ac-helhq7e-shard-00-02.xjcmuct.mongodb.net:27017/FLIPKART_GRID?ssl=true&replicaSet=atlas-ikd7m4-shard-0&authSource=admin&retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;