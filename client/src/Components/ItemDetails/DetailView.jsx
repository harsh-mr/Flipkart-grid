
import { useState, useEffect } from 'react';

import { styled, Box, Typography, Grid,Modal , } from '@mui/material';

import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../service/api';
import wheel from '../Wheel/wheel'



const Component = styled(Box)`
    margin-top: 55px;
    background: #F2F2F2;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}))

const RightContainer = styled(Grid)`
    margin-top: 50px;
    & > p {
        margin-top: 10px;
    }
`;

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };



const DetailView = () => {
    const { id } = useParams();
    console.log(id)
    const [rep,setrep]=useState('');

    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(true);
    useEffect(()=>{
        const find  = async ()=>{
            let ans= await getProductById(id);
           // console.log(ans)
            setrep(ans);
            // console.log(ans);
        }
        find();
     },[])
   
    
  
  
    
    //console.log(rep.tokenID[0]);
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';    
    


    return (
        <Component>
            <Box></Box>

            {/* <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                {wheel}
              </Box>

            </Modal> */}

            
               { rep && <Container container> 
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={{image:rep.product_image,id:rep.tokenID[0],expiry:rep.expiry,productID:rep.productID} }/>
                    </Grid>
                    <RightContainer item lg={8} md={8} sm={8} xs={12}>
                        <Typography>{rep.product_name}</Typography>
                        <Typography style={{marginTop: 5, color: '#878787', fontSize: 14 }}>
                            8 Ratings & 1 Reviews
                            <span><img src={fassured} style={{width: 77, marginLeft: 20}} /></span>
                        </Typography>
                        <Typography>
                            <span style={{ fontSize: 28 }}>₹{rep.price}.00</span>&nbsp;&nbsp;&nbsp; 
                            <span style={{ color: '#878787' }}><strike>₹mrp</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{ color: '#388E3C' }}>discount off</span>
                        </Typography>
                        <ProductDetail />
                    </RightContainer>
                </Container>
}
        </Component>
    )
}

export default DetailView;





















