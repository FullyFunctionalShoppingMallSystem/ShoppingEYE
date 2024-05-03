import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBookOpen , faTrashAlt,faUser,faBell,faCog, faDownload} from '@fortawesome/free-solid-svg-icons'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import headerImageURL from '../assets/img/logo.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image1 from "../assets/img/logo.png"
import LoyaltyIcon from '@mui/icons-material/Loyalty';


function ContactTable(){



  const handleSearch = (e) => {
    const query = e.target.value.trim(); // Trim to remove leading/trailing spaces
    setSearchQuery(query);
    const filteredData = contacts.filter(contact =>
      contact.issueId.includes(query)
    );
    setFilteredContacts(filteredData);
  };

  const handleViewContact = (issueId) => {
    // Construct the URL with the orderId
    const viewIssueURL = `/viewContact/${issueId}`;
    // Navigate to the constructed URL
    window.location.href = viewIssueURL;
  };

  const generatePDF = (contact) => {
    console.log('Contact:', contact); // Log the contact object to the console
  
    // Create a new jsPDF instance
    const pdf = new jsPDF();
    const imgWidth = 15;
    const imgHeight = 15;
    pdf.addImage(headerImageURL, 'PNG', 10, 15, imgWidth, imgHeight);
  
    // Add logo and mall name
    const mallName = 'MAZZA GALLERIE';
    pdf.setFontSize(12);
    pdf.text(mallName, 25, 23);
    pdf.setFontSize(10);
    pdf.text('Online Shopping Mall Management', 25, 28);
  
    // Check if contact object exists and contains valid data
    if (contact && Object.keys(contact).length > 0) {
      const { issueId, name, email, date, message, status } = contact;
  
      pdf.setFillColor(255, 220, 220); // Light pink background
      pdf.rect(10, 40, 190, 200 , 'F'); // Background for contact details
   
      // Add contact details to the PDF
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Issue ID: ${issueId || ''}`, 15, 50);
      pdf.text(`Name: ${name || ''}`, 15, 60);
      pdf.text(`Email: ${email || ''}`, 15, 70);
      pdf.text(`Date: ${date || ''}`, 15, 80);
      pdf.setFont('helvetica', 'bold');
    pdf.text(`Description:`, 15, 90);
    // Reset font weight

    const messageLines = pdf.splitTextToSize(message || '', 180);
    const messageHeight = messageLines.length * 10;
    messageLines.forEach((line, index) => {
      pdf.text(line, 15, 100 + index * 10);
    });
      

    pdf.setFont('helvetica', 'normal');
      // Adjust starting position of status and other details based on message height
      const statusStartY = 100 + messageHeight + 5;
      pdf.text(`Status: ${status || ''}`, 15, statusStartY);

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Vishara D D S`, 15, statusStartY + 30);
      pdf.text(`IT21822544`, 15, statusStartY + 36);
      pdf.text(`Products Management`, 15, statusStartY + 42);
      const printedDate = new Date().toLocaleDateString();
      pdf.text(`Printed on: ${printedDate}`, 15, statusStartY + 47);
    } else {
      // Handle case when contact object is empty or undefined
      pdf.text('No contact details found.', 15, 50);
    }
  
    // Save the PDF
    pdf.save(`Mazza_Gallerie_Contact_Issue_}.pdf`);
};

  

  // Display
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8070/contact/")
      .then(response => {
        setContacts(response.data);
        setFilteredContacts(response.data);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  // Delete
  const handleDelete = async (issueId) => {
    try {
      // Delete contact from the server
      await axios.delete(`http://localhost:8070/contact/delete/${issueId}`);
      // Update local state to remove the deleted contact
      setContacts(prevContacts => prevContacts.filter(contact => contact.issueId !== issueId));
      // Update filteredContacts as well to reflect the change
      setFilteredContacts(prevContacts => prevContacts.filter(contact => contact.issueId !== issueId));

      // Show success toast message
      toast.success("Contact deleted successfully!", {
        style: {
          background: "black",
          color: "white"
        },
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
      // Show error toast message
      toast.error("Error deleting contact. Please try again later.");
    }
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
            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
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
            <a href="javascript:;" className="nav-link text-body p-0">
            <FontAwesomeIcon icon={faBell} size="m" style={{margin: "auto"}} />
            </a>
          </li>
          <li className="nav-item px-3 d-flex align-items-center">
            <a href="javascript:;" className="nav-link text-body p-0">
            <FontAwesomeIcon icon={faCog} size="m" style={{margin: "auto"}} />
            </a>
          </li>

          <li className="nav-item px-3 d-flex align-items-center">
            <a href="javascript:;" className="nav-link text-body p-0">
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
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">CONTACTS TABLE</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
              <table className="table align-items-center mb-0 align-items-center table-flush" responsive="true">
    <thead >
    
      <tr>
        <th style={{color:"black"}} className="text-uppercase text-sm  opacity-7 ps-3">Issue ID</th>
        <th style={{color:"black"}} className="text-uppercase  text-sm  opacity-7 ps-2">Name</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">Email</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">Date</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">Status</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">Updated Time</th>
 

        <th className="text-secondary opacity-7"></th>
      </tr>
     
    </thead>
    <tbody>
    {filteredContacts.map(contact => (
   
        <tr key={contact._id}>
            <td>
                <div className="px-2 py-1">
                    <div>
                        <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{contact.issueId}</p>
                    </div>
                </div>
            </td>
            <td>
                <h6 style={{color:"black"}} className="mb-0 text-sm">{contact.name}</h6>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{contact.email}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{contact.date}</p>
            </td>

            <td className="align-justify text-justify text-sm">
                <p style={{ color: contact.status === 'Pending' ? 'red' : contact.status === 'Issue resolved' ? '#2cbd2cc4' : 'inherit' }} className="font-weight-bold mb-0">{contact.status}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{contact.lastUpdatedtime}</p>
            </td>

            <div style={{display: "flex"}}>
    <div style={{padding: "", display: "flex", alignItems: "center"}}>
  
  <button  onClick={() => { console.log(contact.issueId); handleViewContact(contact.issueId); }} style={{ width: "40px", height: "40px" }} type="button" className="btn btn-success d-flex justify-content-center align-items-center"> 
    <FontAwesomeIcon icon={faBookOpen} size="lg" style={{ margin: "auto" }} />
  </button>

    </div>
    <div style={{marginLeft: "10px", display: "flex", alignItems: "center"}}> 
        <button  onClick={() => handleDelete(contact.issueId)} style={{width: "40px", height: "40px"}} type="button" className="btn btn-danger d-flex justify-content-center align-items-center"> 
            <FontAwesomeIcon icon={faTrashAlt} size="lg" style={{margin: "auto"}} />
        </button> 
    </div>

    <div style={{marginLeft: "10px", display: "flex", alignItems: "center"}}> 
        <button  onClick={() => generatePDF(contact)}style={{width: "40px", height: "40px"}} type="button" className="btn btn-info d-flex justify-content-center align-items-center"> 
            <FontAwesomeIcon icon={faDownload} size="lg" style={{margin: "auto"}} />
        </button> 
    </div>
</div>
      </tr>
    
))}
     
    </tbody>
  </table>
              </div>
            </div>
          </div>
        </div>
      </div>
     
     
    </div>
     </main> 
     </div>
     <ToastContainer />
        </>
    )

}export default ContactTable;