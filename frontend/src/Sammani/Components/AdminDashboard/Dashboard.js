import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faBell, faCog, faUser, faCalendarWeek } from '@fortawesome/free-solid-svg-icons'; 

function Dashboard(){
    const [totalOrders, setTotalOrders] = useState(0);
    const [yesterdayOrders, setYesterdayOrders] = useState(0);
    const [totalShops, setTotalShops] = useState(0);
    const [totalContact, setTotalContact] = useState(0);
    const [totalPeople, setTotalPeople] = useState(0); 

//users


//shops
 useEffect(() => {
        // Fetch shops from backend when component mounts
        axios.get('http://localhost:8070/shop/')
          .then(response => {
            setTotalShops(response.data.length); // Calculate total orders count
           
          })
          .catch(error => {
            console.error('Error fetching orders:', error);
          });
      }, []);


//orders
    useEffect(() => {
        // Fetch orders from backend when component mounts
        axios.get('http://localhost:8070/order/')
          .then(response => {
            setTotalOrders(response.data.length); // Calculate total orders count
            const yesterdayOrdersCount = response.data.filter(order =>
                new Date(order.date).toDateString() === new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toDateString()
              ).length;
              setYesterdayOrders(yesterdayOrdersCount);
          })
          .catch(error => {
            console.error('Error fetching orders:', error);
          });
      }, []);
    
      const percentageDifference = yesterdayOrders !== 0 ? ((totalOrders - yesterdayOrders) / yesterdayOrders) * 100 : 0;
      return (
    <>
    <div className="g-sidenav-show  bg-gray-200">
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0  my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
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
          <a className="nav-link text-white active bg-gradient-primary  " href="/dashboard">
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
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Admin Dashboard</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline  ">
             
              <input style={{width:"300px"}} type="text" className="form-control" placeholder="Search Order..."
               id="searchContacts" 
              
              
               />
            <button className="btn btn-primary"type="button"> <FontAwesomeIcon icon={faSearch} size="lg" ></FontAwesomeIcon> </button>
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
       
        <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2" style={{backgroundColor:"#6a48c3"}}>
            <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center  mt-n4 position-absolute" style={{height:"3.6em",width:"3.6em"}}>
              <i className="material-icons opacity-10">shopping_cart</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize" style={{color:"white"}}>Total Orders</p>
                <h4 className="mb-0" style={{color:"white"}}>{totalOrders}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"/>
            <div className="card-footer p-3">
            <p className="mb-0">
                  {percentageDifference > 0 ? (
                    <span className="text-success text-sm font-weight-bolder">+{percentageDifference.toFixed(2)}% </span>
                  ) : (
                    <span className="text-danger text-sm font-weight-bolder">+{percentageDifference.toFixed(2)}% </span>
                  )}
                  than yesterday
                </p> 
                 </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2" style={{backgroundColor:"#6a48c3"}}>
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center  mt-n4 position-absolute" style={{height:"3.6em",width:"3.6em"}}>
                <i className="material-icons opacity-10">store</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize" style={{color:"white"}}>Shops</p>
                <h4 className="mb-0" style={{color:"white"}}>{totalShops}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"/>
            <div className="card-footer p-3">
              <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+3% </span>than last month</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2" style={{backgroundColor:"#6a48c3"}}>
              <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center  mt-n4 position-absolute" style={{height:"3.6em",width:"3.6em"}}>
                <i className="material-icons opacity-10">contacts</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize" style={{color:"white"}}>Contact Issues</p>
                <h4 className="mb-0" style={{color:"white"}}>{totalContact}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"/>
            <div className="card-footer p-3">
              <p className="mb-0"><span className="text-danger text-sm font-weight-bolder">-2%</span> than yesterday</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-header p-3 pt-2" style={{backgroundColor:"#6a48c3"}}>
              <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center  mt-n4 position-absolute" style={{height:"3.6em",width:"3.6em"}}>
                <i className="material-icons opacity-10">people</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize" style={{color:"white"}}>Users</p>
                <h4 className="mb-0" style={{color:"white"}}>{totalPeople}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"/>
            <div className="card-footer p-3">
              <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+5% </span>than yesterday</p>
            </div>
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

export default Dashboard;