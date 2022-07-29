import React,  { useEffect ,useState} from 'react';
import axios from 'axios';

import { Box, styled } from '@mui/material';

import NavBar from './Home/NarBar';
import Banner from './Home/Banner';
import MidSlide from './Home/MidSlide';
import MidSection from './Home/MidSection';
import Slide from './Home/Slide';




const Component = styled(Box)`
    padding: 20px 10px;
    background: #F2F2F2;`
;

const Home = () => {


    const [products, setproducts] = useState([]);



    useEffect(() => {
        const fetch  = async () => {
            let {data}  = await axios.get("http://localhost:8000/products");
            setproducts(data);
            console.log(data);
        }
        fetch();
    }, [])

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products} />
                <MidSection />
                 <Slide
                    data={products} 
                    title='Discounts for You'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products} 
                    title='Suggested Items'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products} 
                    title='Top Selection'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products} 
                    title='Recommended Items'
                    timer={false} 
                    multi={true} 
                />
            </Component>
        </>
    )
}

export default Home;
