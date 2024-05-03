import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBookOpen , faTrashAlt,faUser,faBell,faCog} from '@fortawesome/free-solid-svg-icons'; 
import image1 from "../assets/img/logo.png"
import LoyaltyIcon from '@mui/icons-material/Loyalty';


function AddShop(){
  

  function onChangeFile(e) {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Set preview image
}

//Add
const [storeID, setStoreID] = useState("");
    const [shopName, setShopName] = useState("");
    const [type, setType] = useState("");
    const [ownerName, setownerName] = useState("");
    const [nic, setNic] = useState("");
    const [mobile, setmobile] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nicError, setNicError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [previewImage, setPreviewImage] = useState(null);


    function onChangeFile(e){
      setImage(e.target.files[0]);
    }
    
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          setEmailError("Please enter a valid email address.");
      } else {
          setEmailError("");
      }
    }
    
    function validateNIC(nic) {
      const nicRegex = /^[0-9]{9}V|^[0-9]{12}$/;
      if (!nicRegex.test(nic.toUpperCase())) {
          setNicError("Please enter a valid NIC number.");
      } else {
          setNicError("");
      }
    }
    
    function validateMobile(mobile) {
      const mobileRegex = /^(077|071)[0-9]{7}$/;
      if (!mobileRegex.test(mobile)) {
          setMobileError("Please enter a valid mobile number starting with 077 or 071.");
      } else {
          setMobileError("");
      }
    }
    
    function changeOnClick(e){
      e.preventDefault();   
    
      validateEmail(email);
      validateNIC(nic);
      validateMobile(mobile);
    
      if (emailError || nicError || mobileError) {
          alert("Please fix validation errors before submitting the form.");
          return;
      }
    
      const formData = new FormData();
      formData.append("storeID", storeID);
      formData.append("shopName", shopName);
      formData.append("type", type);
      formData.append("ownerName", ownerName);
      formData.append("nic", nic);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("image", image);
    
      const newForm = {
          storeID,
          shopName,
          type,
          ownerName,
          nic,
          mobile,
          email,
          image
      };
      console.log(newForm);
    
      axios.post("http://localhost:8070/shop/addShop",formData,{
          headers: {"Content-Type": "multipart/form-data"},
      }).then(() => {
          alert("Shop details added");
          setStoreID("");
          setShopName("");
          setownerName("");
          setType("");
          setNic("");
          setmobile("");
          setEmail("");
          // Reload the page after adding the product
          window.location.href = "/Orders";
      }).catch((err) => {
          alert(err);
      });
    }
    return(
        <>

<div className="g-sidenav-show  bg-gray-200">
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a className="navbar-brand m-0" href="/dashboard">
        <div style={{display:"flex"}}>
      <img src={image1} className="navbar-brand-img "  alt="main_logo"/> 
        <span className="ms-2 font-weight-bold text-white " style={{marginTop:"10px"}}  > MAZZA GALLERIE</span>
        </div>
      </a>
    </div>
    <hr className="horizontal light mt-0 mb-2"/>
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link text-white "  href="/dashboard">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">dashboard</i>
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="/sales">
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
        <li className="nav-item">
          <a className="nav-link text-white  " href="/loyaltyadminwatch">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
             <LoyaltyIcon/>
            </div>
            <span className="nav-link-text ms-1">Memberships</span>
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
             
              <input style={{width:"300px",height:"40px"}} type="text" className="form-control" placeholder="Search Shop..."
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
                <h6 className="text-white text-capitalize ps-3">  ADD NEW SHOP DETAILS </h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
             
              <div style={{ height: "600px", width: "1000px", display: "flex" }}>
  <div style={{ height: "600px", width: "700px", marginLeft: "20px", borderRadius: "10px", display: "flex" }}>
    <form  onSubmit={changeOnClick} encType="multipart/form-data" style={{ width: "450px", marginLeft: "30px" }}>
      <div>
        <input  value={storeID} required onChange={(e)=>{setStoreID(e.target.value);}} style={{ width: "400px" }} name="storeID" type="text" placeholder="ENTER STORE ID" />
        <input value={shopName} required onChange={(e)=>{setShopName(e.target.value);}} style={{ width: "400px" }} name="shopName" type="text" placeholder="ENTER STORE NAME" />
        <input value={type} required onChange={(e)=>{setType(e.target.value);}} style={{ width: "400px" }} name="type" type="text" placeholder="ENTER STORE TYPE" />
        <input value={ownerName} required onChange={(e)=>{setownerName(e.target.value);}} style={{ width: "400px" }} name="nic" type="text" placeholder="ENTER OWNER'S NAME" />
        <input value={nic}  required onChange={(e) => { setNic(e.target.value); validateNIC(e.target.value); }}
  style={{ width: "400px", borderColor: nicError ? "red" : "" }} name="nic" type="text" placeholder="ENTER NIC" />
        {nicError && <p style={{ color: "red" }}>{nicError}</p>}
        <input value={mobile} required onChange={(e) => { setmobile(e.target.value); validateMobile(e.target.value); }}
  style={{ width: "400px", borderColor: mobileError ? "red" : "" }} name="mobile" type="text" placeholder="ENTER MOBILE" />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <input value={email}  required onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
  style={{ width: "400px", borderColor: emailError ? "red" : "" }} name="email" type="email" placeholder="ENTER EMAIL" />
        <label htmlFor="img">Select image:</label>
        <input type="file" id="img" accept="image/*" onChange={onChangeFile}  />
        <input className="btn btn-success" type="submit" />
      </div>
    </form>
  </div>
  <div style={{ height: "200px", width: "250px", marginRight: "250px", marginTop: "10px" }}>
                {previewImage ? (
                    <img src={previewImage} alt="Selected" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                ) : (
                    <p>No image selected</p>
                )}
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

}export default AddShop;