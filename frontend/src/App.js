import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactUs from "./components/pages/ContactUs.js";
import NavBar from "./components/NavBar.js";
import ContactTable from "./components/AdminDashboard/ContactTable.js";
import Stores from "./components/pages/Stores.js";
import Slider from "./components/pages/SliderFashion.js";
import Cart from "./components/pages/Cart.js"
import Order from "./components/AdminDashboard/Orders.js"
import ViewOrder from "./components/AdminDashboard/ViewOrder.js"
import Shops from "./components/AdminDashboard/Shops.js";
import AddShop from "./components/AdminDashboard/AddShop.js";
import UpdateShop from "./components/AdminDashboard/UpdateShop.js";
import Mimosa from "./components/pages/Mimosa.js";
import ViewContact from "./components/AdminDashboard/ViewContact.js";
import Search from "./components/pages/Search.js";






function App() {
  
  return (
    <Router>
      <div>
        <Routes>
         <Route path="/Slider" element={<Slider />}></Route>
         <Route path="/contact-Us" element={<ContactUs />}></Route>
         <Route path="/Admin-Dashboard" element={<NavBar />}></Route>
         <Route path="/Contact-Us-Table" element={<ContactTable />}></Route>
         <Route path="/Categories" element={<Stores />}></Route>
         <Route path="/Cart" element={<Cart />}></Route>
         <Route path="/Orders" element={<Order />}></Route>
         <Route path="/ViewOrder/:orderId" element={<ViewOrder />} />
         <Route path="/Shops" element={<Shops />} />
         <Route path="/addShops" element={<AddShop />} />
         <Route path="/updateShop/:storeID" element={<UpdateShop />} />
         <Route path="/Mimosa" element={<Mimosa />} />
         <Route path="/viewContact/:issueId" element={<ViewContact/>} />
         <Route path="/VirtualSearch" element={<Search />} />
         

       
       
        

           
        </Routes>
      </div>
    </Router>
  );
}

export default App;