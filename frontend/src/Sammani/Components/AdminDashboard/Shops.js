import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faDownload,faSearch,faPlus, faTrashAlt,faUser,faBell,faCog, faBookOpen} from '@fortawesome/free-solid-svg-icons'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import headerImageURL from '../assets/img/logo.png';


function Shops(){

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

//pdf
const generatePDF = () => {
  // Create a new jsPDF instance


  const customPageSize = { width: 590, height: 1000 };
  const pdf = new jsPDF('p', 'pt', [customPageSize.width, customPageSize.height]);
  const content = [];
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
  pdf.text('Mazza Gallarie Stores', 40, 95);

  // Define the table headers
  const headers = [['Store ID', 'Issued Date', 'Shop Name', 'Type', 'Owner Name', 'NIC', 'Email', 'Mobile']];

  // Extract data for the table rows
  const data = searchResults.map(shop => [shop.storeID, shop.issuedDate, shop.shopName, shop.type, shop.ownerName, shop.nic, shop.email, shop.mobile]);

  // Set the table width and height
  const tableWidth = 190;
  const tableHeight = 10;

  // AutoTable plugin to generate the table
  pdf.autoTable({
    startY: 110,
    head: headers,
    body: data,
    theme: 'striped',
    margin: { top: 20, marginLeft:10 },
    styles: { fontSize: 8, cellPadding: 1, overflow: 'linebreak' },
    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 50 }, 2: { cellWidth: 70 }, 3: { cellWidth: 65 }, 4: { cellWidth: 80 }, 5: { cellWidth: 65 }, 6: { cellWidth: 90 }, 7: { cellWidth: 50 } }
  });

  pdf.setFontSize(10);
  pdf.setTextColor(0, 0, 0);

  const name = 'Vishara D D S'; // Replace with the actual name
  const department = 'Products Management';
  const no = 'IT21822544';

  pdf.text(`${name}`, 40, 450);  // Adjust the Y-coordinate to move the name up
  pdf.text(`${no}`, 40, 463);    // Adjust the Y-coordinate to move the number up
  pdf.text(`${department}`, 40, 487);  // Adjust the Y-coordinate to move the department up

  const printedDate = new Date().toLocaleDateString();
  pdf.setFontSize(10);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Printed on: ${printedDate}`, 40, 475);
  // Save the PDF
  pdf.save("Mazza_Gallarie_Shops.pdf");
};


//display
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8070/shop/") // Assuming your backend endpoint is at /api/contacts
      .then(response => {
        setShops(response.data);

      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);


  // Filter shops based on search term
  useEffect(() => {
    const results = shops.filter(shop =>
      shop.shopName.toLowerCase().startsWith(searchTerm.toLowerCase())
      || shop.storeID.startsWith(searchTerm) 
    );
    setSearchResults(results);
  }, [searchTerm, shops]);

  const handleSearch = () => {
    setSearchTerm(document.getElementById('searchShops').value);
  };

  const handleViewOrder = (storeID) => {
    // Construct the URL with the orderId
    const viewOrderUrl = `/updateShop/${storeID}`;
    // Navigate to the constructed URL
    window.location.href = viewOrderUrl;
  };

//delete
const handleDeleteShop = (storeID) => {
  axios.delete(`http://localhost:8070/shop/delete/${storeID}`)
    .then(response => {
      // Filter out the deleted shop from the state
      setShops(shops.filter(shop => shop.storeID !== storeID));
      alert("Shop deleted successfully.");
    })
    .catch(error => {
      console.error('Error deleting shop:', error);
      alert("Error deleting shop. Please try again later.");
    });
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
          <a className="nav-link text-white active bg-gradient-primary " href="/Shops">
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
            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Shops</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Shops</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline  ">
             
              <input   onChange={handleSearch}  style={{width:"300px"}} type="text" className="form-control" placeholder="Search Shop..."
               id="searchShops"  
               
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
<br></br>
   <a href="/addShops"> <button style={{marginLeft:"30px"}} className="btn btn-dark" type="button"> <FontAwesomeIcon icon={faPlus} size="lg"></FontAwesomeIcon> Add Shop</button></a>

<div className="container-fluid ">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">SHOP DETAILS TABLE</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
              <table className="table align-items-center mb-0 align-items-center table-flush" responsive="true">
    <thead >
    
      <tr>
      <th className="text-secondary opacity-7"></th>
        <th style={{color:"black"}} className="text-uppercase text-sm  opacity-7 ps-3">Store id</th>
        <th style={{color:"black"}} className="text-uppercase  text-sm  opacity-7 ps-2">Issued date</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">Shop name</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">type</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">owner Name</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">Nic </th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">email </th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">mobile </th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">last Updated </th>
        <th ><button onClick={generatePDF}  className="btn btn-info"> <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>  Download PDF</button></th>
      </tr>
     
    </thead>
    <tbody>
    {searchResults.map((shop, index) => (
                          <tr key={shop._id}>
            <td>
                <div className="px-2 py-1">
                    <div>
                        <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{index+1}</p>
                    </div>
                </div>
            </td>
            <td>
                <h6 style={{color:"black"}} className="mb-0 text-sm">{shop.storeID}</h6>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{shop.issuedDate}</p>
            </td>
            <td>
                <h6 style={{color:"black"}} className="mb-0 text-sm">{shop.shopName}</h6>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{shop.type}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{shop.ownerName}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{shop.nic}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{shop.email}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{shop.mobile}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{shop.lastUpdated}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <div style={{display:"flex"}}>

        <div style={{marginLeft:"10px"}}> 
                    <button onClick={() => { console.log(shop.storeID); handleViewOrder(shop.storeID); }} style={{width: "40px", height: "40px"}} type="button" className="btn btn-dark d-flex justify-content-center align-items-center"> 
            <FontAwesomeIcon icon={faEdit} size="lg" style={{margin: "auto"}} />
        </button>                     </div>


        <div style={{marginLeft:"10px"}}> 
                    <button onClick={() => handleDeleteShop(shop.storeID)} style={{width: "40px", height: "40px"}} type="button" className="btn btn-danger d-flex justify-content-center align-items-center"> 
            <FontAwesomeIcon icon={faTrashAlt} size="lg" style={{margin: "auto"}} />
        </button>                     </div>
                </div>
            </td>
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

        </>
    )

}export default Shops;