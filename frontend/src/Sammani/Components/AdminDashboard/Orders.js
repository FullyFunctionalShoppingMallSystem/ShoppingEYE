import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBookOpen,faTrashAlt, faDownload ,faBell, faCog, faUser } from '@fortawesome/free-solid-svg-icons'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import headerImageURL from '../assets/img/logo.png';


function Order(){
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        // Fetch orders from backend when component mounts
        axios.get('http://localhost:8070/order/')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.orderId.startsWith(searchQuery)
);

const generatePDF = () => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();
  const content = [];
  const imgWidth = 15;
  const imgHeight = 15;
  pdf.addImage(headerImageURL, 'PNG', 10, 15, imgWidth, imgHeight);

  // Add logo and mall name
  const mallName = 'MAZZA GALLERIE';
  pdf.setFontSize(12);
  pdf.text(mallName, 25, 23);
  pdf.setFontSize(10);
  pdf.text('Online Shopping Mall Management', 25, 28);

  // Define the table headers
  const headers = [['Order ID', 'NIC', 'Email', 'Date', 'Status']];

  // Extract data for the table rows
  const data = filteredOrders.map(order => [order.orderId, order.nic, order.email, order.date, order.status]);

  // Set the table width and height
  const tableWidth = 190;
  const tableHeight = 10;

  // AutoTable plugin to generate the table
  pdf.autoTable({
      startY: 50,
      head: headers,
      body: data,
      theme: 'striped',
      margin: { top: 20 },
      styles: { fontSize: 8, cellPadding: 1, overflow: 'linebreak' },
      columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 30 }, 2: { cellWidth: 40 }, 3: { cellWidth: 30 }, 4: { cellWidth: 40 } }
  });

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      
      const name = 'Vishara D D S'; // Replace with the actual name
      const department = 'Products Management';
      const no = 'IT21822544';
      
      pdf.text(`${name}`, 15, 175);  // Adjust the Y-coordinate to move the name up
      pdf.text(`${no}`, 15, 180);    // Adjust the Y-coordinate to move the number up
      pdf.text(`${department}`, 15, 190);  // Adjust the Y-coordinate to move the department up
      
      const printedDate = new Date().toLocaleDateString();
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Printed on: ${printedDate}`, 15, 185); 
  // Save the PDF
  pdf.save("Mazza_Gallarie_Orders.pdf");
};



//delete
const handleDelete = (orderId, status) => {
  // Check if the order status is 'All Items Checked'
  if (status !== 'All items checked') {
    // Display alert that the order cannot be deleted
    window.alert(`Cannot delete "Pending Order" ID: ${orderId}.`);
    return;
  }

  // Send a DELETE request to the backend endpoint
  axios.delete(`http://localhost:8070/order/delete/${orderId}`)
      .then(response => {
         const description = "Order Deleted By Admin";
         const date = new Date().toISOString();
         axios.post("http://localhost:8070/overview/addOverView", { orderId, description, date })

          setOrders(orders.filter(order => order.orderId !== orderId));
          console.log('Order deleted successfully:', response.data);
          // Display success alert
          window.location.reload();
      })
      .catch(error => {
          console.error('Error deleting order:', error);
          // Display error alert
          window.alert('Error deleting order. Please try again later.');
      });
};


const handleViewOrder = (orderId) => {
  // Construct the URL with the orderId
  const viewOrderUrl = `/ViewOrder/${orderId}`;
  // Navigate to the constructed URL
  window.location.href = viewOrderUrl;
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
          <a className="nav-link text-white "  href="/dashboard">
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
          <a className="nav-link text-white active bg-gradient-primary " href="/Orders">
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
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Orders</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Online Orders</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline  ">
             
              <input style={{width:"300px"}} type="text" className="form-control" placeholder="Search Order..."
               id="searchContacts"  value={searchQuery}
               onChange={handleSearchChange}
              
               />
            <button className="btn btn-primary" onClick={handleSearchChange} type="button"> <FontAwesomeIcon icon={faSearch} size="lg" ></FontAwesomeIcon> </button>
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
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">ONLINE ORDERS TABLE</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
              <table className="table align-items-center mb-0 align-items-center table-flush" responsive="true">
    <thead>
      <tr>
      <th className="text-uppercase  text-sm  opacity-7 ps-2"></th>
        <th style={{color:"black"}} className="text-uppercase text-sm  opacity-7 ps-3">Order ID</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">NIC</th>
        <th style={{color:"black"}} className="text-uppercase  text-sm  opacity-7 ps-2">Email</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">Date</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">Status</th>

        

        <th ><button onClick={generatePDF} className="btn btn-info"> <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>  PDF</button></th>
      </tr>
    </thead>
    <tbody>
    {filteredOrders.map((order, index) => (
   
        <tr key={order._id}>

      <th className="text-uppercase  text-sm  opacity-7 ps-4">{index + 1}</th>
            <td>
                <div className="px-2 py-1">
                    <div>
                        <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{order.orderId}</p>
                    </div>
                </div>
            </td>
            <td>
                <h6 style={{color:"black"}} className="mb-0 text-sm"><td>{order.nic}</td></h6>
            </td>
            <td>
                <h6 style={{color:"black"}} className="mb-0 text-sm"><td>{order.email}</td></h6>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0"><td>{order.date}</td></p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{ color: order.status === 'pending' ? 'red' : order.status === 'All items checked' ? '#2cbd2cc4' : 'inherit' }}className="font-weight-bold mb-0"><td>{order.status}</td></p>
            </td>
            <td className="align-justify text-justify text-sm">
        
            <div style={{display: "flex"}}>
    <div style={{padding: "", display: "flex", alignItems: "center"}}>
  
  <button onClick={() => { console.log(order.orderId); handleViewOrder(order.orderId); }} style={{ width: "40px", height: "40px" }} type="button" className="btn btn-success d-flex justify-content-center align-items-center"> 
    <FontAwesomeIcon icon={faBookOpen} size="lg" style={{ margin: "auto" }} />
  </button>

    </div>
    <div style={{marginLeft: "10px", display: "flex", alignItems: "center"}}> 
        <button  onClick={() => handleDelete(order.orderId,order.status)} style={{width: "40px", height: "40px"}} type="button" className="btn btn-danger d-flex justify-content-center align-items-center"> 
            <FontAwesomeIcon icon={faTrashAlt} size="lg" style={{margin: "auto"}} />
        </button> 
    </div>
   
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

}export default Order;