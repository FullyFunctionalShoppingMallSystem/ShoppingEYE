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
import FooterUI from "../FooterUI.js";




function Cart(){
   const [code, setCode] = useState('');
   const [discount, setDiscount] = useState(null);
   const [codeError, setCodeError] = useState(null);

 
   const handleInputChange = async (e) => {
      const { name, value } = e.target;
      if (name === 'code') {
          setCode(value);
          try {
              const response = await axios.get(`http://localhost:8070/code/${value}`);
              const data = response.data;
              if (data.expDate && new Date(data.expDate) < new Date()) {
                  setDiscount(null);
                  setCodeError("Expired code");
              } else {
                  setDiscount(data.discount);
                  setCodeError(null);
              }
          } catch (error) {
              setDiscount(null);
              setCodeError("Invalid code");
          }
      }
  };
  
 
   useEffect(() => {
     if (code) {
       axios.get(`http://localhost:8070/code/${code}`)
         .then(response => {
           if (response.data) {
             setDiscount(response.data.discount);
           } else {
             setDiscount(""); // Clear the discount if code not found
           }
         })
         .catch(error => {
           console.error('Error fetching code:', error);
         });
     }
   }, [code]);


   

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
    const [email, setEmail] = useState("");
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
       if (error.response && error.response.status === 404) {
           setData([]);
       } else {
           console.error("Error fetching data:", error);
       }
   }
};



     const handleCheckout = async () => {
    try {
        // Check if the cart is empty
        if (data.length === 0) {
            alert("Cart is empty. Please add items to proceed.");
            return;
        }

     
        validateEmail();

        if (emailError) {
            return; // Don't proceed if there are validation errors
        }

        if (codeError) {
         alert(" Expired coupon code. Please enter a valid code.");
         return;
     }

        if (code) {
            // Check if the provided code is valid
            try {
                const response = await axios.get(`http://localhost:8070/code/${code}`);
                const isValid = response.data !== null; // Assuming the backend returns null for invalid codes
                if (!isValid) {
                    alert("Please enter a valid coupon code.");
                    return;
                }
                // If valid, calculate discount amount
            } catch (error) {
                console.error("Error checking coupon code:", error);
                alert("An error occurred while checking the coupon code. Please try again.");
                return;
            }
        }
        const subTotal = (data.reduce((acc, item) => acc + parseFloat(item.price), 0) + 350).toFixed(2);
        const total = ((data.reduce((acc, item) => acc + parseFloat(item.price), 0)) + 350 - (discount !== null ? ((parseFloat(discount) / 100) * data.reduce((acc, item) => acc + parseFloat(item.price), 0)) : 0)).toFixed(2);

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
            code,
            email,
            deliveryFee: "350.00", // Make sure it's a string 
            discount,
            total,
            subTotal,
            details: data.map(({ itemName, type, price, shopName, itemId, quantity, date, size }) => ({
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

        // Add OverView entry
        const overviewData = {
            orderId,
            description: "New Order Added",
            date: new Date().toISOString()
        };
        await axios.post("http://localhost:8070/overview/addOverView", overviewData);

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
        

        await axios.delete("http://localhost:8070/cart/deleteAll");
        setData([]); // Clear the cart in the frontend

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




// Email validation function
const validateEmail = () => {
   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
       setEmailError("Invalid email address");
   } else {
       setEmailError("");
   }
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
            <div style={{width:"260px",marginRight:"10px"}}>
<Ads2></Ads2>

            </div>
            <div className="cards" style={{ marginTop: "25px", marginBottom: "20px" , marginLeft:"280px" }}>
               <div className="row" style={{ height: "640px" }}>
                  <div className="col-md-8 carts" style={{ maxHeight: '685px', overflowY: 'scroll' }}>
                     <div className="cart-header" style={{ position: 'sticky', top: '-34px', background: 'white', zIndex: '1', padding: '17px 0', borderBottom: '14px solid #7eabd8' }}>
                        <div>
                           <h6><a href="/Categories"> <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></a>Continue Shopping</h6></div>
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
                        <div className="col" style={{fontWeight: "bold", paddingLeft: "1" }}> ITEMS</div>
                        <div className="col" style={{fontWeight: "bold", paddingLeft: "0" }}>{data.length}</div>
                        <div className="col text-right" style={{fontWeight:"bold"}}>Rs {((data.reduce((acc, item) => acc + parseFloat(item.price), 0)) + 350 - (discount !== null ? ((parseFloat(discount) / 100) * data.reduce((acc, item) => acc + parseFloat(item.price), 0)) : 0)).toFixed(2)}
</div>
                     </div>
                    
                     <form>
                        <p style={{fontSize:"14px", marginBottom:"2px", marginTop:"20px"}}>SHIPPING</p>
                        <select><option className="text-muted">Standard-Delivery- 350.00</option></select>
                  
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
                    {emailError && <p style={{ color: "red", fontSize: "12px", marginBottom:"10px" }}>{emailError}</p>}
                        <p style={{fontSize:"14px", marginBottom:"2px"}}>GIVE COUPON CODE</p> 
                        <input name="code" placeholder="Enter code"value={code} onChange={handleInputChange} /> 
                        {code && discount === null && <p style={{  color: "red", fontSize: "12px", marginBottom:"10px" }}>Invalid code</p>}
                     </form>
                     <br></br>
                     <div className="row" style={{ borderTop: "3px solid black", padding: "1vh 0" }}>
                        <div className="col" style={{fontSize:"14px", fontWeight: 'bold'}}>SUB TOTAL </div>
                        <div className="col text-right">Rs {(data.reduce((acc, item) => acc + parseFloat(item.price), 0) + 350).toFixed(2)}</div>
                     </div>
                     <div className="row" style={{ padding: "1vh 0" }}>
    <div className="col" style={{ fontSize: "14px", fontWeight: "bold" }}>DISCOUNT</div>
    <div className="col text-right">
    {code ? (
    discount !== null ? (
        <span style={{ color: '#112174' }}>
            Rs {((parseFloat(discount) / 100) * data.reduce((acc, item) => acc + parseFloat(item.price), 0)).toFixed(2)}
        </span>
    ) : (
      <span>Rs 0.00</span>
    )
) : (
    <span>Rs 0.00</span>
)}
    </div>
</div>
                     <div className="row" style={{ borderTop: "3px solid black", padding: "2vh 0" }}>
                        <div className="col" style={{fontSize:"14px", fontWeight: 'bold'}}>TOTAL </div>
                        <div className="col text-right">Rs {((data.reduce((acc, item) => acc + parseFloat(item.price), 0)) + 350 - (discount !== null ? ((parseFloat(discount) / 100) * data.reduce((acc, item) => acc + parseFloat(item.price), 0)) : 0)).toFixed(2)}
</div>
                     </div>
                     <button className="btnn" onClick={handleCheckout} >CHECKOUT</button>
                  </div>
               </div>
            </div>
         </div>
         
         {/* <Footer /> */}
      </div>
     <FooterUI/>
      <ToastContainer/>
      </>
   );
}

export default Cart;
