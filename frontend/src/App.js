import CheckoutForm from './components/sandali/CheckoutForm';
import CheckoutDetails from './components/sandali/CheckoutDetails';          
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import ContactUs from "./components/sammani/pages/ContactUs.js";
import NavBar from "./components/sammani/NavBar.js";
import ContactTable from "./components/sammani/AdminDashboard/ContactTable.js";
import Stores from "./components/sammani/pages/Stores.js";
import Slider from "./components/sammani/pages/SliderFashion.js";
import Cart from "./components/sammani/pages/Cart.js"
import Order from "./components/sammani/AdminDashboard/Orders.js"
import ViewOrder from "./components/sammani/AdminDashboard/ViewOrder.js"
import Shops from "./components/sammani/AdminDashboard/Shops.js";
import AddShop from "./components/sammani/AdminDashboard/AddShop.js";
import UpdateShop from "./components/sammani/AdminDashboard/UpdateShop.js";
import Mimosa from "./components/sammani/pages/Mimosa.js";
import ViewContact from "./components/sammani/AdminDashboard/ViewContact.js";
import Search from "./components/sammani/pages/Search.js";
import Dashboard from "./components/sammani/AdminDashboard/Dashboard.js";
import "react-toastify/dist/ReactToastify.css";
import Sales from "./components/sammani/AdminDashboard/Sales.js";
import HomeUI from "./components/sammani/pages/UIHome.js";

//sandaru
import CreateLoyalty from "./components/sandaru/pages/CreateLoyalty";
import LoyaltyAdminWatch from "./components/sandaru/pages/LoyaltyAdminWatch";
import ApprovedMemberships from "./components/sandaru/pages/ApproveMembers";
// import Home from "./components/sandaru/pages/Home";
import Footer from "./components/sandaru/pages/Footer.js";





function App() {
  
  return (
    <Router>
      <div>
        <Routes>

          {/* //sammani */}
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
         <Route path="/mazza-gallarie" element={<HomeUI/>}/>
       
       {/* //ravindu */}


       //sandaru
       <Route path="/createLoyalty" element={<CreateLoyalty/>}/>   
       <Route path="/loyaltyadminwatch" element={<LoyaltyAdminWatch/>}/>
       <Route path="/approvedMemberships" element={<ApprovedMemberships/>}/>
       {/* <Route path="/Home" element={<Home/>}/> */}
       <Route path="/Footer" element={<Footer/>}/>
       //sandali
       <Route path="/" element={<CheckoutDetails />} />
          <Route path="/add" element={<CheckoutForm />} />
       {/* //sandaru */}

       {/* //sandali */}

      
      
        </Routes>
      </div>
    </Router>
  );
}
export default App;
