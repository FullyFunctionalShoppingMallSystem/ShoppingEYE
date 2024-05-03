import React, { useEffect } from "react";
import "../assets/css/TextAmination1.css";
import anime from "animejs";

const Animation1 = () => {

  useEffect(() => {
    // Wrap every letter in a span
    const textWrapper = document.querySelector('.ml1 .letters');
    if (textWrapper) {
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

      anime.timeline({ loop: true })
        .add({
          targets: '.ml1 .letter',
          scale: [0.3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 600,
          delay: (el, i) => 70 * (i + 1)
        }).add({
          targets: '.ml1 .line',
          scaleX: [0, 1],
          opacity: [0.5, 1],
          easing: "easeOutExpo",
          duration: 700,
          offset: '-=875',
          delay: (el, i, l) => 80 * (l - i)
        }).add({
          targets: '.ml1',
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000
        });
    }
  }, []);

  return (
    <div className="animated-text-overlay">
      <h1 className="ml1" style={{color:"white", fontSize:"100px"}}>
        <span className="text-wrapper">
          <span className="line line1"></span>
          <span className="letters">CATEGORIES</span>
          <span className="line line2"></span>
        </span>
      </h1>
    </div>
  );
};

export default Animation1;
