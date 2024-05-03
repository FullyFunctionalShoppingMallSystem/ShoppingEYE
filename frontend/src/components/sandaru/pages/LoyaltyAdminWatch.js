import React,{useState, useEffect} from "react";
import axios from "axios";
import "../assets/css/pageUI.css";
import "../assets/img/member.png";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import image1 from "../assets/img/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faBell, faCog, faUser, faDownload } from '@fortawesome/free-solid-svg-icons';
import headerImageURL from '../assets/img/logo.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



function LoyaltyAdminWatch() {
  const [loyalties, setLoyalties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchApprovedLoyalties();
  }, []);

  const fetchApprovedLoyalties = () => {
    axios.get('http://localhost:8070/createLoyalty/loyldis')
      .then(response => {
        setLoyalties(response.data);
      })
      .catch(error => {
        console.error('Error fetching loyalties:', error);
      });
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    axios.get(`http://localhost:8070/getEmail/${searchTerm}`)
      .then(response => {
        setLoyalties(response.data);
      })
      .catch(error => {
        console.error('Error fetching loyalties by email:', error);
      });
  };
  const filteredLoyalty = loyalties.filter(loyalty =>
    loyalty.email.startsWith(searchTerm)
  );
  
  const handleApprove = (loyalty) => {
    
    const approvedMembership = {
      fullName: loyalty.fullName,
      nic: loyalty.nic,
      phone: loyalty.phone,
      email: loyalty.email
    };
  
    axios
      .post(`http://localhost:8070/approvedMemberships/addMem`, approvedMembership)
      .then((response) => {
        alert('Membership Approved Successfully');
        console.log("Membership approved successfully:", response.data);
        // After approving, fetch updated list of loyalties
        fetchApprovedLoyalties();
      })
      .catch((error) => {
        console.error("Error approving membership:", error);
      });
  };

  const handleDeny = (nic) => {
    axios.delete(`http://localhost:8070/loyaltyAdminWatch/delete/${nic}`)
      .then(() => {
        alert('Loyalty membership request deleted');
        fetchApprovedLoyalties();
      })
      .catch((error) => {
        alert('Loyalty membership not found!');
        console.error('Error deleting Membership request', error);
      });
  };
     



  //pdf


  const generatePDF = () => {
    // Create a new jsPDF instance
    const customPageSize = { width: 590, height: 1000 };
    const pdf = new jsPDF('p', 'pt', [customPageSize.width, customPageSize.height]);
    const imgWidth = 50;
    const imgHeight = 50;
    pdf.addImage(headerImageURL, 'PNG', 30, 10, imgWidth, imgHeight);
  
    // Add logo and mall name
    const mallName = 'MAZZA GALLERIE';
    pdf.setFontSize(12);
    pdf.text(mallName, 80, 38);
    pdf.setFontSize(10);
    pdf.text('Online Shopping Mall Management', 80, 52);
  
    pdf.setFontSize(13);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Loyalty Memberships', 40, 95);
  
    // Define the table headers
    const headers = [['Name', 'NIC', 'Email', 'Phone']];
  
    // Extract data for the table rows
    const data = filteredLoyalty.map(loyalty => [loyalty.fullName || '', loyalty.nic || '', loyalty.email || '', loyalty.phone || '']);
  
    // Set the table width and height
    const tableWidth = 450;
    const tableHeight = 40;
  
    // AutoTable plugin to generate the table
    pdf.autoTable({
      startY: 110,
      head: headers,
      body: data,
      theme: 'striped',
      margin: { top: 20, left: 40 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
      columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 100 }, 2: { cellWidth: 150 }, 3: { cellWidth: 100 } }
    });
  
    const printedDate = new Date().toLocaleDateString();
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Printed on: ${printedDate}`, 40, 950);
  
    // Save the PDF
    pdf.save(`Mazza_Gallerie_Loyalty_Memberships_${new Date().toISOString()}.pdf`);
  };


    return(
        <>

<div className="g-sidenav-show  bg-gray-200">
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a className="navbar-brand m-0" href=" " target="_blank">
      <img src={image1} className="navbar-brand-img "  alt="main_logo"/> 
        <span className="ms-2 font-weight-bold text-white " style={{marginTop:"10px"}}  > MAZZA GALLERIE</span>
      </a>
    </div>
    <hr className="horizontal light mt-0 mb-2"/>
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link text-white " href="/dashboard">
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
          <a className="nav-link text-white  " href="/Orders">
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
            <span className="nav-link-text ms-1">Stores</span>
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
          <a className="nav-link text-white active bg-gradient-primary  " href="/LoyaltyAdminWatch">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <LoyaltyIcon/>
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
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Loyalty Memberships</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Loyalty Memberships</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline  ">
             
            <input value={searchTerm} onChange={handleSearchChange} placeholder="Search by email..." style={{width:"300px",height:"40px"}} type="text" className="form-control"
               id="searchContacts" 
              
              
               />
            <button  className="btn btn-primary"type="button"> <FontAwesomeIcon icon={faSearch} size="lg" ></FontAwesomeIcon> </button>
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
    <button onClick={generatePDF} style={{marginLeft:"30px"}} className="btn btn-dark" type="button"> <FontAwesomeIcon icon={faDownload}  size="lg"></FontAwesomeIcon> Generate PDF</button>

      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-2 pb-1">
                <h6 className="text-white text-capitalize ps-3">LOYALTY MEMBERSHIPS</h6>
                
                
              </div>
              <br></br>
              <div className='middlein'>
              <div className='card'>

              <div>
            
            <ul>
                {filteredLoyalty.map(loyalty => (
                    <li key={loyalty._id}>
                        <p>Name: {loyalty.fullName}</p>
                        <p>NIC: {loyalty.nic}</p>
                        <p>Email: {loyalty.email}</p>
                        <p>Phone: {loyalty.phone}</p>
                    <button  onClick={() => handleApprove(loyalty)} className="btn btn-success">
                    Approve
                  </button>
                  <br></br>
                  <button  onClick={()=> handleDeny(loyalty.nic)} className="btn btn-danger">
                    Deny
                  </button>
                    </li>
                    
                ))}
                
            </ul>
        </div>

              </div>
            </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">

               </div>           
               </div>          
                </div>       
                 </div>     
                  </div>
     

     
  </div>
    </main> 
  </div>

 </>
    );

}
export default LoyaltyAdminWatch;



