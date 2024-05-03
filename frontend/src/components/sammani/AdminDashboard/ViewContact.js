import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSearch,faUser,faBell,faCog} from '@fortawesome/free-solid-svg-icons'; 
import { useParams } from "react-router-dom";
import image1 from "../assets/img/logo.png"
import LoyaltyIcon from '@mui/icons-material/Loyalty';


function ViewContact(){

    const { issueId } = useParams();
    const [issue, setIssue] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        // Fetch order details from the backend
        axios.get(`http://localhost:8070/contact/getIssue/${issueId}`)
          .then(response => {
            setIssue(response.data);
          })
          .catch(error => {
            console.error('Error fetching Issue description:', error);
            alert(`Error fetching Issue : ${issueId} description:`);
          });
      }, [issueId]); 
  

  const handleSearch = (e) => {
    const query = e.target.value.trim(); // Trim to remove leading/trailing spaces
    setSearchQuery(query);
    const filteredData = contacts.filter(contact =>
      contact.issueId.includes(query)
    );
    setFilteredContacts(filteredData);
  };


    //display
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredContacts, setFilteredContacts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8070/contact/") // Assuming your backend endpoint is at /api/contacts
          .then(response => {
            setContacts(response.data);
            setFilteredContacts(response.data);

          })
          .catch(error => {
            console.error('Error fetching contacts:', error);
          });
      }, []);

//update
const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setIsButtonDisabled(isChecked); // Disable button when checkbox is checked
};

const handleUpdateStatus = () => {
    // Update status and lastUpdatedTime fields
    const updateData = {
        status: "Issue resolved", // Change to the desired status value
        lastUpdatedTime: new Date().toLocaleString() // Update with current date and time
    };

    axios.put(`http://localhost:8070/contact/update/${issueId}`, updateData)
        .then(response => {
            console.log(response.data);
            // Handle success, maybe show a success message
            window.location.href = "/Contact-us-Table";
        })
        .catch(error => {
            console.error('Error updating issue status:', error);
            // Handle error
        });
};



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
          <a className="nav-link text-white " href="/Shops">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">store</i>
            </div>
            <span className="nav-link-text ms-1">Shops</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white active bg-gradient-primary " href="/Contact-us-Table">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">list</i>
            </div>
            <span className="nav-link-text ms-1">Contacts</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white  " href="/loyaltyadminwatch">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <LoyaltyIcon></LoyaltyIcon>
            </div>
            <span className="nav-link-text ms-1">Memberships</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white  " href="/person/personlist">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i className="material-icons opacity-10">face</i>
            </div>
            <span className="nav-link-text ms-1">Users</span>
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
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Contacts</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Contacts</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline  ">
             
              <input style={{width:"300px",height:"40px"}} type="text" className="form-control" placeholder="Search Contacts..."
               id="searchContacts"  value={searchQuery}
               onChange={handleSearch}
               />
               <button className="btn btn-primary" onClick={handleSearch} type="button"> <FontAwesomeIcon icon={faSearch} size="lg" ></FontAwesomeIcon> </button>
            
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
      <div className="row">
        <div className="col-12">
        {issue && (
          <div className="card my-4" style={{height:"500px"}}>
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
  <div className="bg-gradient-primary shadow-primary border-radius-lg pt-2 pb-1" style={{display:"wrap"}}>
    <div className="d-flex align-items-center ps-3">
      <h6 className="text-white text-capitalize mb-0">ISSUE ID: {issue.issueId}</h6>
    
    </div>
  </div>
</div>
<br></br>
            <h6 style={{marginLeft:"20px"}}>DESCRIPTION :</h6>
            <br></br>
            <div>
           <p style={{marginLeft:"20PX", color:"black"}}> {issue.message}</p>
</div>
<br></br> <br></br> <br></br> <br></br> <br></br>


<div style={{display:"flex"}}>
<input checked={isChecked} onChange={handleCheckboxChange} style={{ width: '20px', height: '20px' , marginLeft:"20px"}}  type="checkBox"></input>
<p style={{marginLeft:"15px", color:" black"}}><b>If the issues related to the user is concerned and solved,there by sent and email to the user email, Please update the status of the issue</b></p>
 </div>
           
           <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" , marginLeft:"750px"}}>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{ width: "140px", height: "40px" }}
          type="button"
          className="btn btn-danger d-flex justify-content-center align-items-center"
          onClick={handleUpdateStatus}
         disabled={isButtonDisabled} 
        >
          <FontAwesomeIcon icon={faEdit} size="lg" style={{ margin: "auto" }} />  Update
        </button>
       
      </div>
    </div>
          </div>
        )}
       
        </div>
      </div>
     </div>
     </main> 
     </div>

        </>
    )

}export default ViewContact;