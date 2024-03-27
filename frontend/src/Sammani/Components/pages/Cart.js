import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css";
import Header from "../MainHeader.js";
import "../assets/css/Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
// import Footer from "../Footer.js";
import axios from "axios";
import { toast,ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Ads2 from "./Ads2.js";




function Cart(){



   

//generate id
    const generateShortId = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

//Fetch data 
const [nic, setNic] = useState("");
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [nicError, setNicError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [data, setData] = useState([]);
   

    useEffect(() => {
      fetchData();
  }, []);

    const fetchData = async () => {
        try {
           const response = await axios.get("http://localhost:8070/cart/");
           setData(response.data);
        } catch (error) {
           // Check if the error is due to cart being empty
           if (error.response && error.response.status === 404) {
              // Cart is empty, set data to an empty array
              setData([]);
           } else {
              console.error("Error fetching data:", error);
           }
        }
     }


     const handleCheckout = async () => {
      try {
          // Check if the cart is empty
          if (data.length === 0) {
              alert("Cart is empty. Please add items to proceed.");
              return;
          }
  
          validateNIC();
          validateEmail();
  
          if (nicError || emailError) {
              return; // Don't proceed if there are validation errors
          }
  
          // Display toast message indicating checkout process has started
          toast.info('Processing order...', {
              position: "top-right",
              autoClose: false, // Do not auto-close, keep the message until the process is completed
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: {
                  backgroundColor: "green", // Example background color
                  color: "white" // Example text color
              }
          });
  
          const orderId = generateShortId();
          const orderData = {
              orderId,
              nic,
              code,
              email,
              deliveryFee: "350.00", // Make sure it's a string
              details: data.map(({ itemName, type, price, shopName, itemId, quantity,date, size }) => ({
                  itemName,
                  type,
                  price,
                  shopName,
                  itemId,
                  quantity,
                  date,
                  size
              }))
          };
  
          const response = await axios.post("http://localhost:8070/order/addOrder", orderData);
          console.log(response.data); // Log success message
  
          // Close the previous toast message indicating the checkout process has started
          toast.dismiss(); // Close the previous toast message
  
          // Display success toast message
          toast.success('Order added successfully!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: {
                  backgroundColor: "black", // Example background color
                  color: "white" // Example text color
              }
          });
  
          // Clear the cart data after successful checkout
          setData([]);
  
      } catch (error) {
          console.error("Error checking out:", error);
          alert("Error adding order:", error);
      }
  }


   //delete
const handleDelete = async (itemId) => {
   try {
      const response = await axios.delete(`http://localhost:8070/cart/delete/${itemId}`);
      console.log(response.data); // log success message
      // Show toast notification for successful deletion
      toast.success('Item removed successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "black",
          color:'white'
        }
      });
      // After successful deletion, fetch data again to update the cart
      fetchData();
   } catch (error) {
      console.error("Error deleting item:", error);
   }
}


 // NIC validation function
 const validateNIC = () => {
   if (!/^(\d{9}v|\d{12})$/i.test(nic)) {
       setNicError("NIC should contain 9 or 12 digits followed by 'v'");
   } else {
       setNicError("");
   }
}

// Email validation function
const validateEmail = () => {
   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
       setEmailError("Invalid email address");
   } else {
       setEmailError("");
   }
}

// Handle NIC input change
const handleNicChange = (e) => {
   setNic(e.target.value);
   // Validate NIC on change
   validateNIC();
}

// Handle email input change
const handleEmailChange = (e) => {
   setEmail(e.target.value);
   // Validate email on change
   validateEmail();
}
  
   return(
      <>
      <div className="contact-us blog-author bg-gray-200">
         <Header />
         <div className="card card-body  shadow-blur mx-3 mx-md-4 mt-n6 mb-4" style={{ display: 'flex',backgroundColor:"#7da3c62b" }}>
            <div style={{width:"260px"}}>
<Ads2></Ads2>

            </div>
            <div className="cards" style={{ marginTop: "25px", marginBottom: "50px" , marginLeft:"290px" }}>
               <div className="row" style={{ height: "640px" }}>
                  <div className="col-md-8 carts" style={{ maxHeight: '685px', overflowY: 'scroll' }}>
                     <div className="cart-header" style={{ position: 'sticky', top: '-34px', background: 'white', zIndex: '1', padding: '17px 0', borderBottom: '14px solid #7eabd8' }}>
                        <div>
                           <h6><a href="#"> <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></a>Continue Shopping</h6></div>
                        <br />
                        <div className="row" style={{ height: "30px" }}>
                           <div className="col"><h4><b> <i className="material-icons opacity-15 me-2 text-m">shopping_cart</i>Shopping Cart</b></h4></div>
                        </div>
                     </div>
                     {data.map((item) => {
                         console.log(item);
                        const base64String = btoa(
                           String.fromCharCode(...new Uint8Array(item.image.data.data))
                        ); 
                        return (
                           <div className="row border-top border-bottom" key={item._id}>
                              <div className="row main align-items-center" style={{margin:"0px"}}>
                                 <div className="col-2">
                               
                                    <img style={{ height: "60px", objectFit:"cover" }} className="image-fluid"  src={`data:image/png;base64,${base64String}`} alt={item.itemName}/>
                                  
                                    </div>
                                 <div className="col">
                                    <div className="row" style={{ color: 'black', width:"200px" }}>{item.itemName}</div>
                                    <div className="row">{item.type}</div>
                                 </div>
                                 <div className="col">{item.size}<span className="close"></span></div>
                                 <div className="col">
                                 {item.quantity}
                                 </div>
                                 <div className="col">{item.price} <span className="close"></span></div>
                                 <div className="col">
                                 <button
    style={{ backgroundColor: "white", border: "none", boxShadow: "none" }}
    onClick={() => handleDelete(item._id)}> {/* Pass item.id as argument */}
    <i className="material-icons opacity-15 text-m">delete</i>
</button>

                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
                  <div className="col-md-4 summary" style={{fontSize:"14px"}}>
                     <div><h5><b>Summary</b></h5></div>
                     <hr />
                     <div className="row">
                        <div className="col" style={{ paddingLeft: "0" }}>ITEMS</div>
                        <div className="col" style={{ paddingLeft: "0" }}>{data.length}</div>
                        <div className="col text-right">Rs {data.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2)}</div>
                     </div>
                     <br />
                     <form>
                        <p style={{fontSize:"14px", marginBottom:"2px"}}>SHIPPING</p>
                        <select><option className="text-muted">Standard-Delivery- 350.00</option></select>
                        <p style={{fontSize:"14px", marginBottom:"2px"}}> ENTER NIC</p>
                        <input
                        name="nic"
                        placeholder="Enter your nic"
                        value={nic}
                        onChange={handleNicChange}
                        onBlur={validateNIC} // Validate NIC onBlur
                        style={{ border: nicError ? "1px solid red" : "" }} // Apply red border if there's an error
                        required
                    />
                    {nicError && <p style={{ color: "red", fontSize: "12px" }}>{nicError}</p>}
                    <br></br>
                        <p style={{fontSize:"14px", marginBottom:"2px"}}>ENTER EMAIL</p>
                        <input
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={validateEmail} // Validate email onBlur
                        style={{ border: emailError ? "1px solid red" : "" }} // Apply red border if there's an error
                        required
                    />
                    {emailError && <p style={{ color: "red", fontSize: "12px" }}>{emailError}</p>}
                        <p style={{fontSize:"14px", marginBottom:"2px"}}>GIVE COUPON CODE</p> 
                        <input name="code" placeholder="Enter code"value={code} onChange={(e) => setCode(e.target.value)}/> 
                     </form>
                     <div className="row" style={{ borderTop: "3px solid black", padding: "2vh 0" }}>
                        <div className="col" style={{fontSize:"14px"}}>TOTAL PRICE</div>
                        <div className="col text-right">Rs {data.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2)}</div>
                     </div>
                     <button className="btnn" onClick={handleCheckout} >CHECKOUT</button>
                  </div>
               </div>
            </div>
         </div>
         
         {/* <Footer /> */}
      </div>
     
      <ToastContainer/>
      </>
   );
}

export default Cart;
