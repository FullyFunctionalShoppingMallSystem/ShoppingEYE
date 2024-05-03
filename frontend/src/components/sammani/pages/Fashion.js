import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css";
import Header from "../MainHeader.js";
import SliderFashion from "./SliderFashion.js";
import "../assets/css/SearchBar.css"
import Ads1 from "./Ads1.js";


function Fashion(){

   

    return(
        <>

<div className="contact-us blog-author bg-gray-200">


<header>
<Header></Header>
    <div className=" min-height-500" loading="lazy">
 
<SliderFashion></SliderFashion>
    </div>
  </header>
  <div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
   <br></br>
   <br></br>
  <div className="" style={{marginTop:"20px"}}>
   <div className="searchBar">
      <input type="text" className="searchTerm" placeholder="Search for stores..."/>
      <button type="submit" className="searchButton">
        <i className="fa fa-search"></i>
     </button>
   </div>
</div>

<Ads1></Ads1>
 
  </div>












</div>

        </>
    )

}export default Fashion;