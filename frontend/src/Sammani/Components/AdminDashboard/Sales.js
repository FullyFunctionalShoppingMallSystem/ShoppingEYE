import React, { useState, useEffect} from "react";
import "../assets/css/headerUI.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faBell, faCog, faUser,faDownload } from '@fortawesome/free-solid-svg-icons'; 
import image1 from "../assets/img/logo.png"
import "../assets/css/popup.css"
function Sales() {
  const [showModal, setShowModal] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [filteredSalesData, setFilteredSalesData] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    date: new Date().toISOString().substr(0, 10),
    expDate: "",
    discount: ""
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/code/addCode', formData);
      console.log("Code added successfully");
  
      // Refresh the page after successful submission
      window.location.reload();
  
      // You may want to do something after successfully adding the code, like closing the modal or updating UI
    } catch (error) {
      console.error("Error adding code:", error);
      // Handle error, show notification, etc.
    }
  };

  const handleClear = () => {
    setFormData({
        code: "",
        description: "",
        date: new Date().toISOString().substr(0, 10),
        expDate: "",
        discount: ""
    });
};

useEffect(() => {
  // Fetch sales data from backend API
  axios.get('http://localhost:8070/code')
    .then(response => {
      setSalesData(response.data);
      setFilteredSalesData(response.data);
    })
    .catch(error => {
      console.error('Error fetching sales data:', error);
    });
}, []);

const handleSearch = (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredData = salesData.filter(item => {
    return item.code.toLowerCase().startsWith(searchTerm);
  });
  setFilteredSalesData(filteredData);
};


    return(
        <>

<div className="g-sidenav-show  bg-gray-200">
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a className="navbar-brand m-0" href="/dashboard" >
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
          <a className="nav-link text-white active bg-gradient-primary  " href="/sales">
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
          <a className="nav-link text-white " href="/Shops">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">store</i>
            </div>
            <span className="nav-link-text ms-1">Shops</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white  " href="/Contact-Us-Table">
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
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Sales</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Sales / Promotion </h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline  ">
             
              <input style={{width:"300px"}} type="text" className="form-control" onChange={handleSearch} placeholder="Search Code..."      
               />
<button className="btn btn-primary" type="button"> <FontAwesomeIcon icon={faSearch} size="lg" ></FontAwesomeIcon> </button>

            </div>
          </div>

       
          <ul className="navbar-nav  justify-content-end">
          <li className="nav-item px-3 d-flex align-items-center">
            <a href="" className="nav-link text-body p-0">
            <FontAwesomeIcon icon={faBell} size="1x" style={{margin: "auto"}} />
            </a>
          </li>
          <li className="nav-item px-3 d-flex align-items-center">
            <a href="" className="nav-link text-body p-0">
            <FontAwesomeIcon icon={faCog} size="1x" style={{margin: "auto"}} />
            </a>
          </li>

          <li className="nav-item px-3 d-flex align-items-center">
            <a href="" className="nav-link text-body p-0">
            <FontAwesomeIcon icon={faUser} size="1x" style={{margin: "auto"}} />
            </a>
          </li>
        </ul>
        </div>
      </div>
    </nav>
    <div className="container-fluid py-4">
<div style={{display:"flex"}}>
    <div className="col-md-12 mb-lg-0 mb-4" style={{width:"50%"}}>
              <div className="card mt-4">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0">Promotion Codes</h6>
                    </div>
                    <div className="col-6 text-end">
                      <button className="btn bg-gradient-primary mb-0" onClick={toggleModal}><i className="material-icons text-sm">add</i>&nbsp;&nbsp;Add Code</button>
                    </div>
                    <br></br>
                    <br></br>


                    <ul className="list-group">
                    {filteredSalesData.map((item, index) => {
    // Calculate if the expiration date has passed
    const isExpired = new Date(item.expDate) < new Date();

    return (
      <li key={index} className={`list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg ${isExpired ? 'bg-danger' : ''}`}>
        <p className="">{index + 1}</p>
        <div className="d-flex flex-column" style={{ marginRight: "70px", width: "150px" }}>
          <h6 className="mb-1 text-dark font-weight-bold text-sm">{item.code}</h6>
          <span className="text-xs">{item.description}</span>
        </div>
        <div className="d-flex align-items-center text-sm" style={{ marginRight: "20px" }}>
          <h6  className="text-success">{item.discount}&nbsp;&nbsp;&nbsp;&nbsp;</h6>
          <h6>Exp: <span className="text-xs" style={{ color: "blue" }}>{item.expDate}</span></h6>
        </div>
      </li>
    );
  })}
</ul>


                  </div>
                </div>
<br></br>
              </div>
              
            </div>

            jfevjefvef
            </div>
  
    </div>
   
     </main> 
   
     </div>
     {showModal && (
      
                <div className="modal">
                    <div className="modal-contents">
                     <span className="cross" onClick={toggleModal}>&times;</span>
                     <form onSubmit={handleSubmit}>
                       <label className="text-primary" style={{marginBottom:"0rem" ,color:"black"}}><b>Promotion Code</b></label>
                       <div className="input-group input-group-outline">
      <input type="text" id="textInput" name="code"  value={formData.code}
                  onChange={handleChange} className="form-control"  required/>
    </div>

    <label className="text-primary" style={{marginBottom:"0rem" ,color:"black"}}><b>Discount</b></label>
    <div className="input-group input-group-outline">
      <input type="text" name="discount" value={formData.discount}
                  onChange={handleChange} className="form-control"  required/>
    </div>

    <label className="text-primary" style={{marginBottom:"0rem" ,color:"black"}}><b>Expiry Date</b></label>
<div className="input-group input-group-outline" >
  <input 
    type="date"
    value={formData.expDate}
    onChange={handleChange} 
    name="expDate" 
    min={new Date().toISOString().split('T')[0]}
    className="form-control"
    required
  />
</div>
    <label className="text-primary" style={{marginBottom:"0rem" ,color:"black"}}><b>Description</b></label>
    <div className="input-group input-group-outline">
      <input type="text"  value={formData.description}
                  onChange={handleChange} name="description" className="form-control"/>
    </div >
    <button className="btn bg-gradient-success mb-0" >Submit</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn bg-gradient-danger mb-0" onClick={handleClear} >Clear</button>
                        </form>

                        


                    </div>
                </div>
              
            )}
        </>
    )

}export default Sales;