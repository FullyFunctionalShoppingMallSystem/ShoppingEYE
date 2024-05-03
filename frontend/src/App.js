import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import ContactUs from "./Sammani/Components/pages/ContactUs.js";
import NavBar from "./Sammani/Components/NavBar.js";
import ContactTable from "./Sammani/Components/AdminDashboard/ContactTable.js";
import Stores from "./Sammani/Components/pages/Stores.js";
import Slider from "./Sammani/Components/pages/SliderFashion.js";
import Cart from "./Sammani/Components/pages/Cart.js"
import Order from "./Sammani/Components/AdminDashboard/Orders.js"
import ViewOrder from "./Sammani/Components/AdminDashboard/ViewOrder.js"
import Shops from "./Sammani/Components/AdminDashboard/Shops.js";
import AddShop from "./Sammani/Components/AdminDashboard/AddShop.js";
import UpdateShop from "./Sammani/Components/AdminDashboard/UpdateShop.js";
import Mimosa from "./Sammani/Components/pages/Mimosa.js";
import ViewContact from "./Sammani/Components/AdminDashboard/ViewContact.js";
import Search from "./Sammani/Components/pages/Search.js";
import Dashboard from "./Sammani/Components/AdminDashboard/Dashboard.js";
import "react-toastify/dist/ReactToastify.css";
import Sales from "./Sammani/Components/AdminDashboard/Sales.js";
import Footer from "./Sammani/Components/Footer.js";






function App() {
  
  return (
    <Router>
      <div>
        <Routes>

          //sammani
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
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/sales" element={<Sales />} />
         <Route path="/qwe" element={<Footer />} />
       
       //ravindu

       //sandaru

       //sandali
      
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;