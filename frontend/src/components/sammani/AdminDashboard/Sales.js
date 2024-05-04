import React, { useState, useEffect} from "react";
import "../assets/css/headerUI.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faBell, faCog, faUser,faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
import image1 from "../assets/img/logo.png"
import "../assets/css/popup.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/Sales.css"
import LoyaltyIcon from '@mui/icons-material/Loyalty';



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

//delete
const handleDelete = (id) => {
  axios.delete(`http://localhost:8070/code/delete/${id}`)
    .then(response => {
      // Filter out the deleted code from the state
      setSalesData(prevSalesData => prevSalesData.filter(item => item._id !== id));
      // Filter out the deleted code from the filtered data as well
      setFilteredSalesData(prevFilteredData => prevFilteredData.filter(item => item._id !== id));
      console.log('Code deleted successfully:', response.data);
      toast.success("Code deleted successfully!", {
        style: {
          background: "black",
          color: "white"
        },
      });
    })
    .catch(error => {
      console.error('Error deleting code:', error);
      alert("Error deleting code. Please try again later.");
    });
};

//display tshirts 
const [data, setData] = useState([]);
   
useEffect(() => {
   fetchData();
}, []);

const fetchData = async () => {
  try {
     const response = await axios.get("http://localhost:8070/Tee/");
     setData(response.data);
  } catch (error) {
     // Check if the error is due to cart being empty
     if (error.response && error.response.status === 404) {
        // Cart is empty, set data to an empty array
        setData([]);
     } else {
        console.error("Error fetching data:", error);
     }
  }
}

//winner
const [winner, setWinner] = useState(null);
const [buttonDisabled, setButtonDisabled] = useState(false);

const handleSelectWinner = () => {
  const randomIndex = Math.floor(Math.random() * data.length);
  setWinner(data[randomIndex]);
  setButtonDisabled(true);
  localStorage.setItem('lastWinnerSelection', Date.now());
};

const checkButtonStatus = () => {
  const lastWinnerSelection = localStorage.getItem('lastWinnerSelection');
  if (lastWinnerSelection) {
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    const timeElapsed = Date.now() - parseInt(lastWinnerSelection);
    if (timeElapsed < oneWeek) {
      setButtonDisabled(true);
    }
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
        <li className="nav-item">
          <a className="nav-link text-white  " href="/loyaltyadminwatch">
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
        <a className="btn bg-gradient-primary w-100" href="/" type="button">
       
              <i className="material-icons opacity-10">login</i>
            <span className="nav-link-text ms-3">Sign Out</span>
        </a>
      </div>
    </div>
  </aside>

      
<main className="main-content position-relative h-100 border-radius-lg ">
   
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
             
              <input style={{width:"300px",height:"40px"}} type="text" className="form-control" onChange={handleSearch} placeholder="Search Code..."      
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

<div className="image-container" style={{maxHeight: "500px", overflowY: "auto", whiteSpace: "nowrap", maxWidth:"450px" }}>
  {data &&
    data.map((singleData) => {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(singleData.image.data.data))
      );

      return (
        <div key={singleData._id} style={{ display: "inline-block", marginRight: "20px" }} className="image-wrapper">
          <img
            src={`data:image/png;base64,${base64String}`}
            alt="image"
            style={{ width: "150px", height: "150px" }}
          />
          <div>
            {singleData.email}
          </div>
        </div>
      );
    })}
</div>


    <div className="col-md-12 mb-lg-0 mb-2" style={{width:"50%" , marginLeft:"20px" }}>
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
                    


                    <ul className="list-group" >
                    <br></br>
                   
                    {filteredSalesData.map((item, index) => {
    // Calculate if the expiration date has passed
    const isExpired = new Date(item.expDate) < new Date();

    return (
      
      <div className="row" style={{ borderTop: "1px solid black", padding: "0vh 0",marginLeft:"10px"}}>
      <li key={index} className={`list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg ${isExpired ? 'text-danger' : ''}`}>
        <p className="">{index + 1}</p>
        <div className="d-flex flex-column" style={{ marginRight: "70px", width: "150px" }}>
          <h6 className={`mb-1 font-weight-bold text-sm ${isExpired ? 'text-danger' : 'text-dark'}`}>{item.code}</h6>
          <span className={`text-xs ${isExpired ? 'text-danger' : ''}`}>{item.description}</span>
        </div>
        <div className="d-flex align-items-center text-sm" style={{ marginRight: "20px" }}>
          <h6 className={`text-success ${isExpired ? 'text-danger' : ''}`}>{item.discount}&nbsp;&nbsp;&nbsp;&nbsp;</h6>
          <h6>Exp: <span className={`text-xs ${isExpired ? 'text-danger' : 'text-blue'}`}>{item.expDate}</span></h6>
        </div>
        <div>
          <button onClick={() => handleDelete(item._id)}  style={{ border: "none", background: "none" }}><FontAwesomeIcon style={{marginTop:"10px"}} icon={faTrashAlt}></FontAwesomeIcon></button>
        </div>
      </li>
      </div>
    );
  })}
</ul>


                  </div>
                </div>
<br></br>
              </div>
              
            </div>



            </div>
 <div>       

            <button style={{marginTop:'10px'}} className="btn btn-success" onClick={handleSelectWinner} disabled={buttonDisabled}>Select Winner</button>


{winner && (
  <div>
    <h3>Winner:</h3>
    <div>
      <img
        src={`data:image/png;base64,${btoa(
          String.fromCharCode(...new Uint8Array(winner.image.data.data))
        )}`}
        alt="winner-image"
        style={{ width: "150px", height: "150px" }}
      />
      <div>{winner.email}</div>
    </div>
  </div>
)}
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
            <ToastContainer/>
        </>
    )

}export default Sales;