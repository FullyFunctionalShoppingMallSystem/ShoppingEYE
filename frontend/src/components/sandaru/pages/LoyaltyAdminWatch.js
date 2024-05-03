import React,{useState, useEffect} from "react";
import axios from "axios";
import "../assets/css/pageUI.css";
import "../assets/img/member.png";
import LoyaltyIcon from '@mui/icons-material/Loyalty';




function LoyaltyAdminWatch() {
  const [loyalties, setLoyalties] = useState([]);
  
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
             
              <input style={{width:"300px"}} type="text" className="form-control" placeholder="Search Order..."
              
             
              
               />
            
            </div>
          </div>

       
          <ul className="navbar-nav  justify-content-end">
          
            
            
            <li className="nav-item px-3 d-flex align-items-center">
              <a href="" className="nav-link text-body p-0">
                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <a href="" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-bell cursor-pointer"></i>
              </a>
              <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img src="../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 "/>
                      </div>
                     
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img src="../assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm bg-gradient-dark  me-3 "/>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item d-flex align-items-center">
              <a href="" className="nav-link text-body font-weight-bold px-0">
                <i className="fa fa-user me-sm-1"></i>
              
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
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-2 pb-1">
                <h6 className="text-white text-capitalize ps-3">LOYALTY MEMBERSHIPS</h6>
                
                
              </div>
              <br></br>
              <div className='middlein'>
              <div className='card'>

              <div>
            
            <ul>
                {loyalties.map(loyalty => (
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


