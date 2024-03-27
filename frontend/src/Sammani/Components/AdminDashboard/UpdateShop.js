import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBookOpen , faTrashAlt,faUser,faBell,faCog} from '@fortawesome/free-solid-svg-icons'; 
import { useParams } from "react-router-dom";


function UpdateShop(){

    const { storeID } = useParams(); // Get the storeID from the URL parameters
    const [formData, setFormData] = useState({
        storeID: "",
        shopName: "",
        type: "",
        ownerName: "",
        nic: "",
        mobile: "",
        email: "",
        image: null
    });
    const [emailError, setEmailError] = useState("");
  const [nicError, setNicError] = useState("");
  const [mobileError, setMobileError] = useState("");

    useEffect(() => {
        // Fetch shop details based on the storeID
        axios.get(`http://localhost:8070/shop/getStoreId/${storeID}`)
            .then(response => {
                const shopData = response.data;
                // Update form data with fetched shop details
                setFormData({
                    ...shopData,
                    image: null // Assuming you don't want to pre-fill the image field
                });
            })
            .catch(error => {
                console.error('Error fetching shop details:', error);
                alert("Error fetching shop details. Please try again.");
            });
    }, [storeID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let isValid = true;
    
        // Email validation
        if (name === "email") {
          isValid = /\S+@\S+\.\S+/.test(value);
          if (!isValid) {
            setEmailError("Please enter a valid email address.");
          } else {
            setEmailError("");
          }
        }
    
        // NIC validation
        if (name === "nic") {
          isValid = /^[0-9]{9}[vVxX]?$/.test(value);
          if (!isValid) {
            setNicError("Please enter a valid NIC number.");
          } else {
            setNicError("");
          }
        }
    
        // Mobile number validation
        if (name === "mobile") {
          isValid = /^[0-9]{10}$/.test(value);
          if (!isValid) {
            setMobileError("Please enter a valid mobile number.");
          } else {
            setMobileError("");
          }
        }
    
        // If the input value is invalid, apply a red border
        if (!isValid) {
          e.target.style.borderColor = "red";
        } else {
          e.target.style.borderColor = ""; // Remove red border if input is valid
        }
    
        // Update form data
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if there are any validation errors before submitting
        if (emailError || nicError || mobileError) {
          alert("Please fix validation errors before submitting the form.");
          return;
        }
        try {
            const form = new FormData();
            form.append("storeID", formData.storeID);
            form.append("shopName", formData.shopName);
            form.append("type", formData.type);
            form.append("ownerName", formData.ownerName);
            form.append("nic", formData.nic);
            form.append("mobile", formData.mobile);
            form.append("email", formData.email);
            
            // Only append the image if it's not null
            if(formData.image !== null) {
                form.append("image", formData.image);
            }
    
            await axios.put(`http://localhost:8070/shop/update/${formData.storeID}`, form);
            alert("Shop details updated successfully");
            window.location.href = "/Shops";
            // Reset form fields after successful update if needed
            setFormData({
                storeID: "",
                shopName: "",
                type: "",
                ownerName: "",
                nic: "",
                mobile: "",
                email: "",
                image: null
            });
    
        } catch (error) {
            console.error("Error updating shop details:", error);
            alert("Error updating shop details. Please try again.");
        }
    };
    return(
        <>

<div className="g-sidenav-show  bg-gray-200">
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a className="navbar-brand m-0" href=" " target="_blank">
       
        <span className="ms-1 font-weight-bold text-white">MAZZA GALLERIE</span>
      </a>
    </div>
    <hr className="horizontal light mt-0 mb-2"/>
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link text-white " href="l">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">dashboard</i>
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="../pages/tables.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">table_view</i>
            </div>
            <span className="nav-link-text ms-1">Sales/Promotions</span>
          </a>
        </li>
       
        <li className="nav-item">
          <a className="nav-link text-white " href="/Orders">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">shopping_cart</i>
            </div>
            <span className="nav-link-text ms-1">Online Orders</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white active bg-gradient-primary" href="/Shops">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">store</i>
            </div>
            <span className="nav-link-text ms-1">Shops</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white  " href="/Contact-us-Table">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">list</i>
            </div>
            <span className="nav-link-text ms-1">Contacts</span>
          </a>
        </li>

      </ul>
    </div>
    <div className="sidenav-footer position-absolute w-100 bottom-0 ">
      <div className="mx-3">
        <a className="btn bg-gradient-primary w-100" href="" type="button">
       
              <i className="material-icons opacity-10">login</i>
            <span className="nav-link-text ms-3">Sign Out</span>
        </a>
      </div>
    </div>
  </aside>
 
      
<main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
   
<nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="">Pages</a></li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Shops</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Shops</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline  ">
             
              <input style={{width:"300px"}} type="text" className="form-control" placeholder="Search Shop..."
               id="searchContacts" 
               />
               <button className="btn btn-primary" type="button"> <FontAwesomeIcon icon={faSearch} size="lg" ></FontAwesomeIcon> </button>
            
            </div>
          </div>
          <ul className="navbar-nav  justify-content-end">
          <li className="nav-item px-3 d-flex align-items-center">
            <a href="" className="nav-link text-body p-0">
            <FontAwesomeIcon icon={faBell} size="m" style={{margin: "auto"}} />
            </a>
          </li>
          <li className="nav-item px-3 d-flex align-items-center">
            <a href="" className="nav-link text-body p-0">
            <FontAwesomeIcon icon={faCog} size="m" style={{margin: "auto"}} />
            </a>
          </li>

          <li className="nav-item px-3 d-flex align-items-center">
            <a href="" className="nav-link text-body p-0">
            <FontAwesomeIcon icon={faUser} size="m" style={{margin: "auto"}} />
            </a>
          </li>
        </ul>

        </div>
      </div>
    </nav>


<div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-2 pb-1">
                <h6 className="text-white text-capitalize ps-3"> UPDATE STORE ID :{formData.storeID} </h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
             
              <div style={{ height: "600px", width: "1000px", display: "flex" }}>
  <div style={{ height: "600px", width: "700px", marginLeft: "20px", borderRadius: "10px", display: "flex" }}>
  <form onSubmit={handleSubmit} encType="multipart/form-data">
    <div>
                <input required name="storeID" type="text" value={formData.storeID} onChange={handleChange} placeholder="Enter Store ID" />
                <input required name="shopName" type="text" value={formData.shopName} onChange={handleChange} placeholder="Enter Store Name" />
                <input required name="type" type="text" value={formData.type} onChange={handleChange} placeholder="Enter Store Type" />
                <input required name="ownerName" type="text" value={formData.ownerName} onChange={handleChange} placeholder="Enter Owner's Name" />
                
                <input  style={{ borderColor: nicError ? "red" : "" }}  required name="nic" type="text" value={formData.nic} onChange={handleChange} placeholder="Enter NIC" />
                {nicError && <p style={{ color: "red" }}>{nicError}</p>}

                <input  style={{ borderColor: mobileError ? "red" : "" }} required name="mobile" type="text" value={formData.mobile} onChange={handleChange} placeholder="Enter Mobile" />
                {mobileError && <p style={{ color: "red" }}>{mobileError}</p>}

                <input style={{ borderColor: emailError ? "red" : "" }} required name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
                {emailError && <p style={{ color: "red" }}>{emailError}</p>}

                <label htmlFor="img">Select image:</label>
                <input type="file" id="img" accept="image/*" onChange={handleFileChange} />
                <button className="btn btn-success" type="submit">Update Shop</button>
                </div>
            </form>
  </div>
  <div style={{ height: "200px", width: "250px", marginRight: "250px", marginTop: "10px" }}>
               
            </div></div>

              </div>
            </div>
          </div>
        </div>
      </div>
     
     
    </div>
     </main> 
     </div>

        </>
    )

}export default UpdateShop;