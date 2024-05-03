import {React} from "react";
import "../assets/css/headerUI.css";
import Header from "../MainHeader.js";
import SliderFashion from "./SliderFashion.js";
import "../assets/css/SearchBar.css"
import Ads1 from "./Ads1.js";
import FashionStores from "./FashionStores.js"
import MenFashion from "./MenFashion.js"
//import video1 from "../assets/img/Furniture1.mp4"
import video2 from "../assets/img/Furniture2.mp4"
import video3 from "../assets/img/Furniture3.mp4"
// import video4 from "../assets/img/Furniture4.mp4"
import video5 from "../assets/img/Furniture5.mp4"
import "../assets/css/TextAnimation2.css"
import Foot from "./FootWear.js"
import Beauty from "./Beauty.js";
import Electronic from "./Electronic.js";
import video from "../assets/img/Video2.mp4"
// import Footer from "../Footer.js";
import image1 from "../assets/img/ads1.jpg"
import image2 from "../assets/img/image2.jpg"
import Furniture from "./Furniture.js";
import video6 from "../assets/img/Video6.mp4"




function Stores() {
  

  return (
    <>
      <div className="contact-us blog-author bg-gray-200">
        <header>
          <Header />
          <div className="min-height-500" loading="lazy">
            <SliderFashion />
          </div>
        </header>
        <div className="card card-body  shadow-blur mx-3 mx-md-4 mt-n6 mb-4" style={{backgroundColor:"rgb(125 163 198 / 17%)"}}>
          <br />
          <br />
          <div style={{ marginTop: "20px" }}>
            <div className="searchBar">
              <input type="text" className="searchTerm" placeholder="Search for stores..." />
              <button type="submit" className="searchButton">
              <i style={{marginTop:"5px"}} className="material-icons text-m">search</i>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6" style={{ height: "50px" }}>
              <h5 className="mb-5" style={{ color: "" }}> WOMEN'S WEAR</h5>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <br /> <FashionStores /> <br />
                <h5 className="mb-5" style={{ color: "" }}> MEN'S WEAR</h5>
                <MenFashion />
                <br></br>
                <h5 className="mb-5" style={{ color: "" }}> FOOT WEAR</h5>
              
                <Foot />
              </div>
              <div>
              <Ads1 />
              
              <video autoPlay loop muted style={{ marginTop:"280px", marginLeft:"30px", height:"550px", borderRadius:"10px" }}>
  <source src={video} type="video/mp4" />
  Your browser does not support the video tag.
            </video>
            <div className="animated-title" >
  <div className="text-top">
    <div  style={{ fontSize:"50px"}}>
      
      <span>50% OFF SALE</span>
    </div>
  </div>
  <div className="text-bottom" >
    <div  style={{ fontSize:"35px"}}><b>BLACK FRIDAY</b></div>
  </div>
</div>
               
                </div>
            </div>
         
            <div style={{backgroundColor:"#e09facd4", height:"310px", marginTop:"15px",paddingBottom:"10px",}} >
                
               <img src={image1} style={{height:"290px", marginTop:"10px", marginLeft:"10px"}}/>
               <img src={image2} style={{height:"290px", marginTop:"10px"}}/>

               
            </div>
           
            <h5 className="mb-3" style={{ color: "", marginTop:"20px" }}> BEAUTY AND PERSONAL CARE</h5>
            <Beauty></Beauty>
            <h5 className="mb-3" style={{ color: "", marginTop:"30px" }}> ELECTRONICS</h5>
            <Electronic></Electronic>
            <div style={{display:"flex" ,marginLeft:"20px"}}>
            <video autoPlay loop muted style={{ marginTop:"30px", marginLeft:"0px", height:"230px", borderRadius:"3px" }}>
  <source src={video2} type="video/mp4" />
  Your browser does not support the video tag.
            </video>
            <video autoPlay loop muted style={{ marginTop:"30px", marginLeft:"0px", height:"230px", borderRadius:"3px" }}>
  <source src={video3} type="video/mp4" />
  Your browser does not support the video tag.
            </video>
            <video autoPlay loop muted style={{ marginTop:"30px", marginLeft:"0px", height:"230px", borderRadius:"3px" }}>
  <source src={video2} type="video/mp4" />
  Your browser does not support the video tag.
            </video>
            <video autoPlay loop muted style={{ marginTop:"30px", marginLeft:"0px", height:"230px", borderRadius:"3px" }}>
  <source src={video5} type="video/mp4" />
  Your browser does not support the video tag.
            </video>
            <video autoPlay loop muted style={{ marginTop:"30px", marginLeft:"0px", height:"230px", borderRadius:"3px" }}>
  <source src={video5} type="video/mp4" />
  Your browser does not support the video tag.
            </video>
            </div>
            <div >
             
            <h5 className="mb-2" style={{ color: "", marginTop:"30px" }}> HOME AND LIVING</h5>
            <br></br>
            <div style={{display:"flex"}}>
            <Furniture></Furniture>
            <div style={{border:"4px solid black",height:"230px"}}>
            <video autoPlay loop muted style={{ marginTop:"20px", marginLeft:"0px", height:"180px", borderRadius:"3px" }}>
  <source src={video6} type="video/mp4" />
  Your browser does not support the video tag.
            </video>

       
            </div>
           
            </div>
         
            </div>
          
            <br></br>
           
           
          </div>
         
        </div>
    
      </div>
    </>
  );
}

export default Stores;
