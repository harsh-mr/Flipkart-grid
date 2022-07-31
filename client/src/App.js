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
import Repair from './Components/Repair';
import RepairLog from './Components/RepairLog';
import SpinningWheel from './Components/SpinningWheel';
import Transaction from './Components/Transaction';


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
              <Route path= '/repair' element={<Repair />} />
              <Route path= '/repairlog/:tokenID' element={<RepairLog />} />
              <Route path= '/spinningwheel' element={<SpinningWheel />} />
              <Route path= '/transaction' element={<Transaction />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;
