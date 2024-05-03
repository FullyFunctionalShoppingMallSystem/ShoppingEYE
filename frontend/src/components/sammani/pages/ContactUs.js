import React, { useState } from "react";
import "../assets/css/headerUI.css"
import Header from "../MainHeader.js";
// import Footer from "../Footer.js";
import axios from "axios";  
import "../assets/css/ContactUs.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterUI from "../FooterUI.js";



function ContactUs(){
  //create 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend
      const response = await axios.post("http://localhost:8070/contact/addIssue", {
        name: fullName,
        email: email,
        message: message,
      });

      // Log the response from the backend
      console.log(response.data);

      // Reset form fields after successful submission
      setFullName("");
      setEmail("");
      setMessage("");

      toast.success('Issue details added successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "black",
          color: "white"
        }
      });

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };




    return(
        <>
        <div className="">
<Header></Header>
<br></br>
<br></br>
<br></br>
<br></br>
        <section>
    <div className="page-header min-vh-100">
      <div className="container">
        <div className="row">
          <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-3 text-center justify-content-center flex-column">
            <div className="position-relative h-100 m-3 border-radius-lg d-flex flex-column justify-content-center bgimg1"  
           style={{
            backgroundSize: 'cover',
            paddingRight:"45rem",
            marginLeft:"4rem"
          }} loading="lazy">
            </div>
          </div> 
          <div className="col-xl-5 col-lg-6 col-md-7 d-flex flex-column ms-auto ms-lg-auto " >
            <div className="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5" >
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div className="bg-gradient-primary shadow-primary border-radius-lg p-3">
                  <h3 className="text-white text-primary mb-0">Contact us</h3>
                </div>
              </div>
              <div className="card-body">
                <p className="pb-3" style={{color:"black"}}>
                  For further questions, including partnership opportunities, please email MazzaGallerie@gmail.com
                  or contact using our contact form.
                </p>
                <form id="contact-form" method="post" autocomplete="off" onSubmit={handleSubmit}>
                  <div className="card-body p-0 my-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-group input-group-static mb-4">
                          <label  style={{color:"black"}}>Full Name</label>
                          <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Full Name"
                                  value={fullName}
                                  onChange={(e) =>
                                    setFullName(e.target.value)
                                  }
                                  required
                                />
                        </div>
                      </div>
                      <div className="col-md-6 ps-md-2">
                        <div className="input-group input-group-static mb-4">
                          <label style={{color:"black"}} >Email</label>
                          <input
                                  type="email"
                                  className="form-control"
                                  placeholder="MazzaGallerie@gmail.com"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-0 mt-md-0 mt-4">
                      <div className="input-group input-group-static mb-4">
                        <label  style={{color:"black"}}>How can we help you?</label>
                        <textarea
                                name="message"
                                className="form-control"
                                id="message"
                                rows="6"
                                placeholder="Describe your problem in at least 250 characters"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                              ></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <button type="submit" className="btn bg-gradient-primary mt-3 mb-0">Send Message</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            
            </div>
            
        
          </div>
         
        </div>
     
      </div>
     
    </div>

  </section>

        </div>
        <br></br>
       <FooterUI/>
    
<ToastContainer/>

        </>
    )

}export default ContactUs;