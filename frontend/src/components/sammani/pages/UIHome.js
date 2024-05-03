import React from "react";
import Header from "../MainHeader.js";
import "../assets/css/home.css"
import { useEffect, useState } from 'react';
import FooterUI from "../FooterUI.js";
import Animation2 from "./TextAnimationHome.js";





function HomeUI() {
//Count
const [counts, setCounts] = useState({
  state1: 0,
  state2: 0,
  state3: 0,
});

useEffect(() => {
  const targets = {
    state1: 30,
    state2: 100,
    state3: 20,
  };

  const duration = 3000; // 3 seconds

  const intervalId = setInterval(() => {
    let updatedCounts = { ...counts };
    let allCountsReached = true;

    for (const key in counts) {
      if (counts[key] < targets[key]) {
        updatedCounts[key]++;
        allCountsReached = false;
      }
    }

    setCounts(updatedCounts);

    if (allCountsReached) {
      clearInterval(intervalId);
    }
  }, duration / Math.max(...Object.values(targets)));

  return () => clearInterval(intervalId);
}, [counts]);





  return (
    <>
    <Header/>
    <header className="header-2 ">
<div className="page-header min-vh-75 relative bgimage" >
<span className="mask bg-gradient bgclr opacity-4"></span>
<div className="container">
  <div className="row">
    <div className="col-lg-7 text-center mx-auto">
     <Animation2></Animation2>
    </div>
  </div>
</div>
</div>
</header>

<div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">

<section className="pt-3 pb-4" style={{background:"linearGradient(45deg, #9BFF9B, #FFFF00, #FFA500);"}} id="count-stats">
  <div className="container">
    <div className="row">
      <div className="col-lg-9 mx-auto py-3">
        <div className="row">
        {Object.entries(counts).map(([key, value]) => (
                    <div className="col-md-4 position-relative" key={key}>
                      <div className="p-3 text-center">
                        <h1 className="text-gradient text-success">
                          <span id={key}>{value}</span>+
                        </h1>
                        <h3 style={{color:"blue"}} className="mt-3">
                          {key === 'state1' ? 'STORES' : key === 'state2' ? 'CUSTOMERS' : key === 'state3' ? 'SERVICE' : ''}
                        </h3>
                        <p className="font-weight-normal" style={{fontSize:"16px"}}>
                          {key === 'state1'
                            ? 'At present, our Stores range includes Fashion, Footwear, Home and Living, Cosmetics, Entertaintment, Events and Food court.'
                            : key === 'state2'
                            ? 'We provide various facilities like delivery products, discounts, events for winning coupon codes ,social shopping features to enchance our customer satisfaction. '
                            : key === 'state3'
                            ? 'Management of Mazza Gallarie over 20+ years. Providing unparalleled service and commitment to our customers, ensuring their satisfaction and success in every interaction. '
                            : ''}
                        </p>
                      </div>
                      <hr className="vertical dark" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
  <div class="row mt-2">
  <div class="col-lg-4 col-md-8 "  style={{borderRadius:"10px"}}>
        <div class="card " style={{borderRadius:"10px"}}>
        <img style={{maxWidth:"500px",borderRadius:"5px"}} className="bgcardimg" />
        </div>
      </div>
      <div class="col-lg-4 col-md-8 "  style={{borderRadius:"10px"}}>
        <div class="card " style={{borderRadius:"10px"}}>
        <img style={{maxWidth:"650px",borderRadius:"5px"}} className="bgcardimg" />
        </div>
      </div>
      <div class="col-lg-4 col-md-8 "  style={{borderRadius:"10px"}}>
        <div class="card " style={{borderRadius:"10px"}}>
        <img style={{maxWidth:"900px",borderRadius:"5px"}} className="bgcardimg" />
        </div>
      </div>

    </div>

       <section style={{backgroundColor:"lightgrey"}} class="my-5 py-5 cardbg2">
  <div class="container">
    <div class="row">
      <div class="row justify-content-center text-center my-sm-5">
        <div class="col-lg-6">
          <p class="lead" style={{color:"white"}}><b>" Mazza Gallarie, a premier shopping destination, stands as a beacon of luxury and convenience in the heart of the city. Boasting a diverse array of high-end retail stores, fine dining options, and entertainment facilities, Mazza Gallarie offers a sophisticated and enriching shopping experience for discerning customers. With its elegant architecture, unparalleled amenities, and commitment to excellence, Mazza Gallarie remains a preferred destination for those seeking luxury, style, and comfort in their shopping endeavors."</b> </p>
        </div>
      </div>
    </div>
  </div>
  </section>
  

       
  


    <hr class="horizontal dark my-5"/>
  








      </div>
      <div>

  </div>

<FooterUI></FooterUI>


      
    </>
  );
}


export default HomeUI;
