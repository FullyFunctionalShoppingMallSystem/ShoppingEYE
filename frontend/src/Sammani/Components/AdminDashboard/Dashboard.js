import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faBell, faCog, faUser, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import Chart from "chart.js/auto";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import image1 from "../assets/img/logo.png"


function Dashboard(){
    const [totalOrders, setTotalOrders] = useState(0);
    const [yesterdayOrders, setYesterdayOrders] = useState(0);
    const [totalShops, setTotalShops] = useState(0);
    const [totalContact, setTotalContact] = useState(0);
    const [totalPeople, setTotalPeople] = useState(0); 
    const [currentOrders, setCurrentOrders] = useState([]);
    const [overview, setOverview] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

//overview
useEffect(() => {
       
  axios.get("http://localhost:8070/overview/") // Fetch OverView entries
      .then(response => {
          const overview = response.data;
          setOverview(overview);
      })
      .catch(error => {
          console.error('Error fetching overview:', error);
      });
}, []);



//chart
const [orderCountsByDayOfWeek, setOrderCountsByDayOfWeek] = useState({});
const [lastUpdateTime, setLastUpdateTime] = useState("");

useEffect(() => {
  // Fetch orders from backend when component mounts
  axios.get("http://localhost:8070/order/")
    .then(response => {
      const orders = response.data;

      // Group orders by day of the week
      const ordersByDayOfWeek = {};
      orders.forEach(order => {
        const date = new Date(order.date);
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        ordersByDayOfWeek[dayOfWeek] = (ordersByDayOfWeek[dayOfWeek] || 0) + 1;
      });
      setOrderCountsByDayOfWeek(ordersByDayOfWeek);
      setLastUpdateTime(new Date().toLocaleString());
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
    });
}, []);

useEffect(() => {
  // Fetch orders from backend when component mounts
  axios.get("http://localhost:8070/order/")
    .then(response => {
      const orders = response.data;
      const currentDate = new Date().toLocaleDateString("en-US");

      // Filter orders made on the current date
      const ordersToday = orders.filter(order => {
        const orderDate = new Date(order.date).toLocaleDateString("en-US");
        return orderDate === currentDate;
      });

      setCurrentOrders(ordersToday);
      setLastUpdateTime(new Date().toLocaleString());
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
    });
}, []);


useEffect(() => {
  // Clear orders after 24 hours
  const timer = setTimeout(() => {
    setCurrentOrders([]);
  }, 86400000); // 24 hours in milliseconds

  return () => clearTimeout(timer);
}, [currentOrders]);


useEffect(() => {
  // Chart data
  const data = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"],
      datasets: [
          {
              label: "Sales",
              tension: 0.4,
              borderWidth: 0,
              borderRadius: 4,
              borderSkipped: false,
              backgroundColor: "rgba(255, 255, 255, .8)",
              data: Object.values(orderCountsByDayOfWeek),
              maxBarThickness: 6
             
          },
      ],
  };

  // Chart options
  const options = {
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  color: "white", // Set the color of the y-axis labels to white
                  stepSize: 2, 
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.3)", // Set the color of the grid lines to white with 30% opacity
                  borderDash: [3, 3], // Set the border dash style to create dotted lines
                },
          },
          x: {
              ticks: {
                color: "white", // Set the color of the x-axis labels to white
              },
              grid: {
                color: "rgba(255, 255, 255, 0.3)", // Set the color of the grid lines to white with 30% opacity
                borderDash: [3, 3], // Set the border dash style to create dotted lines
              },
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
            tooltip: {
              enabled: false, // Disable tooltips
            },
          },
        };

  // Get chart canvas
  const ctx = document.getElementById("chart-line");

  // Destroy previous chart instance if exists
  const existingChartInstance = Chart.getChart(ctx);
  if (existingChartInstance) {
      existingChartInstance.destroy();
  }

  // Create new chart instance
  new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
  });
}, [orderCountsByDayOfWeek]);




    // Fetch total number of users
    useEffect(() => {
      axios.get("http://localhost:8070/users/")
        .then(response => {
          setTotalPeople(response.data.length);
        })
        .catch(error => {
          console.error('Error fetching total users:', error);
        });
    }, []);


//contact
useEffect(() => {
    axios.get("http://localhost:8070/contact/")
      .then(response => {
        setTotalContact(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

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

      const handleDateChange = (date) => {
        setSelectedDate(date);
        // You can perform any action here when the date changes
    };
    
      const percentageDifference = yesterdayOrders !== 0 ? ((totalOrders - yesterdayOrders) / yesterdayOrders) * 100 : 0;
      return (
    <>
    <div className="g-sidenav-show  bg-gray-200">
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0  my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a className="navbar-brand m-0" href=" " target="_blank">
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

      <div className="row mt-4">
       
      <div className="col-lg-4 col-md-6 mt-4 mb-4">
          <div className="card z-index-2  ">
            <div className="card-header p-0 position-relative mt-n4 mx-2 z-index-2 bg-transparent">
            <div className="bg-gradient-primary shadow-primary border-radius-lg py-5 pe-1">
                <div className="chart">
                  <canvas id="chart-line" className="chart-canvas" height="150"></canvas>
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 "> Daily Sales </h6>
              <hr className="dark horizontal"/>
              <div className="d-flex ">
                <i className="material-icons text-sm my-auto me-1">schedule</i>
                <p className="mb-0 text-sm"> {lastUpdateTime} </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6" style={{height:"370px"}}>
          <div className="card h-100">
            <div className="card-header pb-0" style={{padding:" 0.5rem"}} >
              <h6>Orders overview</h6>
              <p class="text-sm">
              Today's Overview: {new Date().toLocaleDateString()}
              </p>
             
              <div style={{ maxHeight: "270px", overflowY: "auto" , width:"270px" }}>
              <table>
            
                <tbody>
             {overview.map((item, index) => (
                          <tr key={index} style={{height:"50px"}}>
 <td style={{ backgroundColor: item.description === 'All Items Checked' ? '#0080153b' : item.description === 'Order Deleted By Admin' ? '#FFCCCC' : '#8000803b', width: "270px" }}>                              <div className="timeline timeline-one-side">
                                <div className="timeline-block mb-1" style={{marginTop:"5px",}}>
                                <span className="timeline-step">
              {item.description === 'New Order Added' ? (
                <i className="material-icons text-info text-gradient">shopping_cart</i>
              ) : item.description === 'Order Deleted By Admin' ? (
                <i className="material-icons text-danger text-gradient">delete</i>
              ) : (
                <i className="material-icons text-success text-gradient">check</i>
              )}
            </span>
                                  <div className="timeline-content">
                                    <h6 className="text-dark text-sm font-weight-bold mb-0">Order ID : {item.orderId} </h6>
                                    <p className={`font-weight-bold text-xs mt-1 mb-0 ${item.description === 'All Items Checked' ? 'text-success' : item.description === 'Order Deleted By Admin' ? 'text-danger' : 'text-info'}`}>{item.description}</p>
                                  </div>
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
        <div className="col-lg-4 col-md-6" style={{height:"370px"}}>
          <div className="card h-100"  style={{ backgroundColor:"pink"}}>
            <div className="card-header pb-0" style={{padding:" 0.5rem", backgroundColor:"pink"}} >
              <h6>Event Calendar</h6>
             
              <Calendar
                                        onChange={handleDateChange}
                                        value={selectedDate}
                                    />
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