import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, NotFound } from './Components/default';
import { Box } from '@mui/material'

//components
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import AddNFT from './Components/Add/AddNFT';
// import GetWarranties from './Components/GetWarranties';
// import DisplayWarranty from './Components/DisplayWarranty';
import AddProduct from './Components/Add/AddProduct';
import Orders from './Components/Orders';
import Warranty from './Components/Warranty';
import DummyWarranty from './Components/DummyWarranty';

function App() {
  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Box style={{marginTop: 54}}>
            <Routes>
              <Route path= '/' element={<Home />} />
              <Route path= '/cart' element={<Cart />} />
              <Route path= '/addnft/:productID' element={<AddNFT />} />
              <Route path= '/getWarranties/:tokenId' element={<Warranty />} />
              <Route path= '/addproduct' element={<AddProduct />} />
              <Route path= '/product/:id' element={<DetailView />} />
              <Route path= '/myorders' element={<Orders />} />
              <Route path= '/dummywarranty' element={<DummyWarranty />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;
