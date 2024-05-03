import React, { useState, useEffect } from "react";
import "../assets/css/headerUI.css";
import "../assets/css/SalesAds.css";

function SalesAds() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const animate = () => {
      setIsAnimated(true);
      setTimeout(() => setIsAnimated(false), 5500);
    };

    const timer = setTimeout(animate, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div>
    

        <div id="wrapper">
          <svg className="Banner1" height="220" width="450">
            <polygon className={`BorderAnimationEx1 BannerBorder ${isAnimated ? "fadeIn" : ""}`} strokeMiterlimit="10" points="30 5, 20 200, 440 170, 440 55" style={{ fill: "none", stroke: "#000", strokeWidth: 5 }} />
            <polygon className={`BannerHolder ${isAnimated ? "fadeIn" : ""}`} points="5 31, 5 185, 410 205, 430 10" style={{ opacity: 0.2, fill: "#000" }} />
            <polygon className={`BannerHolder ${isAnimated ? "fadeIn" : ""}`} points="5 31, 5 180, 410 200, 430 10" style={{ opacity: 1, fill: "#fdd808" }} />
            <text className={`Sales ${isAnimated ? "fadeIn" : ""}`} x="43" y="122" fontFamily="Viga" fontSize="65" opacity="0.8" fill="#fff"> SALES <tspan x="43" y="119" fontFamily="Viga" fontSize="65" fill="#000"> SALES </tspan> </text>
            <text className={`Biggest ${isAnimated ? "fadeIn" : ""}`} fontSize="23" fill="#000" fontWeight="300" fontFamily="Viga">
              <tspan x="270" y="70">B I G G E S T</tspan>
              <tspan x="287" y="95">S A L E S</tspan>
              <tspan x="302" y="120">UP TO</tspan>
              <tspan x="313" y="143">70%</tspan>
              <tspan x="314" y="168">OFF</tspan>
            </text>
            <text className={`ShopNow ${isAnimated ? "fadeIn" : ""}`} x="76" y="161.5" fontFamily="Viga" opacity="0.8" fontSize="20" fill="#fff">S H O P&nbsp;&nbsp;N O W</text>
            <polyline className={`BorderAnimationEx1 BannerBorderLine ${isAnimated ? "fadeIn" : ""}`} points="30 3, 20 200" style={{ fill: "none", stroke: "#000", strokeWidth: 4.5 }} />
          </svg>
        </div>

        <h4 />
        <br /> Click the banner to rerun ..
      
      </div>
    </>
  );
}

export default SalesAds;
