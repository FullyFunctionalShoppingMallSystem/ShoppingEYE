import React from "react";
import "./assets/css/pageUI.css"
import image from "./assets/img/logo.png"

function SignInHeader(){
  return(
      <>
<div className="container position-sticky z-index-sticky top-0">
  <div className="row">
    <div className="col-12">
      <nav className="navbar navbar-expand-lg  blur border-radius-xl mt-4 top-0 z-index-3 shadow position-absolute my-3 py-2 start-2 end-0 mx-0"  >
        <div className="container-fluid px-0">
          <a className="navbar-brand font-weight-bolder ms-sm-3"   data-placement="bottom" >
            <img src={image} style={{width:"30px" , height:"30px", marginBottom:"5px"}} ></img>
            &nbsp; MAZZA GALLERIE
          </a>
       
          <div className="collapse navbar-collapse pt-3 pb-2 py-lg-0 w-100" id="navigation">
            <ul className="navbar-nav navbar-nav-hover ms-auto">
           
              <li className=" nav-item dropdown dropdown-hover mx-2">
              <a href="/person/admin" className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
              <button className="btn btn-success"  style={{marginBottom:"0px"}}> SIGN IN</button>
           
                 </a>
              </li>
              <li className=" nav-item dropdown dropdown-hover mx-2">
              <a href="/person/register" className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
              <button className="btn btn-dark" style={{marginBottom:"0px"}}>REGISTER</button>
             
                 </a>
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

}export default SignInHeader;