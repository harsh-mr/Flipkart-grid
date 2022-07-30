import express from  'express';
import { getProductById, getProducts,postNFT,postProduct,delNFT,repairDiscription,repairTokenID,getRepairLog} from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { addItemInCart } from '../controller/cart-controller.js';
import { addPaymentGateway, paymentResponse } from '../controller/payment-controller.js';


const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.get('/repairlog/:id', getRepairLog);

// router.post('/cart/add', addItemInCart);

router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);
router.post('/postnft',postNFT);
router.post('/delnft',delNFT);
router.post('/postproduct',postProduct);
router.post('/repairtokenid',repairTokenID);
router.post('/repairdiscription',repairDiscription);

export default router;