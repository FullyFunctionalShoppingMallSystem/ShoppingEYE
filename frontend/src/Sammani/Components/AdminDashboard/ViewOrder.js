import React, { useState, useEffect} from "react";
import "../assets/css/headerUI.css"
import axios from "axios";
import "../assets/css/table.css"
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { faSearch,faBell, faCog, faUser,faDownload } from '@fortawesome/free-solid-svg-icons'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import headerImageURL from '../assets/img/logo.png';
import image1 from "../assets/img/logo.png"

function ViewOrder() {
    const [order, setOrder] = useState(null);
    const { orderId } = useParams(); // Extract orderId from the URL parameters
    const [allChecked, setAllChecked] = useState(false);
    const [masterCheckboxChecked, setMasterCheckboxChecked] = useState(false);
    const [updateButtonEnabled, setUpdateButtonEnabled] = useState(false);
  

    const generatePDF = () => {
      if (!order) return;
    
      // Create a new jsPDF instance
      const doc = new jsPDF();
      const content = [];
      const imgWidth = 15;
      const imgHeight = 15;
      doc.addImage(headerImageURL, 'PNG', 10, 15, imgWidth, imgHeight);
    
      // Add logo and mall name
      const mallName = 'MAZZA GALLERIE';
      doc.setFontSize(12);
      doc.text(mallName, 25, 23);
      doc.setFontSize(10);
      doc.text('Online Shopping Mall Management', 25, 28);
    
      // Add title for online order items details
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text('Online Order Items Details', 15, 80);
    
      // Add order details to PDF
      doc.text(`Order ID: ${order.orderId}`, 15, 45);
      // Add more order details as needed
    
      // Add main order table to PDF
      const mainTableData = [[order.orderId, order.nic, order.date, calculateTotalQuantity(), order.subTotal,order.discount?.discount || "0.00", order.deliveryFee, order.total]];
      doc.autoTable({
        head: [['Order ID', 'NIC', 'Purchased Date', 'Items', 'Sub Total', 'Discount', 'Delivery Fee', 'Total Price']],
        body: mainTableData,
        startY: 50
      });
    
      // Add ordered items table to PDF
      const itemTableData = order.details.map(item => [item.itemId, item.date, item.itemName, item.type, item.shopName, item.size, item.quantity, item.price]);
      doc.autoTable({
        head: [['Item ID', 'Date', 'Item Name', 'Type', 'Shop Name', 'Size', 'Quantity', 'Price']],
        body: itemTableData,
        startY: doc.autoTable.previous.finalY + 20 // Start the table below the main order table
      });
    
      doc.setFontSize(10);
     
      
      const name = 'Vishara D D S'; // Replace with the actual name
      const department = 'Products Management';
      const no = 'IT21822544';
      
      doc.text(`${name}`, 15, 160);  // Adjust the Y-coordinate to move the name up
      doc.text(`${no}`, 15, 167);    // Adjust the Y-coordinate to move the number up
      doc.text(`${department}`, 15, 181);  // Adjust the Y-coordinate to move the department up
      
      const printedDate = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Printed on: ${printedDate}`, 15, 174); 
    
      // Save the PDF
      doc.save(`Mazza_Gallerie_order_${orderId}.pdf`);
    };

  
    useEffect(() => {
      // Fetch order details from the backend
      axios.get(`http://localhost:8070/order/getOrder/${orderId}`)
        .then(response => {
          setOrder(response.data);
        })
        .catch(error => {
          console.error('Error fetching order details:', error);
        });
    }, [orderId]); 


   // Function to calculate total quantity
  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    if (order && order.details) {
      order.details.forEach((item) => {
        totalQuantity += parseInt(item.quantity);
      });
    }
    return totalQuantity;
  };


  

//check box 

useEffect(() => {
    if (order && order.details) {
      const allChecked = order.details.every((item) => item.isChecked);
      setAllChecked(allChecked);
    }
  }, [order]);

  // Function to handle master checkbox change
  const handleMasterCheckboxChange = (isChecked) => {
    const updatedDetails = order.details.map((item) => ({
      ...item,
      isChecked: isChecked,
    }));
    setOrder({ ...order, details: updatedDetails });
    setMasterCheckboxChecked(isChecked);
    setUpdateButtonEnabled(isChecked);
};

// Function to handle checkbox change
const handleCheckboxChange = (index, isChecked) => {
    const updatedDetails = [...order.details];
    updatedDetails[index].isChecked = isChecked;
    setOrder({ ...order, details: updatedDetails });

    const allChecked = updatedDetails.every((item) => item.isChecked);
    setAllChecked(allChecked);
    setMasterCheckboxChecked(allChecked);
    setUpdateButtonEnabled(allChecked);
};


//update status

const handleUpdateButtonClick = () => {
  // Update the status
  const updatedStatus = "All items checked";
  axios.put(`http://localhost:8070/order/update/${orderId}`, { status: updatedStatus })
      .then(response => {
         
          const description = "All Items Checked";
          const date = new Date().toISOString();
          axios.post("http://localhost:8070/overview/addOverView", { orderId, description, date })
              .then(() => {
                  window.location.href = "/Orders";
              })
              .catch(error => {
                  console.error('Error adding entry to OverView table:', error);
              });
      })
      .catch(error => {
          console.error('Error updating order status:', error);
      });
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
    {order && (
             
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-2 pb-1">
                <h6 className="text-white text-capitalize ps-3">ONLINE ORDER NO: {order.orderId}</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <div className="container">
              <div style={{border:"2px solid black"}}>
              <table className="table align-items-center mb-0 align-items-center table-flush" responsive="true">
                
    <thead style={{backgroundColor:"#d785b354"}}>
      <tr>
      <th style={{color:"black"}} className="text-uppercase  text-sm  opacity-7 ps-2">ID</th>
        <th style={{color:"black"}} className="text-uppercase  text-sm  opacity-7 ps-2">nic</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">purchased date</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2"> ITEMS</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2"> Sub total</th>
        <th style={{color:"black"}} className="text-uppercase text-sm  opacity-7 ps-2">Discount</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">delivery Fee</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">total price</th>
        <th className="text-secondary opacity-7"></th>
      </tr>
    </thead>
    <tbody><tr >
    <td className="align-justify text-justify text-sm">
                      <h6  className="mb-0 text-sm">{order.orderId}</h6>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{order.nic}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{order.date}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0"> {calculateTotalQuantity()}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{order.subTotal}</p>
            </td>
            <td>
            <p  style={{fontSize:"14px"}} className="font-weight-bold mb-0"> {order.discount?.discount || "0.00"}</p>
              
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{order.deliveryFee}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{order.total}</p>
            </td>
            <td className="align-justify text-justify text-sm">
               <input   onChange={(e) => handleMasterCheckboxChange(e.target.checked)}  checked={masterCheckboxChecked}  type="checkbox" style={{ width: '20px', height: '20px' }} />
            </td>
        </tr>
    

     
    </tbody>
  </table>
  </div>
   </div>        
                <br></br>
                <div className="container">
              <h2 style={{fontSize:"18px"}} > ONLINE ORDERED ITEMS </h2>
              <div style={{border:"2px solid black"}}>
              <table className="table align-items-center mb-0 align-items-center table-flush" responsive="true">
                
    <thead style={{backgroundColor:"#d785b354"}}>
      <tr>
      <th className="text-secondary opacity-7">NO</th>
        <th style={{color:"black"}} className="text-uppercase text-sm  opacity-7 ps-3">item id</th>
        <th style={{color:"black"}} className="text-uppercase  text-sm  opacity-7 ps-2">date</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">item name</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">type</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">shopname</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">size</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">quantity</th>
        <th  style={{color:"black"}}className="text-uppercase  text-sm  opacity-7 ps-2">price</th>
        <th className="text-secondary opacity-7"></th>
      </tr>
    </thead>
    <tbody>
    {order.details.map((item, index) => (
    <tr key={index} >
            <td>
                <div className="px-2 py-1">
                    <div>
                        <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{index + 1}</p>
                    </div>
                </div>
            </td>
            <td>
                <h6 style={{color:"black"}} className="mb-0 text-sm">{item.itemId}</h6>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{item.date}</p>
            </td>
            <td>
                <h6 style={{color:"black"}} className="mb-0 text-sm">{item.itemName}</h6>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{item.type}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{item.shopName}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{item.size}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{item.quantity}</p>
            </td>
            <td className="align-justify text-justify text-sm">
                <p style={{fontSize:"14px"}} className="font-weight-bold mb-0">{item.price}</p>
            </td>
            <td className="align-justify text-justify text-sm">
               <input onChange={(e) => handleCheckboxChange(index, e.target.checked)} checked={item.isChecked} type="checkbox" style={{ width: '20px', height: '20px' }} />
            </td>
        </tr>
     
         ))}
    </tbody>
  </table>
   </div>  

   <br></br>
   <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleUpdateButtonClick}
          style={{ width: "140px", height: "40px" }}
          type="button"
          className={`btn btn-danger d-flex justify-content-center align-items-center ${!updateButtonEnabled ? "disabled" : ""}`}
          disabled={!updateButtonEnabled}
        >
          <FontAwesomeIcon icon={faEdit} size="lg" style={{ margin: "auto" }} /> 
        </button>
        <button
          onClick={generatePDF}
          style={{ width: "140px", height: "40px" }}
          type="button"
          className="btn btn-info"
        >
          <FontAwesomeIcon icon={faDownload} size="lg" style={{ margin: "auto" }} />
        </button>
      </div>
    </div>
   <br></br>
   <br></br>
  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
     )}
     

    </div>
   
     </main> 
     {!order && <p>Loading...</p>}
     </div>

        </>
    )

}export default ViewOrder;