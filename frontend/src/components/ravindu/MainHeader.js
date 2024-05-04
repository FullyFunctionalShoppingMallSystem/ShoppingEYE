import React from "react";
import "./assets/css/pageUI.css"
import image from "./assets/img/logo.png"

function Header(){
  return(
      <>
<div className="container position-sticky z-index-sticky top-0">
  <div className="row">
    <div className="col-12">
      <nav className="navbar navbar-expand-lg  blur border-radius-xl mt-4 top-0 z-index-3 shadow position-absolute my-3 py-2 start-2 end-0 mx-0"  >
        <div className="container-fluid px-0">
          <a className="navbar-brand font-weight-bolder ms-sm-3"  href="/mazza-gallarie"  data-placement="bottom" >
            <img src={image} style={{width:"30px" , height:"30px", marginBottom:"5px"}} ></img>
            &nbsp; MAZZA GALLERIE
          </a>
          <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon mt-2">
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </span>
          </button>
          <div className="collapse navbar-collapse pt-3 pb-2 py-lg-0 w-100" id="navigation">
            <ul className="navbar-nav navbar-nav-hover ms-auto">
            <li className="nav-item dropdown dropdown-hover mx-2">
                <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/mazza-gallarie" id="dropdownMenuBlocks" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="material-icons opacity-6 me-2 text-md">home</i>
                 HOME
                 
                </a>
              </li>
              <li className="nav-item dropdown dropdown-hover mx-2">
                <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/Categories" id="dropdownMenuPages" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="material-icons opacity-6 me-2 text-md">dashboard</i>
                  CATEGORIES
                </a>
                <div className="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3" aria-labelledby="dropdownMenuPages">
                  <div className="d-none d-lg-block">
                    <h6 className="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1">
                     Fashion
                    </h6>
                    <a href="/Categories" className="dropdown-item border-radius-md">
                      <span>Women's Clothing</span>
                    </a>
                    <a href="/Categories" className="dropdown-item border-radius-md">
                      <span>Men's Clothing</span>
                    </a>
                    <a href="/Categories" className="dropdown-item border-radius-md">
                      <span>Foot Wear</span>
                    </a>
                    <a href="/Categories" className="dropdown-item border-radius-md">
                      <span>Accessories</span>
                    </a>
                   
                    <h6 className="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1">
                   Beauty And Personal Care
                    </h6>
                    <a href="/Categories" className="dropdown-item border-radius-md">
                      <span>Beauty and Cosmetics</span>
                    </a>
                    <a href="/Categories" className="dropdown-item border-radius-md">
                      <span>Perfumes and Fragrances</span>
                    </a>
                    <h6 className="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1">
                  Electronics
                    </h6>
                    <h6 className="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1">
                  Home and Living
                    </h6>
                  </div>
                  <h6 className="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1">
                  Entertainment
                    </h6>
                    <h6 className="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1 ">
                  Food and Beverage
                    </h6>
                    <h6 className="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1 ">
                 Services
                    </h6>
            
                </div>
              </li>
              <li className="nav-item dropdown dropdown-hover mx-2">
                <a  href= "/VirtualSearch"  className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuBlocks" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="material-icons opacity-6 me-2 text-md">view_day</i>
                EVENTS
                 
                </a>
              </li>
              <li className="nav-item dropdown dropdown-hover mx-2">
                <a href= "/contact-Us" className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="material-icons opacity-6 me-2 text-md">article</i>
                 CONTACT
                </a>
              
              </li>
              <li className="nav-item dropdown dropdown-hover mx-2">
                <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="material-icons opacity-6 me-2 text-md">info</i>
                 ABOUT US
                </a>
              
              </li>
              <li className=" nav-item dropdown dropdown-hover mx-2">
              <a href="/Cart" className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="material-icons opacity-6 me-2 text-md">shopping_cart</i>
              CART
                 </a>
              </li>
              <li className=" nav-item dropdown dropdown-hover mx-2">
              <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/person/profile" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="material-icons opacity-6 me-2 text-md">people</i>
              PROFILE
                 </a>
                 <div className="dropdown-menu dropdown-menu-animation dropdown-md p-3 border-radius-xl  mt-lg-3" aria-labelledby="dropdownMenuPages" >
                  <div className="d-none d-lg-block" style={{marginRight:"30px"}}>
                  <a href="" className="dropdown-item border-radius-md">
                      <span>Transactions</span>
                    </a>
                    <a href="" className="dropdown-item border-radius-md">
                      <span>Payment Methods</span>
                    </a>
                    <a href="/createLoyalty" className="dropdown-item border-radius-md">
                      <span>Loyalty Registration</span>
                    </a>
                    <a href="/" className="dropdown-item border-radius-md">
                      <span>Sign Out</span>
                    </a>
                  </div>
                  </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     
    </div>
  </div>
</div>

   

  

      </>
  )

}export default Header;